<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Transaction } from '@/types/type'
import dayjs from 'dayjs'
import axios from 'axios'

const expenseList = ref<Transaction[]>([])
const incomeList = ref<Transaction[]>([])

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
  // legend: { data: ['收入', '支出'], top: 30 },
  xAxis: { type: 'category', data: lastSixMonths.value },
  yAxis: { type: 'value', name: '金額' },
  series: [
    {
      name: '收入',
      type: 'line',
      smooth: true,
      data: incomeByMonth.value,
      lineStyle: { color: '#4CAF50' },
    },
    {
      name: '支出',
      type: 'line',
      smooth: true,
      data: expenseByMonth.value,
      lineStyle: { color: '#F44336' },
    },
  ],
}))

// 將資料組合成卡片需要的格式
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
      balanceColor: balance > 0 ? 'text-green-600' : balance < 0 ? 'text-red-600' : 'text-gray-600',
    }
  }),
)
onMounted(() => {
  fetchIncomeList()
  fetchExpenseList()
})
</script>

<template>
  <el-card class="mb-4">
    <h2 class="text-xl font-bold mb-4 text-center">近 6 個月收支紀錄</h2>
    <el-table :data="monthSummary" border stripe style="width: 100%" class="text-lg font-bold">
      <el-table-column prop="month" label="月份" width="120" />
      <el-table-column prop="income" label="收入" align="right">
        <template #default="{ row }">
          {{ row.income.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="expense" label="支出" align="right">
        <template #default="{ row }">
          {{ row.expense.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="結餘" align="right">
        <template #default="{ row }">
          <span :class="row.balanceColor">
            {{ row.balance.toLocaleString() }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-card>
    <v-chart :option="chartOptions" autoresize style="height: 300px" />
  </el-card>
</template>

<style scoped lang="scss"></style>
