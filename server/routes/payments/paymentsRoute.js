const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const Payments = require("../../models/paymentModel");
const Learners = require("../../models/learners/learnersModel");
const Courses = require("../../models/courses/coursesModel");
const getDbConnection = require('../../config/database');

// PhonePe Payment Initiation
router.post("/create-order", async (req, res) => {
    try {
        const { amount, learnerId, courseId, currency, paymentMethod, status } = req.body;

        if (!amount ||!learnerId ||!courseId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if a payment already exists for the same learner and course
        const existingPayment = await Payments.findOne({ learnerId, courseId, status: "pending" });
        if (existingPayment) {
            return res.status(400).json({ message: "Pending payment already exists for this course and learner" });
        }

        const merchantTransactionId = 'M' + Date.now();

        // Prepare the payment data
        const data = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: 'MUID' + learnerId,
            name: 'Course Purchase',
            amount: amount * 100, // Amount should be in paise
            redirectUrl: `http://localhost:5173/payment-redirect?merchantTransactionId=${merchantTransactionId}`, // Construct a detailed redirect URL
            redirectMode: 'REDIRECT',
            mobileNumber: '1234567890', // Example mobile number
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        // Create checksum
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
        // Make the API request

        axios
        .post(
          `${PHONE_PE_HOST_URL}/pg/v1/pay`,
          {
            request: payloadMain,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-VERIFY": checksum,
              accept: "application/json",
            },
          }
        )
        .then(function (response) {
          console.log("response->", JSON.stringify(response.data));
          const newPayment = new Payments({
            merchantTransactionId: merchantTransactionId,
            amount: amount,
            currency: currency,
            learnerId: learnerId,
            courseId: courseId,
            paymentMethod: paymentMethod,
            status: "pending"
          });
          newPayment.save();
          console.log('newPayment->', newPayment);
          res.json({ paymentPageUrl: response.data.data.instrumentResponse.redirectInfo.url });
        })
        .catch(function (error) {
          console.log(error);
          res.send(error);
        });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error!" });
        }
});

// Check Payment Status
router.post("/check-status", async (req, res) => {
    // Sessions are used to maintain state across multiple operations within a single logical unit of work.
    // The session management is utilized in the "/check-status" route to ensure 
    // atomicity and consistency when updating payment statuses and associated learner and course records

    //? Atomicity: 
    //* Ensures that all operations within a session are treated as a single atomic unit. 
    //* If any operation fails, the entire set of operations can be rolled back, 
    //* leaving the database in its original state before the session started.

    //? Consistency: 
    //* Guarantees that once a transaction is committed, the changes made during the transaction are 
    //* permanent and visible to subsequent reads, adhering to the ACID properties (Atomicity, Consistency, Isolation, Durability).

    //? Isolation:
    //* The operation is isolated from other transactions. This means that while it's running, 
    //* other transactions may see a snapshot of the database that doesn't include the changes made by this transaction yet. 
    //* This isolation level helps prevent race conditions and ensures that operations within the same transaction don't interfere with each other.

    //? Durability:
    //* The changes made during the transaction are persisted to the database and are not lost if the server crashes or is restarted.
    const session = await getDbConnection.startSession();

    //! This command marks the beginning of a transactional context.
    // Any operations that are executed after this point and 
    // before the transaction is either committed or aborted will be part of this transaction.
    session.startTransaction();
    try {
        const { merchantTransactionId } = req.body;
        console.log('Request received with merchantTransactionId:--', merchantTransactionId, 'at', new Date().toISOString());

        if (!merchantTransactionId) {
            //! aborting the transaction rolls back any changes made during the session, ensuring that partial updates do not occur.
            await session.abortTransaction();
            // endSession ends the session and releases any resources associated with it.
            //! No further operations can be performed on the session after it's ended. 
            // Attempting to use a session after calling endSession() will result in an error.
            session.endSession();
            return res.status(400).json({ message: "Missing required field: merchantTransactionId" });
        }

        const keyIndex = 1;
        const string = `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` + process.env.SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + "###" + keyIndex;

        const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${process.env.MERCHANT_ID}`
            }
        };

        const response = await axios.request(options);

        if (response.data.success) {
            // Here the session method specifies that the findOne operation should be executed 
            // within the context of the MongoDB session identified by the session argument.
            const payment = await Payments.findOne({ merchantTransactionId: merchantTransactionId }).session(session);
            //* If the transaction is eventually committed, all operations within the transaction, including this findOne,
            //* are guaranteed to be reflected in the database.

            //! If the transaction is aborted, all changes made within the transaction, including those from this operation,
            //! are rolled back, ensuring the database remains unchanged.

            if (!payment) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).send({ success: false, message: "Payment record not found" });
            }
            console.log('before updating payment status->', payment.status);

            // Check if the payment status has already been updated to avoid double processing
            if (payment.status !== response.data.data.state) {
                console.log("updating payment status->", response.data.data.state);
                payment.status = response.data.data.state;
                await payment.save({ session });
                console.log("updated payment status->", payment.status);

                const course = await Courses.findOne({ _id: payment.courseId }).session(session);
                if (!course) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(404).send({ success: false, message: "Course record not found" });
                }

                const learner = await Learners.findOne({ _id: payment.learnerId }).session(session);
                if (!learner) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(404).send({ success: false, message: "Learner record not found" });
                }

                // Check if learner is already enrolled in the course to avoid duplicate entries
                if (!course.learnerIds.includes(payment.learnerId)) {
                    console.log("adding learnerId->", payment.learnerId);
                    course.learnerIds.push(payment.learnerId);
                    course.enrollmentCount = course.learnerIds.length;
                    await course.save({ session });
                }

                if (!learner.enrolledCoursesIds.includes(payment.courseId)) {
                    console.log('adding courseId->', payment.courseId);
                    learner.enrolledCoursesIds.push(payment.courseId);
                    await learner.save({ session });
                }
            }

            //* Committing the transaction signifies that all operations have completed successfully, 
            //* and their effects should be persisted in the database.
            await session.commitTransaction();
            session.endSession();
            
            return res.status(200).send({ success: true, message: "Payment Success", data: response.data });
        } else {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({ success: false, message: "Payment Failure", data: response.data });
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        if (error.code === 'ECONNRESET') {
            console.log("Connection reset error:", error);
            return res.status(502).json({ message: "Bad Gateway - Connection reset by peer" });
        } else if (error.code === 'ETIMEDOUT') {
            console.log("Request timed out:", error);
            return res.status(504).json({ message: "Gateway Timeout - Request to payment provider timed out" });
        }

        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

module.exports = router;