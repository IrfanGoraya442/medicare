import express from 'express';
import multer from 'multer';

import { createService, deleteService, getServiceById, getServices, updateService } from '../controllers/serviceController.js';


const storage = multer.memoryStorage();
const upload = multer({ storage });

const serviceRoute = express.Router();

serviceRoute.get("/", getServices);
serviceRoute.get("/:id", getServiceById);

serviceRoute.post('/', upload.single("image"), createService);
serviceRoute.put("/:id", upload.single("image"), updateService);

serviceRoute.delete("/:id", deleteService);

export default serviceRoute;
