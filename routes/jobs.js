const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

router.get('/test', (req, res) =>{
  res.send('bele')
})

router.get('/add', (req, res) =>{
  res.render('add')
})

router.get('/view/:id', (req, res) => {
  Job.findOne({
    where: {id: req.params.id}
  })
  .then(job => {
    res.render('view', {
      job
    })
  }).catch(err => console.log(err))
})

router.post('/add', (req, res) =>{
  const {title, description, salary, company, email, new_job} = req.body
  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job
  })
  .then(() => res.send('deu certo!'))
  .catch(err => res.send(err))
})

module.exports = router