const express = require("express");
const app = express();

const { CreateTodo, UpdateTodo } = require("./types");
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.post("/", function (req, res) {
   const createpayload = req.body;
   const validatepayload = CreateTodo.safeParseparse(createpayload);

   if(!validatepayload.success){
    return res.status(411).json({error: validatepayload.error});
   }

   // put it in mongo db
});

app.get("/", function (req, res) {
  
});

app.put("/", function (req, res) {
    const updatepayload = req.body;
    const validatepayload = UpdateTodo.safeParseparse(updatepayload);
 
    if(!validatepayload.success){
     return res.status(411).json({error: validatepayload.error});
    }
});
