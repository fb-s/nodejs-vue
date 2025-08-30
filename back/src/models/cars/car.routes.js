import express from 'express';
import { addCar, getCars } from './car.controller.js';
import { validateDto } from "../../validator.js";
import { carSchema } from "../../schemas.js";

const router = express.Router();

router.get('/', getCars); // GET /api/cars - получение всех автомобилей
router.post('/', validateDto(carSchema), addCar); // POST /api/cars - добавление нового автомобиля

export default router;
