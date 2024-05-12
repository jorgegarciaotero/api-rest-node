const mongoose = require("mongoose");

const connection = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/mi_blog");
        console.log("Connected to database");
        //Parameters inside the object
        //
    }
    catch(error){
        console.log(error);
        throw new Error("Could not connect to database")
    }

}


module.exports = { connection };