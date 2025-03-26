const express = require("express");
const app = express();

const { CreateTodo, UpdateTodo } = require("./types");
const todoModel = require("./db");
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.post("/todo", async function (req, res) {
   const createpayload = req.body;
   const validatepayload = CreateTodo.safeParseparse(createpayload);

   if(!validatepayload.success){
    return res.status(411).json({error: validatepayload.error});
   }

   // put it in mongo db
  await todoModel.create({
    title: createpayload.title,
    description: createpayload.description,
    completed: false,
  });
  return res.status(200).json({message: "Todo created successfully"});
});

app.get("/todos", async function (req, res) {
  const todos = await todoModel.find();
  return res.status(200).json({todos});
});

app.put("/complete/:id", async function (req, res) {
    const updatepayload = req.body;
    const validatepayload = UpdateTodo.safeParseparse(updatepayload);
 
    if(!validatepayload.success){
     return res.status(411).json({error: validatepayload.error});
    }

    const todo = await todoModel.findByIdAndUpdate(req.params.id, {completed: true});
    return res.status(200).json({message: "Todo completed successfully"});

});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
