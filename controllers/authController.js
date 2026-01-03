const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json("Email or Password is Missing")
    }

    const exists = await User.findOne({ email });

    if (exists) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        email,
        password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully", user });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Email or Password is Missing")
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        message: "Login Succesfull",
        email: user.email,
        token
    })
}

module.exports = { register, login }