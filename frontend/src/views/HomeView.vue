<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import dayjs from 'dayjs'
import axios from 'axios'

interface Data {
  id: string
  date: string
  name: string
  category: string
  amount: number
}

const expenseList = ref<Data[]>([])
const incomeList = ref<Data[]>([])

const fetchExpenseList = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/expenses')
    expenseList.value = res.data.result
  } catch (error) {
    console.log(error)
  }
}
const fetchIncomeList = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/incomes')
    incomeList.value = res.data.result
  } catch (error) {
    console.log(error)
  }
}

// const currentMonth = ref<string>(dayjs().format('YYYY-MM'))
// const selectedMonth = ref<string>(currentMonth.value)
// const filteredIncomeList = computed(() => {
//   return incomeList.value.filter(
//     (item) => dayjs(item.date).format('YYYY-MM') === selectedMonth.value,
//   )
// })
// const filteredExpenseList = computed(() => {
//   return expenseList.value.filter(
//     (item) => dayjs(item.date).format('YYYY-MM') === selectedMonth.value,
//   )
// })

// const monthIncome = computed(() => {
//   return filteredIncomeList.value.reduce((sum, item) => item.amount + sum, 0)
// })
// const monthExpense = computed(() => {
//   return filteredExpenseList.value.reduce((sum, item) => item.amount + sum, 0)
// })

// 產生近六個月的月份陣列
const lastSixMonths = computed(() => {
  return Array.from({ length: 6 }).map((_, i) => {
    return dayjs()
      .subtract(5 - i, 'month')
      .format('YYYY-MM')
  })
})

// 對應每個月份，計算收入與支出總和
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

const chartOptions = computed(() => ({
  title: { text: '近 6 個月收支分析', left: 'center' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['收入', '支出'], left: 'left' },
  xAxis: {
    type: 'category',
    data: lastSixMonths.value,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '收入',
      type: 'line',
      data: incomeByMonth.value,
      lineStyle: { color: '#4CAF50' },
    },
    {
      name: '支出',
      type: 'line',
      data: expenseByMonth.value,
      lineStyle: { color: '#F44336' },
    },
  ],
}))

// const map = computed(() => [
//   {
//     title: '收支',
//     color: 'bg-blue-400',
//     amount: monthIncome.value - monthExpense.value,
//     icon: 'DataLine',
//     highlight: true,
//   },
//   { title: '總收入', color: 'bg-green-400', amount: monthIncome.value, icon: 'Money' },
//   { title: '總支出', color: 'bg-red-400', amount: monthExpense.value, icon: 'Money' },
// ])

onMounted(() => {
  fetchIncomeList()
  fetchExpenseList()
})
</script>

<template>
  <header class="mb-4">
    <!-- <el-date-picker v-model="selectedMonth" type="month" format="YYYY-MM" value-format="YYYY-MM" /> -->
  </header>

  <el-card>
    <v-chart :option="chartOptions" autoresize style="height: 300px" />
  </el-card>
</template>

<style scoped lang="scss"></style>
