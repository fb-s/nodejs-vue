import { getAllModel } from "./model.service.js";

// Получение всех моделей
export const getModel = async (req, res) => {
  try {
    const result = await getAllModel();

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      ...result,
      count: result.data.length,
    });
  } catch (error) {
    console.error('Ошибка в getModel controller:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка getModel',
      message: 'Ошибка при получении моделей'
    });
  }
};
