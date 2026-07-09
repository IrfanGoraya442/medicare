import express from "express";
import cors from "cors";
import 'dotenv/config';
import {clerkMiddleware} from '@clerk/express';
import { connectDB } from "./config/db.js";
import doctorRoute from "./routes/doctorRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import serviceAppointmentRoute from "./routes/serviceAppointmentRoute.js";

const app = express();
const port = 4000;

const allowedOrigins = [ process.env.FRONTEND_URL, process.env.ADMIN_URL]

//Middlewares
app.use(cors(
    {
        origin: function (origin, callback){
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)){
                return callback(null, true)
            }
            return callback(new Error("Not Allowed By the Cors"));

        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));

app.use(clerkMiddleware());
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true}));

//DB
connectDB();

//Routes
app.use("/api/doctors", doctorRoute);
app.use("/api/services", serviceRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/service-appointments", serviceAppointmentRoute);


app.get('/', (req, res) => {
    res.send("API_WORKING");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});