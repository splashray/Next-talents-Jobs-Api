require('dotenv').config()
const authRouter = require('./routes/auth')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const express = require('express');
const app = express()

// middlewares
app.use(errorHandlerMiddleware);
app.use(express.json())

// routers
app.get('/api/v1',(req,res)=>{
    res.send('job listing api is now live');
})
app.use('/api/v1/auth',authRouter)


const start = async()=>{
    try {
        await connectDB(process.env.MONGOURI)
        app.listen(3000,
            ()=>console.log(`app is listening on port 3000...`))
    } catch (error) {
        console.log(error);
    }
}

start()