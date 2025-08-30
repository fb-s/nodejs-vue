import pool from '../../database/db.js';
import { queries } from './car.queries.js';

// Получение всех автомобилей
export const getAllCars = async () => {
  try {
    const result = await pool.query(queries.get);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Ошибка в carService.getAllCars:', error);
    return { success: false, error: 'Ошибка при запросе списка авто' };
  }
}

/** Добавление нового автомобиля */
/**
 * @typedef {Object} BrandDto
 * @property {number} id - ID бренда
 * @property {string} name - Название бренда
 */

/**
 * @typedef {Object} ModelDto
 * @property {number} id - ID модели
 * @property {string} name - Название модели
 */

/**
 * @typedef {Object} StoreDto
 * @property {number} id - ID магазина
 * @property {string} name - Название магазина
 * @property {string[]} phones - Телефоны
 */

/**
 * @typedef {Object} CarDto
 * @property {BrandDto} brand - Бренд автомобиля
 * @property {ModelDto} model - Модель автомобиля
 * @property {number} price - Цена
 * @property {StoreDto} store - Магазин
 */
export const addNewCar = async (carData) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { brand, model, store, price } = carData;
    const carResult = await client.query(queries.create, [brand.id, model.id, store.id, price]);

    await client.query('COMMIT');

    return {
      success: true,
      data: carResult.rows[0],
      message: 'Автомобиль успешно добавлен'
    };

  } catch (error) {
    await client.query('ROLLBACK');

    console.error('Ошибка в carService.addNewCar:', error);
    return {
      success: false,
      error: 'Ошибка при добавлении автомобиля',
      message: 'Ошибка при добавлении автомобиля'
    };
  } finally {
    client.release();
  }
}
