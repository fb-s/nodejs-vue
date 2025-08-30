export const queries = {
  // Получение всех автомобилей с JOIN
  get: `
    SELECT
    c.id,
    c.price,
    json_build_object(
        'id', b.id,
        'name', b.name
      ) as brand,
    json_build_object(
        'id', m.id,
        'name', m.name
      ) as model,
    json_build_object(
        'id', s.id,
        'name', s.name,
        'phones', CASE
            WHEN count(sp.id) = 0 THEN '[]'::json
            ELSE json_agg(sp.phone)
        END
      ) as store
    FROM cars c
    LEFT JOIN brands b ON c.brand_id = b.id
    LEFT JOIN models m ON c.model_id = m.id
    LEFT JOIN stores s ON c.store_id = s.id
    LEFT JOIN store_phones sp ON sp.store_id = s.id
    GROUP BY c.id, b.id, m.id, s.id
    ORDER BY c.id DESC;
  `,

  // Добавление нового автомобиля
  create: `INSERT INTO cars (brand_id, model_id, store_id, price) VALUES ($1, $2, $3, $4) RETURNING *`
};
