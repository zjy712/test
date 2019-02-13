const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
// 引入users.js
const users = require('./routes/api/users');

// DB config
const db = require('./config/keys').mongoURI;

//Connect
mongoose.connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// body-parser 中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 使用routes
app.use('/api/users',users)


app.get('/',(req,res) => {
    res.end('hello world!')
})
const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log('start... http://localhost:5000/');
    
})
