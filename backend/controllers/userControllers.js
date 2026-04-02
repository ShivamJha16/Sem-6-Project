const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../config/generateToken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role, key } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if (role === "admin") {
            if (key !== process.env.KEY) {
                return res.status(400).json({ message: 'Invalid Key' });
            }
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.error(error);   
        res.status(500).json({ message: 'Server Error' });    
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password, role, key } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if (role === "admin") {
            if (key !== process.env.KEY) {
                return res.status(400).json({ message: 'Invalid Key' });
            }
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        if (user.role !== "admin") {
            return res.status(403).json({ message: 'Access denied' });
        }
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { registerUser, loginUser, getAllUsers };