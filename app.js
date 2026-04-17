require('dotenv').config();
const express = require('express')
const app = express();
const route = require("./src/routes/user.routs")
const user_register_route = require("./src/routes/registeruser.routs")
const token = require("./src/middleware/jwtwebtoken")
const cors = require('cors');
app.use(cors());
const connectDB = require("./db");
app.use(express.json()); 

//middleware
connectDB();

const port = process.env.PORT
app.use('/api', user_register_route); 
app.listen(port,()=>{
    console.log("call back or app listen")
})


