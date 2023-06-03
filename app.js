const { log } = require('console');
const express = require('express');
const app = express()

app.get('/',(req,res)=>{
    res.send('welcome to the home page of job listing api')
})

app.listen(3000,()=>console.log('app is listening on port 3000...'));