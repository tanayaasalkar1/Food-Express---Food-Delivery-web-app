import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/uesrRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


//app config
const app = express()  //initializing express server
const port = 4000    //port to run this server


// middleware
app.use(express.json())  //whenever there is any request from front end to backend that will pass via express.json()
app.use(cors()) 

//DB connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.get("/", (req,res) => {
    res.send("API Working")
})   //http method to request the data from the server

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)   //running express server
})

//mongodb+srv://<db_username>:<db_password>@cluster0.wovpp0u.mongodb.net/?