import { getAllBrand } from "./brand.service.js";

// Получение всех брендов
export const getBrand = async (req, res) => {
  try {
    const result = await getAllBrand();

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.json({
      ...result,
      count: result.data.length,
    });
  } catch (error) {
    console.error('Ошибка в getBrand controller:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка getBrand',
      message: 'Ошибка при получении брендов'
    });
  }
};
