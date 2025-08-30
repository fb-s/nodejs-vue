import { getAllCars, addNewCar } from "./car.service.js";

// Получение всех автомобилей
export const getCars = async (req, res) => {
  try {
    const result = await getAllCars();

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      ...result,
      count: result.data.length,
    });
  } catch (error) {
    console.error('Ошибка в getCars controller:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка getCars',
      message: 'Ошибка при получении данных об авто'
    });
  }
};

// Добавление нового автомобиля
export const addCar = async (req, res) => {
  try {
    const result = await addNewCar(req.body);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.status(201).json({
      ...result,
      message: 'Элемент успешно добавлен'
    });
  } catch (error) {
    console.error('Ошибка в addCar controller:', error);
    res.status(500).json({ error: 'Ошибка при добавлении авто' });
  }
};
