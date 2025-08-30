import { ref, readonly } from "vue";
import { urls } from "../urls/urls";

/**
 * Стор для работы со списком бренда авто
 *
 * brandInterface
 * 
 * Интерфейс бренда авто:
 * - id: number
 * - name: string
 *
 */
export function useBrand() {
  // Состояния
  const brands = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Публичное состояние - только для чтения
  const state = readonly(brands);

  const load = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await fetch(urls.brand.get);

      if (!res.ok) {
        throw new Error(`HTTP ошибка! status: ${res.status}`);
      }

      const resData = await res.json();

      if (resData.error) {
        throw new Error(resData.message || 'Не удалось загрузить машины');
      }

      brands.value = resData.data || [];

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
