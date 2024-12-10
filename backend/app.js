import express from "express";

const app = express();
const port = 1000;

import dotenv from "dotenv"; 
dotenv.config(); 


import conn from "./connection/conn.js";
import userApi from "./routes/user.js"
import taskApi from "./routes/task.js"
    
import cors from "cors"

app.use(cors());
app.use(express.json()); //Express.js (starting from version 4.16.0) has built-in middleware for parsing JSON payloads. This functionality is provided by express.json()

app.use("/api/v1",userApi);
app.use("/api/v2",taskApi);

app.use("/", (req, res) => {
    res.send("Hello from backend side");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
