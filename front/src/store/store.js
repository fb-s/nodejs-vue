import { ref, readonly } from "vue";
import { urls } from "../urls/urls";

/**
 * Стор для работы со списком магазинов
 *
 * storeInterface
 * 
 * Интерфейс магазина:
 * - id: number
 * - name: string
 * - phone?: string[]
 *
 */
export function useStore() {
  // Состояния
  const stores = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Публичное состояние - только для чтения
  const state = readonly(stores);

  const load = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await fetch(urls.store.get);

      if (!res.ok) {
        throw new Error(`HTTP ошибка! status: ${res.status}`);
      }

      const resData = await res.json();

      if (resData.error) {
        throw new Error(resData.message || 'Не удалось загрузить машины');
      }

      stores.value = resData.data || [];

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки машин';
      console.error('Ошибка загрузки машин:', err);
    } finally {
      loadingStop();
    }
  }

  const loadingStop = () => {
    setTimeout(() => isLoading.value = false, 2000);
  }

  return {
    // Публичное состояние
    state,

    // Состояния загрузки и ошибок
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Методы
    load,
  }
}
