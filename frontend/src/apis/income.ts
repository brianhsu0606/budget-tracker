import type { Transaction } from '@/types/type'
import request from './request'

const incomeApi = {
  getIncomeList() {
    return request({
      url: '/incomes',
      method: 'get',
    })
  },
  addIncome(data: Transaction) {
    return request({
      url: '/incomes',
      method: 'post',
      data,
    })
  },
  updateIncome(id: string, data: Transaction) {
    return request({
      url: `/incomes/${id}`,
      method: 'put',
      data,
    })
  },
  deleteIncome(id: string) {
    return request({
      url: `/incomes/${id}`,
      method: 'delete',
    })
  },
}

export default incomeApi
