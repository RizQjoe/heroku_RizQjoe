const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', function(req, res){
  models.Subjects.findAll()
  .then(subject => {
    res.render('subject',{data : subject, title: 'halaman subject'})
  })
  .catch(err =>{
    res.send(err)
  })
})

// data create
router.get('/addSubjects/', function(req,res) {
  models.Subject.findAll()
  .then(subjects => {
    res.render('addSubjects')
  })
  .catch(err => {
    res.send(err)
  })
})

// data create table from subject
router.post('/addSubjects', function(req,res) {
  models.Subject.build({
    subject_name: req.body.subject_name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .save()
  .then(subjects => {
    res.redirect('/subjects')
  })
})

// data delete table from subject
router.get('/delete/:id', function(req,res) {
  models.Subject.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
})

// data edit from module subject
router.get('/edit/:id', function(req,res) {
  models.Subject.findAll({
    where : {
      id : req.params.id
    }
  })
  .then(subjects => {
    res.render('editSubjects', {data: subjects[0], title: 'HALAMAN EDIT SUBJECT'})
  })
})

router.post('/edit/:id', function(req,res) {
  models.Subject.update(
    {
      subject_name: req.body.subject_name
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(subjects =>
    res.redirect('/subjects')
  )
})



module.exports = router
