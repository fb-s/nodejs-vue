export async function seed(knex) {
  await knex('models').del();

  const brands = await knex('brands').select('id', 'name');
  const brandMap = {};
  brands.forEach(b => { brandMap[b.name] = b.id; });

  await knex('models').insert([
    // Toyota
    { brand_id: brandMap['Toyota'], name: 'RAV4' },
    { brand_id: brandMap['Toyota'], name: 'Camry' },
    { brand_id: brandMap['Toyota'], name: 'Corolla' },

    // Lada
    { brand_id: brandMap['Lada'], name: 'Granta' },
    { brand_id: brandMap['Lada'], name: 'Vesta' },
    { brand_id: brandMap['Lada'], name: 'Niva' },

    // Kia
    { brand_id: brandMap['Kia'], name: 'Sportage' },
    { brand_id: brandMap['Kia'], name: 'Rio' },

    // Mazda
    { brand_id: brandMap['Mazda'], name: 'CX-5' },
    { brand_id: brandMap['Mazda'], name: 'CX-9' },

    // Hyundai
    { brand_id: brandMap['Hyundai'], name: 'Creta' },
    { brand_id: brandMap['Hyundai'], name: 'Solaris' },


    // BMW
    { brand_id: brandMap['BMW'], name: 'X5' },
    { brand_id: brandMap['BMW'], name: '3 Series' },
  ]);
}
