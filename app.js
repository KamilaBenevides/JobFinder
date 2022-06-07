const express = require('express')
const path = require('path')
const app = express()
const { engine } = require('express-handlebars')
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/Job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const PORT = 3000
app.listen(PORT, function() {
  console.log('porta: ', PORT)
})
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// app.set('views', path.join(__dirname, 'views'))
// app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// app.set('view engine', 'Handlebars')

app.use(express.static(path.join(__dirname, 'public')))

// db connection
db.authenticate().then(() => {
  console.log('conectado!')
}).catch(err => {
  console.log('Ocorreu um erro', err)
})

// routes
app.get('/', (req, res) => {

  const seach = req.query.job
  const query = '%'+seach+'%'

  if(!seach) {
    Job.findAll({order: [
      ['createdAt', 'Desc']
    ]})
    .then(jobs => {
      
      res.render('index', {
        jobs
      })
    })
    .catch(err => console.log(err))
  } else {
    Job.findAll({
      where: {title: {[Op.like]: query}},
      order: [
      ['createdAt', 'Desc']
    ]})
    .then(jobs => {
      
      res.render('index', {
        jobs, seach
      })
    })
  }

})

//Job router
app.use('/jobs', require('./routes/jobs'))