import request from '@/apis/request'
import type { Transaction } from '@/types/type'

export default {
  getExpenseList(): Promise<Transaction[]> {
    return request({
      url: '/expenses',
      method: 'get',
    })
  },
  addExpense(data: Transaction): Promise<Transaction> {
    return request({
      url: '/expenses',
      method: 'post',
      data,
    })
  },
  updateExpense(id: string, data: Transaction): Promise<Transaction> {
    return request({
      url: `/expenses/${id}`,
      method: 'put',
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
