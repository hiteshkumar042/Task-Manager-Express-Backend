require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const taskRouter = require("./Routers/taskRoute");
const authRouter = require("./Routers/authRoute")
const authMiddleware = require("./middlewares/authMiddleware")

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/", authRouter)
app.use("/task", authMiddleware, taskRouter);


mongoose.connect(process.env.MONGO_URI,
).then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
})