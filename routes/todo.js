const {
    listTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
  } = require("../controllers/todo");
  
  
  const router = require("express").Router();

  router.post('/',createTodo );
  
   // Retrieve all 
   router.get('/', listTodos);
  
   // Retrieve a Todo
   
   router.get('/:todoId', getTodo);

   // Validate 
   router.put('/:todoId',updateTodo);
  
   // Delete a Todo
  router.delete('/:todoId',deleteTodo);
  
  
  module.exports = router;
  
  