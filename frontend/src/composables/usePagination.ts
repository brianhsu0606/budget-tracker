import { ref, computed, watch, type Ref } from 'vue'
import type { Transaction } from '@/types/type'

export const usePagination = (list: Ref<Transaction[]>) => {
  const pageSize = ref<number>(12)
  const currentPage = ref<number>(1)

  const pagedList = computed(() => {
    const start = pageSize.value * (currentPage.value - 1)
    const end = pageSize.value + start
    return list.value.slice(start, end)
  })

  watch(list, () => {
    currentPage.value = 1
  })

  const handlePageChange = (page: number) => {
    currentPage.value = page
  }

  return { pageSize, currentPage, pagedList, handlePageChange }
}
