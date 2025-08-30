import express from 'express';
import { getModel } from './model.controller.js';

const router = express.Router();

router.get('/', getModel); // GET /api/models - получение моделей

export default router;
