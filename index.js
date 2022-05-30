//importing dependencies

import express from 'express'
import mongoose from 'mongoose'
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotEnv from 'dotenv'
dotEnv.config()
//importing the routes
import postRoutes from './Routes/Posts.js'
import userRoutes from './Routes/Users.js'




const app = express()
app.use(cors())
app.use(bodyParser.json({limit:'50mb', extended: true }))
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }))

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const url = process.env.MONGODB
const PORT = process.env.PORT || 5500


mongoose.connect(url,{
     useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    ()=>app.listen(PORT,()=>{
        console.log(`app running on port ${PORT}`)

    })
    ).catch(
        (err)=> console.log('error connecting to the database')
        )


