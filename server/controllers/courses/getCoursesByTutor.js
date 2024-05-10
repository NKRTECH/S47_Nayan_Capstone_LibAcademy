// getCoursesByTutor.js
const Courses = require("../../models/courses/coursesModel");

const getCoursesByTutor = async (req, res) => {
    try {
      const tutorId = req.params.tutorId;
      console.log('Tutor ID:', tutorId);
  
      const courses = await Courses.find({ tutorId: tutorId })
      .populate({
        path: 'lessonIds',
        options: { sort: { 'priority': 1 } } // Sort by priority in ascending order
      })
      .populate('categories')
      .populate('tutorId').exec();
  
      if (!courses || courses.length === 0) {
        console.log('No courses found for this tutor');
        return res.status(404).json({ message: 'No courses found for this tutor' });
      }

      // console.log('Courses fetched successfully:', courses);
      res.status(200).json({ message: 'Courses fetched successfully', courses });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error });
    }
};

module.exports = getCoursesByTutor;


//********************************************* */

// const Courses = require("../../models/courses/coursesModel");

// // Assuming you have a middleware that sets req.user to the logged-in user's details
// const getCoursesByTutor = async (req, res) => {
//     try {
//       // Get the tutor's ID from the logged-in user's information
//     //   const tutorId = req.user._id;
//     const tutorId = req.params.tutorId;
  
//       // Query the Courses collection for courses created by the tutor
//       const courses = await Courses.find({ tutorId: tutorId })
//       .populate('lessonIds')
//       .populate('categories').populate('tutorId').exec();
  
//       // If no courses are found, return a 404 response
//       if (!courses || courses.length === 0) {
//         return res.status(404).json({ message: 'No courses found for this tutor' });
//       }

//       console.log('Courses fetched successfully:', courses);
//       // Return the found courses in the response
//       res.status(200).json({ message: 'Courses fetched successfully', courses });
//     } catch (error) {
//       // Handle any errors that occur during the query
//       res.status(500).json({ message: 'Error fetching courses', error });
//     }
//   };
  
// module.exports = getCoursesByTutor;