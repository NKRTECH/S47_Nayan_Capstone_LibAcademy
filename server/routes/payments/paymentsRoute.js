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

// Add other routes as needed...

// Check Payment Status
router.post("/check-status", async (req, res) => {
    const session = await getDbConnection.startSession();
    session.startTransaction();
    try {
        const { merchantTransactionId } = req.body;
        console.log('Request received with merchantTransactionId:--', merchantTransactionId, 'at', new Date().toISOString());

        if (!merchantTransactionId) {
            await session.abortTransaction();
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
            timeout: 5000, // Increase timeout to 5 seconds or more
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': `${process.env.MERCHANT_ID}`
            }
        };

        const response = await axios.request(options);

        if (response.data.success) {
            const payment = await Payments.findOne({ merchantTransactionId: merchantTransactionId }).session(session);

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