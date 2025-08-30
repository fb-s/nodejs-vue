import knex from 'knex';
import knexConfig from './knexfile.js';

const initializeDatabase = async () => {
  const db = knex(knexConfig.development);

  try {
    console.log('Запускаем миграции...');
    await db.migrate.latest();
    console.log('Запускаем сиды...');
    await db.seed.run();

    console.log('Готово!');
  } catch (error) {
    console.error('Ошибка knex:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
};

initializeDatabase();
