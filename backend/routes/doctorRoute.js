import express from "express";
import multer from "multer";

import {createDoctor, deleteDoctor, doctorLogin, getDoctorById, getDoctors, toggleAvailability, updateDoctor} from "../controllers/DoctorController.js"
import doctorAuth from "../middlewares/doctorAuth.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const doctorRoute = express.Router();

doctorRoute.get("/", getDoctors);
doctorRoute.post("/login", doctorLogin);
doctorRoute.get("/:id", getDoctorById);
doctorRoute.post("/", upload.single("image"), createDoctor);

//after login
doctorRoute.put("/:id", doctorAuth, upload.single("image"), updateDoctor);
doctorRoute.post("/:id/toggle-availability", doctorAuth, toggleAvailability);
doctorRoute.delete("/:id", deleteDoctor);

export default doctorRoute;