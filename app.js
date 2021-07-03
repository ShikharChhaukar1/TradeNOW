var express = require('express')
var app = express()
app.set("view engine", "ejs")
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/newdb', { 
                                                                             
 useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false                    
      }).then(()=>{
consolse.log("database started")
}).catch((error)=>{
console.log(error);
});

var session = require('express-session')
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))

var userController = require('./controllers/user.js')
var adController = require('./controllers/ad.js')

var Ad = require("./models/ad")

app.get('/', (req, res) => {
    Ad.find({}, (err, docs) => {
        res.render('index', { user: req.session.user, ads: docs })
    })
})

app.use('/user', userController)
app.use('/ad', adController)

app.listen(port, () => {
    console.log("Server is running")
})
