import type { Transaction } from '@/types/type'
import request from '@/apis/request'

const expenseApi = {
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
  deleteExpense(id: string): Promise<void> {
    return request({
      url: `/expenses/${id}`,
      method: 'delete',
    })
  },
}

export default expenseApi
