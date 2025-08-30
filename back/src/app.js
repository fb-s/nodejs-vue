import cors from 'cors';
import express from 'express';

import carRoutes from './models/cars/car.routes.js';
import brandRoutes from './models/brand/brand.routes.js';
import modelsRoutes from './models/model/model.routes.js';
import storesRoutes from './models/store/store.routes.js';

const app = express();

app.use(cors()); // Разрешаем CORS запросы
app.use(express.json()); // Парсинг JSON тел запросов
app.use('/api/cars', carRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/models', modelsRoutes);
app.use('/api/stores', storesRoutes);
app.use(/.*/, (req, res) => {
  res.status(404).json({ error: 'Страница не найдена' });
});

app.use((err, req, res, next) => {
  // TODO: логирование ошибок
  console.error(err.stack);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

export default app;
