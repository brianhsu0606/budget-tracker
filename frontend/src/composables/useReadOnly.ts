import type { Transaction } from '@/types/type'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getErrorMessage } from '@/utils/error'

export const useReadOnly = (getApi: () => Promise<Transaction[]>) => {
  const list = ref<Transaction[]>([])
  const isLoading = ref<boolean>(false)

  const fetchList = async () => {
    isLoading.value = true
    try {
      list.value = await getApi()
    } catch (error) {
      ElMessage.error(getErrorMessage(error, '讀取資料失敗'))
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
  return { list, isLoading, fetchList }
}
