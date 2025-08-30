import express from 'express';
import { getBrand } from './brand.controller.js';

const router = express.Router();

router.get('/', getBrand); // GET /api/brand - получение всех брендов

export default router;
