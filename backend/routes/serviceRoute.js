import express from 'express';
import multer from 'multer';

import { createService, deleteService, getServiceById, getServices, updateService } from '../controllers/serviceController.js';

const upload = multer ({dest: "/temp"});
const serviceRoute = express.Router();

serviceRoute.get("/", getServices);
serviceRoute.get("/:id", getServiceById);

serviceRoute.post('/', upload.single("image"), createService);
serviceRoute.put("/:id", upload.single("image"), updateService);

serviceRoute.delete("/:id", deleteService);

export default serviceRoute;
