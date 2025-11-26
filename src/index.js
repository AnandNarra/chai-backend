//require('dotenv').config({ path : './env' }) old way of writing this syntax

import dotenv from 'dotenv'
import connectDB from "./db/connectDB.js";

dotenv.config( 
    {
        path : './env'
    } )


import express from 'express'
const app = express()


connectDB().then( () =>{
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(` Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!! and check the server path also " , err);
    
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