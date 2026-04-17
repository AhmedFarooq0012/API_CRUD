const User = require("../model/user.model"); // Change it to 'Book' (Capital 'B')
const bcrypt = require("bcryptjs");


// Function to get all registered users
// 1. GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) return res.status(404).json({ message: "No users found" });
        
        res.status(200).json({ count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

const jwt = require("jsonwebtoken"); // Ensure this is imported

exports.register_user = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save User
        const newuser = new User({ 
            username, 
            email, 
            password: hashedPassword 
        });
        const savedUser = await newuser.save();

        // 4. Generate Token (Registration ke foran baad)
        // const token = jwt.sign(
        //     { id: savedUser._id }, 
        //     process.env.JWT_SECRET, 
        //     { expiresIn: '1h' }
        // );

        // 5. Send Token in Response
        res.status(201).json({
            message: "User registered successfully",
             // Ab registration pe bhi token milay ga
            user: { id: savedUser._id, username: savedUser.username, email: savedUser.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// exports.login_user = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         // 3. Compare password with encrypted hash in DB
//         const isMatch = await bcrypt.compare(password, user.password);
        
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//          const token = jwt.sign(
//             { id: user._id }, 
//             process.env.JWT_SECRET, 
//             { expiresIn: '1h' } // Token expires in 1 hour
//         );

//         res.status(200).json({ 
//             message: "Login successful", 
//             token:token,
//             user: { id: user._id, username: user.username, email: user.email } 
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Login error", error: error.message });
//     }
// };
exports.login_user = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // TOKEN GENERATE (Only here)
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1m' } // 1 hour expiry
        );

        res.status(200).json({ 
            message: "Login successful", 
            token: token,
            user: { id: user._id, username: user.username, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ message: "Login error", error: error.message });
    }
};

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = posts.find(p => p.id === id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.title;
        res.json({ message: "user updated", user });
    } else {
        res.status(404).json({ message: "user not found" });
    }
};


exports.deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const user = user.filter(p => p.id !== id);
    res.json({ message: `user with ID ${id} deleted` });
};