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

// const categorySum = (category: string) => {
//   const categoryCost = computed(() => {
//     return filteredExpenseList.value
//       .filter((item) => item.category === category)
//       .reduce((sum, item) => item.amount + sum, 0)
//   })
//   return categoryCost.value
// }

// const totalCost = computed(() => {
//   return filteredExpenseList.value.reduce((sum, item) => item.amount + sum, 0)
// })

// const category: string[] = ['food', 'transportation', 'entertainment', 'shopping', 'daily', 'other']
// const categoryMap = computed(() => [
//   {
//     title: '飲食',
//     amount: categorySum('food'),
//     icon: 'KnifeFork',
//     color: 'bg-blue-400',
//     percentage: categorySum('food') / totalCost.value,
//   },
//   { title: '交通', amount: categorySum('transportation'), icon: 'Van', color: 'bg-gray-400' },
//   {
//     title: '娛樂',
//     amount: categorySum('entertainment'),
//     icon: 'SwitchFilled',
//     color: 'bg-red-400',
//   },
//   { title: '購物', amount: categorySum('shopping'), icon: 'Handbag', color: 'bg-gray-400' },
//   { title: '日常用品', amount: categorySum('daily'), icon: 'Van', color: 'bg-gray-400' },
//   { title: '其他', amount: categorySum('other'), icon: 'Document', color: 'bg-gray-400' },
// ])

// GPT
// 分類清單
const categories = [
  { key: 'food', title: '飲食', icon: 'KnifeFork', color: 'bg-blue-400' },
  { key: 'transportation', title: '交通', icon: 'Van', color: 'bg-green-400' },
  { key: 'entertainment', title: '娛樂', icon: 'SwitchFilled', color: 'bg-red-400' },
  { key: 'shopping', title: '購物', icon: 'Handbag', color: 'bg-yellow-400' },
  { key: 'daily', title: '日常用品', icon: 'Document', color: 'bg-orange-400' },
  { key: 'other', title: '其他', icon: 'Menu', color: 'bg-indigo-400' },
]

// 計算每個分類的總金額
const categorySums = computed(() => {
  return filteredExpenseList.value.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount
      return acc
    },
    {} as Record<string, number>,
  )
})

// 計算總金額
const totalCost = computed(() => {
  return filteredExpenseList.value.reduce((sum, item) => sum + item.amount, 0)
})

// 最後產出 categoryMap（包含百分比）
const categoryMap = computed(() => {
  return categories
    .map((c) => {
      const amount = categorySums.value[c.key] || 0
      const percentage = totalCost.value
        ? (amount / totalCost.value) * 100 // 先乘以 100
        : 0
      return {
        ...c,
        amount,
        percentage: percentage.toFixed(1),
      }
    })
    .sort((a, b) => b.amount - a.amount) // 按金額降序排列
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
  <el-row :gutter="20">
    <!-- 左邊 -->
    <el-col :span="12">
      <el-card class="mb-4">
        <header class="relative flex items-center justify-end text-lg font-bold">
          <h3 class="absolute left-1/2 -translate-x-1/2">{{ selectedMonth }} 支出</h3>
          <h3>總花費：{{ totalCost.toLocaleString() }}</h3>
        </header>
        <v-chart :option="pieOption" autoresize style="height: 280px"></v-chart>
      </el-card>
    </el-col>

    <!-- 右邊 -->
    <el-col :span="12">
      <el-card>
        <div v-for="data in categoryMap" :key="data.title" class="flex items-center mb-2">
          <div class="w-[10%]">
            <component :is="data.icon" class="p-1 w-10 rounded-lg" :class="data.color"></component>
          </div>
          <h3 class="w-[30%]">{{ data.title }}</h3>
          <p class="w-[30%]">NT$ {{ data.amount.toLocaleString() }}</p>
          <p class="w-[30%]">{{ data.percentage }} %</p>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <!-- Table 支出列表 -->
  <el-card>
    <el-table :data="filteredExpenseList">
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="name" label="花費項目" />
      <el-table-column prop="category" label="分類">
        <template #default="{ row }">
          {{ categoryNameMap[row.category] }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金額" />
    </el-table>
  </el-card>
</template>

<style scoped lang="scss"></style>
