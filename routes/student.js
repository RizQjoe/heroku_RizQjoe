const express = require('express')
const router = express.Router()
const models = require('../models')

//Read table from module students
router.get('/', function(req, res){
  models.Student.findAll()
  .then(student => {
    res.render('student',{data : subject, title: 'halaman student'})
  })
  .catch(err =>{
    res.send(err)
  })
})


router.get('/addStudents',function (req, res){
  models.Student.findAll()
  .then(students =>{
    res.render('addStudents')
  })
  .catch(err => {
    res,send(err)
  })
})


router.post('/addStudents', function (req, res) {
  models.Student.build({
    first_name:req.body.first_name,
    last_name: req.body.last_name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .save()
  .then(students =>{
    res.redirect('/students')
  })
})


// DELETE data table from module teacher
router.get('/delete/:id', function(req,res) {
  models.Student.destroy({
    where: {
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
})

// edit data module teacher

router.get('/edit/:id', function(req,res){
  models.Student.findAll({
    where : {
      id : req.params.id
    }
  })
  .then(students => {
    res.render('editStudents', {data: students[0], title: 'HALAMAN EDIT STUDENT!'})
  })
})

router.post('/edit/:id', function(req,res) {
  models.Student.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(students =>
    res.redirect('/students')
  )
})




module.exports = router
