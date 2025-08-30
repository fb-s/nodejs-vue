export async function seed(knex) {
  await knex('cars').del();

  const brands = await knex('brands').select('id', 'name');
  const models = await knex('models').select('id', 'name', 'brand_id');
  const stores = await knex('stores').select('id', 'name');

  const brandMap = {};
  const modelMap = {};
  const storeMap = {};

  brands.forEach(b => { brandMap[b.name] = b.id; });
  models.forEach(m => { modelMap[`${m.brand_id}-${m.name}`] = m.id; });
  stores.forEach(s => { storeMap[s.name] = s.id; });

  await knex('cars').insert([
    // Автомир
    {
      brand_id: brandMap['Toyota'],
      model_id: modelMap[`${brandMap['Toyota']}-RAV4`],
      store_id: storeMap['Автомир'],
      price: 2559000
    },
    {
      brand_id: brandMap['Lada'],
      model_id: modelMap[`${brandMap['Lada']}-Granta`],
      store_id: storeMap['Автомир'],
      price: 980000
    },
    {
      brand_id: brandMap['BMW'],
      model_id: modelMap[`${brandMap['BMW']}-X5`],
      store_id: storeMap['Автомир'],
      price: 7850000
    },
    {
      brand_id: brandMap['Hyundai'],
      model_id: modelMap[`${brandMap['Hyundai']}-Creta`],
      store_id: storeMap['Автомир'],
      price: 1850000
    },

    // Лада
    {
      brand_id: brandMap['Toyota'],
      model_id: modelMap[`${brandMap['Toyota']}-Camry`],
      store_id: storeMap['Лада'],
      price: 2358000
    },
    {
      brand_id: brandMap['Kia'],
      model_id: modelMap[`${brandMap['Kia']}-Sportage`],
      store_id: storeMap['Лада'],
      price: 2633000
    },

    // Дром
    {
      brand_id: brandMap['Kia'],
      model_id: modelMap[`${brandMap['Kia']}-Sportage`],
      store_id: storeMap['Дром'],
      price: 2720000
    },
  ]);
}
