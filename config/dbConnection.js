const mongoose = require('mongoose');
require('dotenv').config();

// Connect to the database


const dbConnection= async ()=>{
const CONNECTION_STRING= await mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("connecting to the database")
})
.catch((err)=>{
    console.log(err)})
}



module.exports = dbConnection;