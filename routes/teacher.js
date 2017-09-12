// routing teacher

const express = require('express')
const router = express.Router()
const models = require('../models')


// Read data table form module teacer
router.get('/', function (req, res){
  models.Teacher.findAll()
  .then(teacher => {
    res.render('teacher', {
      data: teacher,
      title: 'halaman teacer'
    })
    .catch(err =>{
      res.send(err)
    })
  })
})

router.get('/addTeachers/', function(req,res) {
  models.Subject.findAll()
  .then(subjects => {
    res.render('addTeachers', {data: subjects})
  })
  .catch(err => {
    res.render('addTeachers')
  })
})

// data create table module teacher
router.post('/addTeachers', function(req,res) {
  models.Teacher.build({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    subjectsId: req.body.subjectsId
  })
  .save()
  .then(teachers => {
    res.redirect('/teachers')
  })
})

// DELETE DATA TABLE FROM MODULE TEACHER
router.get('/delete/:id', function(req,res) {
  models.Teacher.destroy({
    where: {
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
})

router.get('/edit/:id', function(req,res) {
  models.Teacher.findById(req.params.id)
  .then(teachers => {
    models.Subject.findAll().then(subjects => {
      res.render('editTeachers', {
        data: teachers,
        data2: subjects,
        title: 'HALAMAN EDIT'
      })
    })
  })
})

router.post('/edit/:id', function(req,res) {
  models.Teacher.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      subjectsId: req.body.subjectsId
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(teachers =>
    res.redirect('/teachers')
  )
})








module.exports = router
