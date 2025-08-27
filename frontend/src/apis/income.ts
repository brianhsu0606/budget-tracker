import type { Transaction } from '@/types/type'
import request from './request'

const incomeApi = {
  getIncomeList(): Promise<Transaction[]> {
    return request({
      url: '/incomes',
      method: 'get',
    })
  },
  addIncome(data: Transaction): Promise<Transaction> {
    return request({
      url: '/incomes',
      method: 'post',
      data,
    })
  },
  updateIncome(id: string, data: Transaction): Promise<Transaction> {
    return request({
      url: `/incomes/${id}`,
      method: 'put',
      data,
    })
  },
  deleteIncome(id: string): Promise<void> {
    return request({
      url: `/incomes/${id}`,
      method: 'delete',
    })
  },
}

export default incomeApi
