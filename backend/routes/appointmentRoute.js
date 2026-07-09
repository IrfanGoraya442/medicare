import express from 'express';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { cancelAppointment, confirmPayment, createAppointment, getAppointments, getAppointmentsByDoctor, getAppointmentsByPatient, getStats, updateAppointment, getRegisteredUserCount } from '../controllers/appointmentController.js';

const appointmentRoute = express.Router();

appointmentRoute.get("/", getAppointments);
appointmentRoute.get("/confirm", confirmPayment);
appointmentRoute.get("/stats/summary", getStats);

//authentic Route
appointmentRoute.post("/", clerkMiddleware(), requireAuth(), createAppointment);
appointmentRoute.get("/me", clerkMiddleware(), requireAuth(),  getAppointmentsByPatient),

appointmentRoute.get("/doctor/:doctorId", getAppointmentsByDoctor);

appointmentRoute.post("/:id/cancel", cancelAppointment);
appointmentRoute.get("/patients/count", getRegisteredUserCount);
appointmentRoute.put("/:id", updateAppointment);

export default appointmentRoute;