import express from 'express';
import { getStore } from './store.controller.js';

const router = express.Router();

router.get('/', getStore); // GET /api/stores - получение магазинов

export default router;
