export async function seed(knex) {
  await knex('stores').del();
  await knex('stores').insert([
    {
      name: 'Автомир',
    },
    {
      name: 'Лада',
    },
    {
      name: 'Дром',
    }
  ]);
}
