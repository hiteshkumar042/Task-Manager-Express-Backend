const users = []

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json("Email or Password is Missing")
    }

    const user = users.find(u => u.email === email);

    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword
    }

    users.push(newUser)

    res.json({ msg: "Registration succesfull", User: newUser })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Email or Password is Missing")
    }

    const user = users.find(user => user.email == email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        return res.status(401).json("user Not found")
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )

    res.json({
        message: "Login Succesfull",
        email: user.email,
        token
    })
}

module.exports = { register, login }