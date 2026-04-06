const express = require('express')
console.log("welcome to js")
console.log("hello world")
const app = express();
const route = require("./src/routes/user.routs")


//middleware

app.use('/',route)

app.use('/user', route);

app.listen(8000,()=>{
    console.log("call back or app listen")
})

