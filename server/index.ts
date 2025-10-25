import express from "express"
import connectDB from "./config/db.connect.ts";
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import userRoutes from "./routes/userRoutes.ts"

dotenv.config()

const port = process.env.PORT

const app = express()

const corsOption = {
    origin:'*',
    methods:['GET',"POST",'PUT','PATCH','DELETE']
}

// Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors(corsOption))

// Routes
app.use('/api/users', userRoutes)




//connection
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`app is running on ${port}`)
    })
}).catch(()=>{
    console.error("error occured in connecting in database");
    
})
