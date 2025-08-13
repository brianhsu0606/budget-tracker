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
const currentMonth = ref<string>(dayjs().format('YYYY-MM'))
const selectedMonth = ref<string>(currentMonth.value)
const filteredExpenseList = computed(() => {
  return expenseList.value.filter(
    (expense) => dayjs(expense.date).format('YYYY-MM') === selectedMonth.value,
  )
})

onMounted(() => {
  fetchExpenses()
})
</script>

<template>
  <header class="flex justify-end mb-4">
    <el-date-picker v-model="selectedMonth" type="month" format="YYYY-MM" value-format="YYYY-MM" />
  </header>
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
