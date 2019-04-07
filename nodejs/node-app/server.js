const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport')
const path = require('path')

// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles')
const movieinfo = require('./routes/api/movieinfo')
const boxoffice = require('./routes/api/boxoffice')
const paragraph = require('./routes/api/paragraph')
const paragraphreply = require('./routes/api/paragraphreply')
const article = require('./routes/api/article')
const articlereply = require('./routes/api/articlereply')
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

// 静态资源文件夹
app.use(express.static('public'))

// 使用routes
app.use('/api/users',users);
app.use('/api/profiles', profiles);
app.use('/api/movieinfo',movieinfo)
app.use('/api/boxoffice',boxoffice)
app.use('/api/paragraph', paragraph)
app.use('/api/paragraphreply', paragraphreply)
app.use('/api/articlereply', articlereply)

app.get('/',(req,res) => {
    res.end('hello world!')
})
const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log('start... http://localhost:5000/');
    
});
