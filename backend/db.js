const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});



// mongodb+srv://sharmaprajjwal333:T47H2x4iGRsh3dwM@cluster0.c8ujn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect("mongodb+srv://sharmaprajjwal333:T47H2x4iGRsh3dwM@cluster0.c8ujn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})

const todoModel = mongoose.model("todo", todoSchema); 

module.exports = todoModel;
