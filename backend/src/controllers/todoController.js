import Todo from "../models/todo.js";

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);  

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: `Cannot find any todo with ID ${id}` });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ message: `Cannot find any todo with ID ${id}` });             
        }   
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: `Cannot find any todo with ID ${id}` });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

export const toggleTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: `Cannot find any todo with ID ${id}` });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Additional functions can be added here as needed