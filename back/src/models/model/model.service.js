import pool from '../../database/db.js';
import { queries } from './model.queries.js';

// Получение всех брендов
export const getAllModel = async () => {
  try {
    const result = await pool.query(queries.get);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Ошибка в modelService.getAllModel:', error);
    return { success: false, error: 'Ошибка при запросе списка моделей' };
  }
}
