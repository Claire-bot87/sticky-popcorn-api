import serverless from "serverless-http";
import express from "express";
import mongoose, {mongo} from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
import "dotenv/config"


import cors from "cors"

import logger from "../../middleware/logger.js"
import errorHandler from "../../middleware/errorHandler.js"

// Controllers/Routers
import userController from '../../controllers/userController.js'
import movieController from '../../controllers/movieController.js'
import reviewController from "../../controllers/reviewController.js"


const app = express()
const port = process.env.port || 3000


// Middleware
app.use(cors(
  {
    origin: process.env.ORIGIN
  }
))
app.use(express.json()) //# parses JSON body type, adding them to the req.body
app.use(mongoSanitize()) //# prevent cody injections
app.use(logger) //# logs out key information on incoming requests


// Controllers / Routes
app.use('/', userController)
app.use('/', movieController)
app.use('/', reviewController)

app.use(errorHandler)

//? Server connection
const establishServerConnections = async () => {
    try {
      
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('🤖 Database connection established')
    } catch (error) {
        console.log(error)
    }
}

establishServerConnections()

export const handler = serverless(app)