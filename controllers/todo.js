const asyncHandler = require("../middleware/async");
const createError = require("../utility/createError");
const Todo = require("../model/todo");




const listTodos = asyncHandler(async (req, res, next) => {
  Todo.find()
    .then(todo => {
        res.send({status : 'success', count: todo.length, data : todo }).sort(['updatedAt', 1])
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred ."
        });
    });
});

const getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.todoId)

  if (!todo)
    throw createError(
      404,
      `Todo is not found`
    );

  res.status(200).send({ status: "success", data: todo });
});

// create new Todo
const createTodo = asyncHandler(async (req, res, next) => {
  
    const todo = await Todo.create({
      ...req.body,
    });
    res.status(200).send({ status: "success", data: todo });
  });

const updateTodo = asyncHandler(async (req, res, next) => {
    // Validate Request
if(!req.body) {
    return res.status(400).send({
        message: "Data content can not be empty"
    });
}

// Find Todo and Update
Todo.findByIdAndUpdate(req.params.todoId, {
    ...req.body,
    status : req.body.status

   
}, {new: true})
.then(todo => {
    if(!todo) {
        return res.status(404).send({
            message: "Todo not found  "
        });
    }
    res.status(200).send({ status: "success", data: todo });
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Todo not found with id "
        });                
    }
    return res.status(500).send({
        message: "Error updating Project "
    });
});
});


// delete Todo
const deleteTodo = asyncHandler(async (req, res, next) => {
  const deleteTodo = await Todo.findById(req.params.todoId);

  if (!deleteTodo)
    throw createError(
      404,
      `Not Found`
    );

  await deleteTodo.remove();

  res
    .status(204)
    .send({ status: "success", message: "Deleted Successfully" });
});
module.exports = {
 listTodos,
 getTodo,
 createTodo,
 updateTodo,
 deleteTodo
};
