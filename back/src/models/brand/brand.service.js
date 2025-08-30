import pool from '../../database/db.js';
import { queries } from './brand.queries.js';

// Получение всех брендов
export const getAllBrand = async () => {
  try {
    const result = await pool.query(queries.get);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Ошибка в brandService.getAllBrand:', error);
    return { success: false, error: 'Ошибка при запросе списка брендов' };
  }
}
