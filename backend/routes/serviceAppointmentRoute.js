import express from "express";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import { cancelServiceAppointment, confirmServicePayment, createServiceAppointment, getServiceAppointmentById, getServiceAppointments, getServiceAppointmentsByPatient, getServiceAppointmentStats, updateServiceAppointment } from "../controllers/serviceAppointmentController.js";

const serviceAppointmentRoute = express.Router();

serviceAppointmentRoute.get("/", getServiceAppointments);
serviceAppointmentRoute.get("/confirm", confirmServicePayment);
serviceAppointmentRoute.get("/stats/summary",getServiceAppointmentStats);

serviceAppointmentRoute.post("/", clerkMiddleware(), requireAuth(), createServiceAppointment);

serviceAppointmentRoute.get("/me", clerkMiddleware(), requireAuth(), getServiceAppointmentsByPatient);

serviceAppointmentRoute.get("/:id", getServiceAppointmentById);
serviceAppointmentRoute.put("/:id", updateServiceAppointment);
serviceAppointmentRoute.post("/:id/cancel", cancelServiceAppointment);

export default serviceAppointmentRoute;