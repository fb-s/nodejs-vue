export async function seed(knex) {
  await knex('brands').del();
  await knex('brands').insert([
    { name: 'Toyota' },
    { name: 'Lada' },
    { name: 'Kia' },
    { name: 'Mazda' },
    { name: 'Hyundai' },
    { name: 'BMW' },
  ]);
}
