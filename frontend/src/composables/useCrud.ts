import type { Transaction, Dialog } from '@/types/type'
import { ref, type Ref } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import { getErrorMessage } from '@/utils/error'

export const useCrud = (
  formRef: Ref<FormInstance | undefined>,
  dialog: Dialog,
  defaultForm: Transaction,
  getApi: () => Promise<Transaction[]>,
  addAPi: (data: Transaction) => Promise<Transaction>,
  updateApi: (id: string, data: Transaction) => Promise<Transaction>,
  deleteApi: (id: string) => Promise<void>,
) => {
  const list = ref<Transaction[]>([])
  const isLoading = ref<boolean>(false)

  const fetchList = async () => {
    isLoading.value = true
    try {
      list.value = await getApi()
    } catch (error) {
      ElMessage.error(getErrorMessage(error, '讀取資料失敗'))
    } finally {
      isLoading.value = false
    }
  }

  const handleAdd = () => {
    dialog.isVisible = true
    dialog.isEdit = false
    Object.assign(dialog.form, defaultForm)
    formRef.value?.clearValidate()
  }

  const handleEdit = (row: Transaction) => {
    dialog.isVisible = true
    dialog.isEdit = true
    Object.assign(dialog.form, row)
    formRef.value?.clearValidate()
  }

  const handleSubmit = async () => {
    isLoading.value = true
    try {
      await formRef.value?.validate()
      if (dialog.isEdit && dialog.form.id) {
        const updatedItem = await updateApi(dialog.form.id, dialog.form)
        const index = list.value.findIndex((item) => item.id === updatedItem.id)
        list.value[index] = updatedItem
      } else {
        const newItem = await addAPi(dialog.form)
        list.value.unshift(newItem)
      }
      list.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      dialog.isVisible = false
      ElMessage.success(dialog.isEdit ? '編輯成功' : '新增成功')
    } catch (error) {
      ElMessage.error(getErrorMessage(error, dialog.isEdit ? '編輯失敗' : '新增失敗'))
    } finally {
      isLoading.value = false
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await ElMessageBox.confirm('確定要刪除這筆資料嗎？', '警告', {
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        type: 'warning',
      })
      isLoading.value = true
      await deleteApi(id)
      list.value = list.value.filter((expense) => expense.id !== id)
      dialog.isVisible = false
      ElMessage.success('刪除成功')
    } catch (error) {
      // ElMessageBox 按取消會進入 catch，可以不用處理
      if (error !== 'cancel') {
        ElMessage.error(getErrorMessage(error, '刪除失敗'))
      }
    } finally {
      isLoading.value = false
    }
  }

  return { list, isLoading, fetchList, handleAdd, handleEdit, handleDelete, handleSubmit }
}
