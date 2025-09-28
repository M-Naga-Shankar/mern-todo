import express from 'express';
import { getTodos,getTodoById,createTodo,updateTodoById,deleteTodoById  } from '../controllers/todoController.js';

const router = express.Router();

router.get('/',getTodos);
router.post('/',createTodo);
router.get('/:id',getTodoById);
router.put('/:id',updateTodoById);
router.delete('/:id',deleteTodoById);   
export default router;