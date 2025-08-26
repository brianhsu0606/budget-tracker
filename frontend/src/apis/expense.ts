import request from '@/apis/request'
import type { Transaction } from '@/types/type'

export default {
  getExpenseList() {
    return request({
      url: 'expenses',
      method: 'get',
    })
  },
  addExpense(data: Transaction) {
    return request({
      url: 'expenses',
      method: 'post',
      data,
    })
  },
}
