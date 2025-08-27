import type { Transaction, Dialog } from '@/types/type'
import { ref } from 'vue'

export const useCrud = (
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
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  const handleAdd = () => {
    dialog.isVisible = true
    dialog.isEdit = false
    Object.assign(dialog.form, defaultForm)
  }

  const handleEdit = (row: Transaction) => {
    dialog.isVisible = true
    dialog.isEdit = true
    Object.assign(dialog.form, row)
  }

  const submit = async () => {
    isLoading.value = true
    try {
      if (dialog.isEdit && dialog.form.id) {
        const updatedItem = await updateApi(dialog.form.id, dialog.form)
        const index = list.value.findIndex((item) => item.id === updatedItem.id)
        list.value[index] = updatedItem
      } else {
        const newItem = await addAPi(dialog.form)
        list.value.unshift(newItem)
      }
      dialog.isVisible = false
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const handleDelete = async (id: string) => {
    isLoading.value = true
    try {
      await deleteApi(id)
      list.value = list.value.filter((expense) => expense.id !== id)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return { list, isLoading, fetchList, handleAdd, handleEdit, handleDelete, submit }
}
