// Схемы валидации
export const storeSchema = {
  id: { type: 'number', required: true },
  name: { type: 'string', required: true },
  phones: { type: 'array', required: false, itemSchema: { type: 'string' } }
};

export const brandSchema = {
  id: { type: 'number', required: true },
  name: { type: 'string', required: true }
};

export const modelSchema = {
  id: { type: 'number', required: true },
  name: { type: 'string', required: true }
};

export const carSchema = {
  brand: { type: 'object', required: true, schema: brandSchema },
  model: { type: 'object', required: true, schema: modelSchema },
  price: { type: 'number', required: true },
  store: { type: 'object', required: true, schema: storeSchema }
};

