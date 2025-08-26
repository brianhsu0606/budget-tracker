import request from '@/apis/request'
import type { Transaction, TransactionForm } from '@/types/type'

export default {
  getExpenseList(): Promise<Transaction[]> {
    return request({
      url: '/expenses',
      method: 'get',
    })
  },
  addExpense(data: TransactionForm): Promise<Transaction> {
    return request({
      url: '/expenses',
      method: 'post',
      data,
    })
  },
  deleteExpense(id: string) {
    return request({
      url: `/expenses/${id}`,
      method: 'delete',
    })
  },
}
