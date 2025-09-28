import User from "../models/user.js";

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;                
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });    
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
