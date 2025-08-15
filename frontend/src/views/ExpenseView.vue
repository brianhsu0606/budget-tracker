<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
dayjs.locale('zh-tw')

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

// 各分類的總金額，物件形式 { 'food': 1000 }
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

console.log(categories)
console.log(categoryMap.value)
console.log(categorySums.value)

// 圓餅圖
// const categoryNameMap: Record<string, string> = {
//   food: '飲食',
//   transportation: '交通',
//   entertainment: '娛樂',
//   shopping: '購物',
//   daily: '日常用品',
//   other: '其他',
// }
// const pieData = computed(() => {
//   const categoryMap = filteredExpenseList.value.reduce(
//     (acc, item) => {
//       acc[item.category] = (acc[item.category] || 0) + item.amount
//       return acc
//     },
//     {} as Record<string, number>,
//   )
//   return Object.entries(categoryMap).map(([name, value]) => {
//     return { name: categoryNameMap[name], value }
//   })
// })
const pieData = computed(() => {
  return categories.map((c) => ({
    name: c.title,
    value: categorySums.value[c.key],
  }))
})

const pieOption = computed(() => ({
  title: {
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  // legend: {
  //   orient: 'vertical',
  //   left: 'left',
  // },
  series: [
    {
      name: '分類',
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
      label: {
        show: true,
        formatter: (params) =>
          params.value === 0 ? '' : `${params.name}: ${params.percent.toFixed(1)}%`,
        fontSize: 14,
        fontWeight: 500,
      },
      labelLine: {
        show: true, // 連線到圖外
      },
    },
  ],
  color: [
    '#60a5fa', // bg-blue-400
    '#4ade80', // bg-green-400
    '#f87171', // bg-red-400
    '#facc15', // bg-yellow-400
    '#fb923c', // bg-orange-400
    '#818cf8', // bg-indigo-400
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
    <!-- 左邊 圓餅圖、各分類金額 -->
    <el-col :span="10">
      <!-- 圓餅圖 -->
      <el-card class="mb-4">
        <header class="flex justify-between items-center text-lg font-bold">
          <h3>{{ selectedMonth }} 支出</h3>
          <h3>總花費：{{ totalCost.toLocaleString() }}</h3>
        </header>
        <v-chart :option="pieOption" autoresize style="height: 250px"></v-chart>
      </el-card>

      <!-- 各分類金額 -->
      <el-card>
        <header class="flex items-center text-lg font-bold p-2">
          <h3 class="w-[40%]">分類</h3>
          <p class="w-[30%]">金額</p>
          <p class="w-[30%]">比例</p>
        </header>
        <div
          v-for="data in categoryMap"
          :key="data.title"
          class="flex items-center border-t p-2 text-lg font-medium hover:bg-gray-200 transition"
        >
          <div class="flex items-center gap-4 w-[40%]">
            <component :is="data.icon" class="p-1 w-10 rounded-lg" :class="data.color"></component>
            <h3>{{ data.title }}</h3>
          </div>
          <p class="w-[30%]">{{ data.amount.toLocaleString() }}</p>
          <p class="w-[30%]">{{ data.percentage }} %</p>
        </div>
      </el-card>
    </el-col>

    <!-- 右邊 表格 -->
    <el-col :span="14">
      <el-card>
        <el-table :data="filteredExpenseList">
          <el-table-column prop="date" label="日期" min-width="120">
            <template #default="{ row }">
              {{ dayjs(row.date).format('YYYY/MM/DD（dd）') }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="花費項目" min-width="140" />
          <el-table-column prop="category" label="分類">
            <template #default="{ row }">
              {{ categories.find((c) => c.key === row.category)?.title }}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金額" />
          <el-table-column label="操作" min-width="130">
            <el-button type="primary">編輯</el-button>
            <el-button type="danger">刪除</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>
