import { getAllStore } from "./store.service.js";

// Получение всех магазинов
export const getStore = async (req, res) => {
  try {
    const result = await getAllStore();

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      ...result,
      count: result.data.length,
    });
  } catch (error) {
    console.error('Ошибка в getStore controller:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка getStore',
      message: 'Ошибка при получении магазинов'
    });
  }
};
