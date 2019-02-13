const express = require('express');
const app = express();
const mongoose = require("mongoose")

app.get('/',(req,res) => {
    res.end('hello world!')
})

const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log('start... http://localhost:5000/');
    
})