const zod = require("zod");

const CreateTodo = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

const UpdateTodo = zod.object({
  id: zod.string().min(1),
  title: zod.string().min(1),
  description: zod.string().min(1),
});


module.exports = { CreateTodo, UpdateTodo };
