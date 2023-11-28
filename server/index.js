import express from "express"
import bodyParser from "body-parser";
import dbconnect from "./config/dbconnect.js";
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import orderRoute from "./routes/orderRoute.js"
import paymentRoute from "./routes/PaymentRoute.js"
import companyRoute from "./routes/companyRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import phonePeRoute from "./routes/phonePayRoute.js"


import { errorHandler, notFound } from "./middlewares/errorHandling.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import 'dotenv/config'



const port=process.env.PORT ||8080;
const app=express();

dbconnect()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())

app.use("/api/user",userRoute)
app.use("/api/product",productRoute)
app.use("/api/order",orderRoute)
app.use("/api/company",companyRoute)
app.use("/api/category",categoryRoute)

app.use("/api/phonepe",phonePeRoute)



app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server listening on ${port}`)
});