import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Default fallback
    credentials: true 
}))

// Body parsing middleware with error handling
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ 
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())

// Routes import
import userRouter from './routes/user.routes.js'

// Routes declaration
app.use("/api/v1/users", userRouter)



export { app }