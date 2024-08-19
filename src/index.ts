import express, {Request, Response} from "express";
// const express = require('express');
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";
const PORT = process.env.PORT || 8000;


// Coonection
mongoose
.connect(process.env.MongoDB_DataBase_Connection_String as string)
.then(() => console.log("MongoDB DataBase Connected"))
.catch((err) => console.log(`Error occured during connection with database ${err}`));


const app = express();
app.use(express.json());
app.use(cors());

// app.get('/test', async (req: Request, res: Response) => {
//     res.json({message: "Hare Krishna"});
// });

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health OK!" });
});
app.use("/api/my/user", MyUserRoute);


app.listen(PORT, () => console.log(`Server is listening on Port: ${PORT}`)
)