const Subject = require('../models/subject.model');

const createSubject = async (req, res) => {
  if (req.body) {
    const subject = new Subject(req.body);
    subject.save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const getAllSubject=async (req,res) =>{
  await Subject.find({})
  .then(data=>{
    res.status(200).send({data :data});

  })
  .catch(error=>{
    res.status(500).send({error :error.message});

  })


}


const getSubject = async (req, res) => { // extra not such a question in the paper // filter// find subjects which's amounts are greater than 3000 
  await Subject.find({ amount: {$lt: 3000}})// also have to rejister in subject api
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  });
}

module.exports = {
  createSubject,
  getAllSubject,
  getSubject
  
};