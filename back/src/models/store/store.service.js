import pool from '../../database/db.js';
import { queries } from './store.queries.js';

// Получение всех брендов
export const getAllStore = async () => {
  try {
    const result = await pool.query(queries.get);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Ошибка в storeService.getAllStore:', error);
    return { success: false, error: 'Ошибка при запросе списка магазинов' };
  }
}
