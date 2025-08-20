import { ref, computed, type Ref } from 'vue'

export const usePagination = <T>(list: Ref<T[]>) => {
  const pageSize = ref<number>(12)
  const currentPage = ref<number>(1)
  const handlePageChange = (page: number) => {
    currentPage.value = page
  }
  const pagedList = computed(() => {
    const start = pageSize.value * (currentPage.value - 1)
    const end = pageSize.value + start
    return list.value.slice(start, end)
  })
  return { pageSize, currentPage, pagedList, handlePageChange }
}
