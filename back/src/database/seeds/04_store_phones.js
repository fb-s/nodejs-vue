export async function seed(knex) {
  await knex('store_phones').del();

  const stores = await knex('stores').select('id', 'name');
  const storeMap = {};
  stores.forEach(s => { storeMap[s.name] = s.id; });

  await knex('store_phones').insert([
    { store_id: storeMap['Автомир'], phone: '+7 777 222-22-22' },
    { store_id: storeMap['Автомир'], phone: '+7 777 333-33-33' },
    { store_id: storeMap['Автомир'], phone: '+7 777 444-44-44' },
    { store_id: storeMap['Лада'], phone: '+7 777 555-55-55' },
    { store_id: storeMap['Лада'], phone: '+7 777 666-66-66' },
    { store_id: storeMap['Дром'], phone: '+7 777 777-77-77' }
  ]);
}
