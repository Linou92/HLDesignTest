const PORT = process.env.PORT || 3000
const https = require('https')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// SETTING UP EXPRESS AND VIEW ENGINE
app.use(express.json())
app.use(express.static("express"))

app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))

// PARSE APPLICATION
app.use(bodyParser.json({limit: '1000tb', extended: true}))
app.use(bodyParser.urlencoded({limit: '1000tb', extended: true}))

// Homepage
app.get('/', (req, res) => {
  res.render('home', {user: req.user})
})

// SETTING UP HTTPS
app.use(function (req, res, next) {
  if (req.secure) {
    next()
  } else {
    res.redirect('https://' + req.headers.host + req.url)
  }
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
  console.log('App server running on port %s', PORT)
})

module.exports = app