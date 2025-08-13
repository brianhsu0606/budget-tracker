<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

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

onMounted(() => {
  fetchExpenses()
})
</script>

<template>
  <el-card>
    <el-table :data="expenseList">
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="name" label="花費項目" />
      <el-table-column prop="category" label="分類" />
      <el-table-column prop="amount" label="金額" />
    </el-table>
  </el-card>
</template>

<style scoped lang="scss"></style>
