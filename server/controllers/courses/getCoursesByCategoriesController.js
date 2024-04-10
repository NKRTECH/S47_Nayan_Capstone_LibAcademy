const Course = require('../../models/courses/coursesModel');

const getCoursesByCategoriesController = async (req, res) => {
 try {
    // Extract the category IDs from the request query parameters
    // Assuming categories are passed as a comma-separated string of IDs
    const categoriesParam = req.query.categories;
    console.log(categoriesParam);
    const categoryIds = categoriesParam ? categoriesParam.split(',') : [];

    // Query the Courses collection for courses that include exactly the specified categories
    // Use $all to match courses that contain all the specified categories
    // and $size to ensure the course's categories array has exactly the same number of elements as the query
    const courses = await Course.find({
      categories: { $all: categoryIds}
    }).populate('categories').populate('tutorId');
    console.log(courses);

    // Send the courses back in the response
    res.status(200).json({courses});
 } catch (error) {
    console.error('Error fetching courses by categories:', error);
    res.status(500).json({ message: 'Server error' });
 }
};
module.exports = getCoursesByCategoriesController;


//********************************************* */

// const Course = require('../../models/courses/coursesModel');

// const getCoursesByCategoriesController = async (req, res) => {
//  try {
//     // Extract the category IDs from the request query parameters
//     // Assuming categories are passed as a comma-separated string of IDs
//     const categoriesParam = req.query.categories;
//     console.log(categoriesParam);
//     const categoryIds = categoriesParam ? categoriesParam.split(',') : [];

//     // Query the Courses collection for courses that include any of the specified categories
//     const courses = await Course.find({ categories: { $in: categoryIds } }).populate('categories');
//     console.log(courses);

//     // Send the courses back in the response
//     res.status(200).json({courses});
//  } catch (error) {
//     console.error('Error fetching courses by categories:', error);
//     res.status(500).json({ message: 'Server error' });
//  }
// };
// module.exports = getCoursesByCategoriesController;



//**************************************************************************** */

// const Course = require('../../models/courses/coursesModel'); // Import the Courses model
// const CourseCategory = require('../../models/courses/courseCategoryModel'); // Import the CourseCategory model

// const getCoursesByCategoriesController = async (req, res) => {
//  try {
//     // Extract the category IDs or names from the request query parameters
//     // Assuming categories are passed as a comma-separated string
//     const categoriesParam = req.query.categories;
//     console.log(categoriesParam);
//     const categories = categoriesParam ? categoriesParam.split(',') : [];

//     // Convert category names to IDs if necessary
//     const categoryIds = await Promise.all(categories.map(async (category) => {
//       const categoryDoc = await CourseCategory.findOne({ name: category }).orFail();
//       return categoryDoc._id;
//     }));

//     // Query the Courses collection for courses that include any of the specified categories
//     const courses = await Course.find({ categories: { $in: categoryIds } }).populate('categories');

//     // Send the courses back in the response
//     res.status(200).json({courses});
//  } catch (error) {
//     console.error('Error fetching courses by categories:', error);
//     res.status(500).json({ message: 'Server error' });
//  }
// };
// module.exports = getCoursesByCategoriesController;