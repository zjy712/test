const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport')
// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles')
// DB config
const db = require('./config/keys').mongoURI;

//Connect
mongoose.connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// body-parser 中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);


// 使用routes
app.use('/api/users',users);
app.use('/api/profiles', profiles)


app.get('/',(req,res) => {
    res.end('hello world!')
})
const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log('start... http://localhost:5000/');
    
})
