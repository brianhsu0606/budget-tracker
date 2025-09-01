import { computed, type Ref } from 'vue'
import type { Transaction } from '@/types/type'
import dayjs from 'dayjs'

export const useSixMonthSummary = (
  incomeList: Ref<Transaction[]>,
  expenseList: Ref<Transaction[]>,
) => {
  const lastSixMonths = computed(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      return dayjs()
        .subtract(5 - i, 'month')
        .format('YYYY-MM')
    })
  })

  const incomeByMonth = computed(() => {
    return lastSixMonths.value.map((month) => {
      return incomeList.value
        .filter((item) => dayjs(item.date).format('YYYY-MM') === month)
        .reduce((sum, item) => sum + item.amount, 0)
    })
  })
  const expenseByMonth = computed(() => {
    return lastSixMonths.value.map((month) => {
      return expenseList.value
        .filter((item) => dayjs(item.date).format('YYYY-MM') === month)
        .reduce((sum, item) => sum + item.amount, 0)
    })
  })

  const monthSummary = computed(() =>
    lastSixMonths.value.map((month, idx) => {
      const income = incomeByMonth.value[idx]
      const expense = expenseByMonth.value[idx]
      const balance = income - expense
      return {
        month,
        income,
        expense,
        balance,
      }
    }),
  )
  return { lastSixMonths, incomeByMonth, expenseByMonth, monthSummary }
}
