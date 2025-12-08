//require('dotenv').config({ path : './env' }) old way of writing this syntax

import dotenv from 'dotenv'
import connectDB from "./db/connectDB.js";
import { app } from './app.js'

// Load environment variables
dotenv.config({ 
    path: './.env'  // Fixed path
})

const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed!", err);
})




/*

import express from 'express'

const app = express()


( async () => {
    try {

        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error" , (error) => {
            console.log("Error" , error);
            throw error
        })

        app.listen(process.env.PORT , () =>{
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
        
    } catch (error) {
        console.log("Error :- " , error);
        throw error        
    }
})();

*/