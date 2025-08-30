export function up(knex) {
  return knex.schema
    // Марки авто
    .createTable('brands', (table) => {
      table.increments('id').primary().comment('Уникальный идентификатор марки');
      table.string('name', 100).notNullable().unique().comment('Название марки автомобиля');
    })

    // Модели авто
    .createTable('models', (table) => {
      table.increments('id').primary().comment('Уникальный идентификатор модели');

      table.integer('brand_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('brands')
        .comment('ID марки автомобиля');

      table.string('name', 100).notNullable().comment('Название модели автомобиля');
    })

    // Магазины
    .createTable('stores', (table) => {
      table.increments('id').primary().comment('Уникальный идентификатор магазина');
      table.string('name', 100).notNullable().comment('Название магазина');
    })

    // Телефоны
    .createTable('store_phones', (table) => {
      table.increments('id').primary().comment('Уникальный идентификатор телефона');

      table.integer('store_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('stores')
        .comment('ID магазина');

      table.string('phone', 20).notNullable().comment('Номер телефона магазина');
    })

    // Авто
    .createTable('cars', (table) => {
      table.increments('id').primary().comment('Уникальный идентификатор автомобиля');

      table.integer('brand_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('brands')
        .comment('ID марки автомобиля');

      table.integer('model_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('models')
        .comment('ID модели автомобиля');

      table.integer('store_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('stores')
        .comment('ID магазина');

      table.integer('price').notNullable().comment('Стоимость автомобиля в рублях');
    })

    .then(() => {
      return knex.schema
        .raw('CREATE INDEX idx_models_brand_id ON models(brand_id)')
        .raw('CREATE INDEX idx_cars_brand_id ON cars(brand_id)')
        .raw('CREATE INDEX idx_cars_model_id ON cars(model_id)')
        .raw('CREATE INDEX idx_cars_store_id ON cars(store_id)')
        .raw('CREATE INDEX idx_cars_price ON cars(price)')
        .raw('CREATE INDEX idx_stores_name ON stores(name)')
        .raw('CREATE INDEX idx_brands_name ON brands(name)')
        .raw('CREATE INDEX idx_models_name ON models(name)')
        .raw('CREATE INDEX idx_store_phones_store_id ON store_phones(store_id)');
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists('cars')
    .dropTableIfExists('store_phones')
    .dropTableIfExists('stores')
    .dropTableIfExists('models')
    .dropTableIfExists('brands');
}
