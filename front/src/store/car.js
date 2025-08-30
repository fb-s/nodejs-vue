import { readonly, ref } from "vue";
import { urls } from "../urls/urls";

/**
 * Стор для работы со списком моделей авто
 *
 * carInterface
 *
 * Интерфейс модели авто:
 * - id: number
 * - model: modelInterface
 * - brand: brandInterface
 * - store: storeInterface
 * - price: number
 *
 */
export function useCar() {
  // Состояния
  const cars = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Публичное состояние - только для чтения
  const state = readonly(cars);

  const load = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await fetch(urls.car.get);

      if (!res.ok) {
        throw new Error(`HTTP ошибка! status: ${res.status}`);
      }

      const resData = await res.json();

      if (resData.error) {
        throw new Error(resData.message || 'Не удалось загрузить машины');
      }

      cars.value = resData.data || [];

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки машин';
      console.error('Ошибка загрузки машин:', err);
    } finally {
      loadingStop();
    }
  }

  const save = async (value) => {
    isLoading.value = true;
    error.value = null;

    if (!dataIsValid(value)) { loadingStop(); return }

    try {
      const res = await fetch(urls.car.save, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      });

      if (!res.ok) {
        throw new Error(`HTTP ошибка! status: ${res.status}`);
      }

      const resData = await res.json();

      if (resData.error) {
        throw new Error(resData.message || 'Ошибка сохранения машины');
      }

      // После успешного сохранения обновляем список
      await load();
      return true;

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка сохранения машины';
      console.error('Ошибка сохранения машины:', err);
      loadingStop();
      return false;
    }
  }

  const createCurrent = () => {
    return {
      model: null,
      brand: null,
      store: null,
      price: 0
    }
  }

  const loadingStop = () => {
    setTimeout(() => isLoading.value = false, 2000);
  }

  const dataIsValid = (value) => {
    const errors = []
    if (!value.model) errors.push('Модель не выбрана');
    if (!value.brand) errors.push('Марка не выбрана');
    if (!value.store) errors.push('Магазин не выбран');
    if (!value.price) errors.push('Цена не указана');
    if (errors.length > 0) error.value = errors.join(', ');
    return !error.value
  }

  return {
    // Публичное состояние
    state,

    // Состояния загрузки и ошибок
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Методы
    load,
    save,
    createCurrent
  }
}
