<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'

interface Expense {
  date: string
  name: string
  category: string
  amount: number
}

const expenseList = ref<Expense[]>([])

const fetchExpenses = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/expenses')
    expenseList.value = res.data.result
  } catch (error) {
    console.log(error)
  }
}

// 月份篩選
const currentMonth: string = dayjs().format('YYYY-MM')
const selectedMonth = ref<string>(currentMonth)
const filteredExpenseList = computed(() => {
  return expenseList.value.filter(
    (expense) => dayjs(expense.date).format('YYYY-MM') === selectedMonth.value,
  )
})

// 圓餅圖
const categoryNameMap: Record<string, string> = {
  food: '飲食',
  transportation: '交通',
  entertainment: '娛樂',
  shopping: '購物',
  daily: '日常用品',
  other: '其他',
}
const pieData = computed(() => {
  const categoryMap = filteredExpenseList.value.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount
      return acc
    },
    {} as Record<string, number>,
  )
  return Object.entries(categoryMap).map(([name, value]) => {
    return { name: categoryNameMap[name], value }
  })
})

const pieOption = computed(() => ({
  title: {
    text: `${selectedMonth.value} 支出分析`,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '60%',
      data: pieData.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}))

onMounted(() => {
  fetchExpenses()
})
</script>

<template>
  <!-- Header 新增按鈕、月份篩選 -->
  <header class="flex justify-between mb-4">
    <el-button type="primary">新增支出</el-button>
    <h3 class="text-xl font-semibold">支出分析</h3>
    <el-date-picker
      v-model="selectedMonth"
      type="month"
      format="YYYY-MM"
      value-format="YYYY-MM"
      :clearable="false"
    />
  </header>

  <!-- 圓餅圖 -->
  <el-card class="mb-4">
    <v-chart :option="pieOption" autoresize style="height: 280px"></v-chart>
  </el-card>

  <!-- Table 支出列表 -->
  <el-card>
    <el-table :data="filteredExpenseList">
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="name" label="花費項目" />
      <el-table-column prop="category" label="分類" />
      <el-table-column prop="amount" label="金額" />
    </el-table>
  </el-card>
</template>

<style scoped lang="scss"></style>
