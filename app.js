const PORT = process.env.PORT || 3000
const https = require('https')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
//const fetch = require('node-fetch')

//var cors = require('cors')

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

// ALLOW CROSS ORIGIN
//CORS middleware
/*var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://webshop.wm3.se/api/v1/shop/products.json?media_file=true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(allowCrossDomain)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://webshop.wm3.se/api/v1/shop/products.json?media_file=true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors({
  origin: 'https://webshop.wm3.se/api/v1/shop/products.json?media_file=true'
}));*/



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