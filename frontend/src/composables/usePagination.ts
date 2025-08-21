import { ref, computed, type Ref, watch } from 'vue'

export const usePagination = <T>(list: Ref<T[]>) => {
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
