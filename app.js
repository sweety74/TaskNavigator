const express = require('express');
const app = express();
const task = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.static('./public'))
//this middleware function is required to be used before the routes so that we can 
//use json middleware to parse the json data from api's and req body.
app.use(express.json());
app.use('/api/v1/tasks',task);


const port = 3000;

const start = async () =>{
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port,(req,res)=>{
      console.log(`Server is listening at port ${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();