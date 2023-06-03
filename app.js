const express = require('express');

const app = express();

app.get('/',(reeq,res)=>{
    res.json(`this is the home page of the application`);
})
console.log('app is working perfectly');

app.listen(5000,console.log(`this app is listening on port 5000`));