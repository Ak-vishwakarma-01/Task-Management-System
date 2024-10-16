import express from "express";

const app = express();
const port = 1000;

import dotenv from "dotenv"; 
dotenv.config(); 


import userApi from "./routes/user.js"
import taskApi from "./routes/task.js"

import cors from "cors"

app.use(cors());
app.use(express.json());

app.use("/api/v1",userApi);
app.use("/api/v2",taskApi);

app.use("/", (req, res) => {
    res.send("Hello from backend side");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
