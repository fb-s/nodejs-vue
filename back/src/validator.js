/**
 * Middleware для валидации DTO
 * @param {Object} schema - Схема валидации
 * @returns {Function} Express middleware
 */
export function validateDto(schema) {
  return (req, res, next) => {
    const errors = [];

    for (const [key, config] of Object.entries(schema)) {
      const value = req.body[key];

      // Проверка обязательных полей
      if (config.required && (value === undefined || value === null)) {
        errors.push(`Поле ${key} обязательно`);
        continue;
      }

      // Пропускаем необязательные поля, если они отсутствуют
      if (!config.required && (value === undefined || value === null)) {
        continue;
      }

      // Проверка типа для примитивов
      if (config.type !== 'object' && config.type !== 'array' && typeof value !== config.type) {
        errors.push(`Поле ${key} должно быть типа ${config.type}`);
        continue;
      }

      // Проверка вложенных объектов
      if (config.type === 'object' && config.schema) {
        const nestedErrors = validateNestedObject(value, config.schema, key);
        errors.push(...nestedErrors);
      }

      // Проверка массивов
      if (config.type === 'array' && config.itemSchema) {
        const arrayErrors = validateArray(value, config.itemSchema, key);
        errors.push(...arrayErrors);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
}

/**
 * Валидация вложенных объектов
 * @param {Object} obj - Объект для валидации
 * @param {Object} schema - Схема валидации
 * @param {string} parentKey - Родительский ключ для сообщений об ошибках
 * @returns {string[]} Массив ошибок
 */
function validateNestedObject(obj, schema, parentKey) {
  const errors = [];

  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    errors.push(`Поле ${parentKey} должно быть объектом`);
    return errors;
  }

  for (const [key, config] of Object.entries(schema)) {
    const value = obj[key];

    if (config.required && (value === undefined || value === null)) {
      errors.push(`Поле ${parentKey}.${key} обязательно`);
      continue;
    }

    if (!config.required && (value === undefined || value === null)) {
      continue;
    }

    if (config.type !== 'object' && config.type !== 'array' && typeof value !== config.type) {
      errors.push(`Поле ${parentKey}.${key} должно быть типа ${config.type}`);
      continue;
    }

    // Рекурсивная проверка вложенных объектов
    if (config.type === 'object' && config.schema) {
      const nestedErrors = validateNestedObject(value, config.schema, `${parentKey}.${key}`);
      errors.push(...nestedErrors);
    }

    // Проверка массивов во вложенных объектах
    if (config.type === 'array' && config.itemSchema) {
      const arrayErrors = validateArray(value, config.itemSchema, `${parentKey}.${key}`);
      errors.push(...arrayErrors);
    }
  }

  return errors;
}

/**
 * Валидация массивов
 * @param {Array} array - Массив для валидации
 * @param {Object} itemConfig - Конфигурация элементов массива
 * @param {string} parentKey - Родительский ключ для сообщений об ошибках
 * @returns {string[]} Массив ошибок
 */
function validateArray(array, itemConfig, parentKey) {
  const errors = [];

  if (!Array.isArray(array)) {
    errors.push(`Поле ${parentKey} должно быть массивом`);
    return errors;
  }

  array.forEach((item, index) => {
    const elementKey = `${parentKey}[${index}]`;

    // Если указан просто тип для примитивов
    if (itemConfig.type && typeof itemConfig.type === 'string' && itemConfig.type !== 'object' && itemConfig.type !== 'array') {
      if (typeof item !== itemConfig.type) {
        errors.push(`Элемент ${elementKey} должен быть типа ${itemConfig.type}`);
      }
      return;
    }

    // Если указана схема для объектов
    if (itemConfig.type === 'object' && itemConfig.schema) {
      if (typeof item !== 'object' || item === null || Array.isArray(item)) {
        errors.push(`Элемент ${elementKey} должен быть объектом`);
        return;
      }
      const itemErrors = validateNestedObject(item, itemConfig.schema, elementKey);
      errors.push(...itemErrors);
      return;
    }

    // Если указана схема для вложенных массивов
    if (itemConfig.type === 'array' && itemConfig.itemSchema) {
      if (!Array.isArray(item)) {
        errors.push(`Элемент ${elementKey} должен быть массивом`);
        return;
      }
      const nestedArrayErrors = validateArray(item, itemConfig.itemSchema, elementKey);
      errors.push(...nestedArrayErrors);
      return;
    }

    errors.push(`Неизвестный тип элемента для ${elementKey}`);
  });

  return errors;
}
