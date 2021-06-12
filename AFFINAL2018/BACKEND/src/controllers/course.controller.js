const Course = require('../models/course.model');

const createCourse = async (req, res) => {
  if (req.body) {
    const course = new Course(req.body);
    await course.save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}
//get subject datas to this course
const getAllCourses = async (req, res) => {
  await Course.find({}).populate('subjects', 'name description amount')//which datas are need in subject // this is subject array in the course
  .then(data => {                                                         //without giving like upper only^ (without populate) the ids of the subjects will only show
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  });
}
// get subjects adala to the course 
const getSubjectsForCourse = async (req, res) => {// if we give the course id subjects adala to that course should be display
  if (req.params && req.params.id) {
    await Course.findById(req.params.id)//course cuz only subjects belongs to that one course
    .populate('subjects', 'name description amount')
    .then(response => {
      res.status(200).send({ data: response.subjects });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const calculateAmount = async (req, res) => {
  if (req.params && req.params.id) {
    const course = await Course.findById(req.params.id).populate('subjects', 'amount')//course cuz only subjects belongs to that one course
    let totalAmount = 0;
    console.log(course.subjects)
    if (course.subjects.length > 0) {
      course.subjects.map((subject) => {
        totalAmount += subject.amount;
        console.log(totalAmount)
      });
    }
    res.status(200).send({ totalAmount: totalAmount });
  }
}

const deleteCourse = async (req,res)=>{
  const {id} = req.params    
  const camp= await camp.findByIdAndDelete(id);
  res.status(200).send({camp});
}




module.exports = {
  createCourse,
  getAllCourses,
  getSubjectsForCourse,
  calculateAmount,
  deleteCourse
};