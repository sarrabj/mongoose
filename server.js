const express = require("express")
const app = express()
const mongoose = require('mongoose')
const port =5000
app.use(express.json())

mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://sarra:sarrabenjdida16@cluster0.ejswq5h.mongodb.net/checkpointmongoose?retryWrites=true&w=majority',()=>
console.log('database is connected'))

app.use("/", require("./routes/userRoutes"))

app.listen(port,()=>console.log("listen in port 5000"))