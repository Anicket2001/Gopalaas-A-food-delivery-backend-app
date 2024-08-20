import express, {Request, Response} from "express";
// const express = require('express');
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";
import {v2 as cloudinary} from 'cloudinary';
import myRestaurantRoute from "./routes/MyRestaurantRoute";
// import restaurantRoute from "./routes/RestaurantRoute";
// import orderRoute from "./routes/OrderRoute";

const PORT = process.env.PORT || 8000;


// Coonection
mongoose
.connect(process.env.MongoDB_DataBase_Connection_String as string)
.then(() => console.log("MongoDB DataBase Connected"))
.catch((err) => console.log(`Error occured during connection with database ${err}`));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const app = express();
app.use(express.json());
app.use(cors());

// app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

// app.get('/test', async (req: Request, res: Response) => {
//     res.json({message: "Hare Krishna"});
// });

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health OK!" });
});


app.use("/api/my/user", MyUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
// app.use("/api/restaurant", restaurantRoute);
// app.use("/api/order", orderRoute);


app.listen(PORT, () => console.log(`Server is listening on Port: ${PORT}`)
)