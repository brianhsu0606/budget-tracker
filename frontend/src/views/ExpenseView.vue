<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import { usePieChart } from '@/composables/usePieChart'
dayjs.locale('zh-tw')

interface Expense {
  date: string
  name: string
  category: string
  amount: number
}
interface Category {
  key: string
  title: string
  icon: string
  color: string
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

// 分類清單
const categories: Category[] = [
  { key: 'food', title: '飲食', icon: 'KnifeFork', color: 'bg-blue-400' },
  { key: 'transportation', title: '交通', icon: 'Van', color: 'bg-green-400' },
  { key: 'entertainment', title: '娛樂', icon: 'SwitchFilled', color: 'bg-red-400' },
  { key: 'shopping', title: '購物', icon: 'Handbag', color: 'bg-yellow-400' },
  { key: 'daily', title: '日常', icon: 'Document', color: 'bg-orange-400' },
  { key: 'other', title: '其他', icon: 'Menu', color: 'bg-indigo-400' },
]

// 計算各分類的總金額，物件形式 { 'food': 1000, 'daily': 200 }
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

// 將 categories 多兩個屬性 amount, percentage
const categoryMap = computed(() => {
  return categories
    .map((c) => {
      const amount = categorySums.value[c.key] || 0
      const percentage = totalCost.value ? (amount / totalCost.value) * 100 : 0
      return {
        ...c,
        amount,
        percentage: percentage.toFixed(1),
      }
    })
    .sort((a, b) => b.amount - a.amount)
})

// 圓餅圖
const { pieOption } = usePieChart(categories, categorySums)

// 分頁功能
const pageSize = ref(12)
const currentPage = ref(1)
const handlePageChange = (page: number) => {
  currentPage.value = page
}
const pagedList = computed(() => {
  const start = pageSize.value * (currentPage.value - 1)
  const end = pageSize.value + start
  return filteredExpenseList.value.slice(start, end)
})

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
      <el-card class="mb-4">
        <el-table :data="pagedList">
          <el-table-column prop="date" label="日期" min-width="120">
            <template #default="{ row }">
              {{ dayjs(row.date).format('YYYY/MM/DD（dd）') }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="花費項目" min-width="140" />
          <el-table-column prop="category" label="分類">
            <template #default="{ row }">
              <div class="flex items-center gap-2">
                <span>{{ categories.find((c) => c.key === row.category)?.title }} </span>
                <component
                  :is="categories.find((c) => c.key === row.category)?.icon"
                  :class="categories.find((c) => c.key === row.category)?.color"
                  class="w-7 p-1 rounded-lg"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金額" />
          <el-table-column label="操作" min-width="130">
            <el-button type="primary">編輯</el-button>
            <el-button type="danger">刪除</el-button>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 分頁功能 pagination -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="filteredExpenseList.length"
        @current-change="handlePageChange"
      />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>
