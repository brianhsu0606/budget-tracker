<script setup lang="ts">
import type { Transaction } from '@/types/type'
import { computed, onMounted, ref } from 'vue'
import expenseApi from '@/apis/expense'
import incomeApi from '@/apis/income'
import dayjs from 'dayjs'

const expenseList = ref<Transaction[]>([])
const incomeList = ref<Transaction[]>([])

const fetchExpenseList = async () => {
  try {
    expenseList.value = await expenseApi.getExpenseList()
  } catch (error) {
    console.log(error)
  }
}
const fetchIncomeList = async () => {
  try {
    incomeList.value = await incomeApi.getIncomeList()
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
  tooltip: { trigger: 'axis' },
  legend: {},
  xAxis: {
    type: 'category',
    data: lastSixMonths.value,
    axisLabel: { fontSize: 16, fontWeight: 'bold' },
  },
  yAxis: { type: 'value', axisLabel: { fontSize: 16, fontWeight: 'bold' } },
  series: [
    {
      name: '收入',
      type: 'line',
      // smooth: true,
      data: incomeByMonth.value,
      itemStyle: { color: '#4CAF50' },
    },
    {
      name: '支出',
      type: 'line',
      // smooth: true,
      data: expenseByMonth.value,
      itemStyle: { color: '#F44336' },
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
    <h3 class="text-xl font-bold mb-4 text-center">近 6 個月收支紀錄</h3>
    <el-table
      :data="monthSummary.slice().reverse()"
      stripe
      style="width: 100%"
      class="text-lg font-bold"
      border
    >
      <el-table-column prop="month" label="月份" />
      <el-table-column prop="income" align="right" header-align="left">
        <template #header>
          <span class="text-green-600 font-bold">收入</span>
        </template>
        <template #default="{ row }">
          {{ row.income.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="expense" align="right" header-align="left">
        <template #header>
          <span class="text-red-600 font-bold">支出</span>
        </template>
        <template #default="{ row }">
          {{ row.expense.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="結餘" align="right" header-align="left">
        <template #default="{ row }">
          <span :class="row.balanceColor">
            {{ row.balance.toLocaleString() }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-card class="relative">
    <h3 class="text-xl font-bold absolute left-1/2 -translate-x-1/2">近 6 個月收支分析</h3>
    <v-chart :option="chartOptions" autoresize style="height: 300px" />
  </el-card>
</template>

<style scoped lang="scss"></style>
