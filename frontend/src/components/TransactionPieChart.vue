<script setup lang="ts">
import type { Category } from '@/types/type'
import { toRef } from 'vue'
import { usePieChart } from '@/composables/usePieChart'

const props = defineProps<{
  title: string
  month: string
  totalAmount: number

  categories: Category[]
  categorySums: Record<string, number>
}>()

const categorySumsRef = toRef(props, 'categorySums')

const { pieOption } = usePieChart(props.categories, categorySumsRef)
</script>

<template>
  <el-card class="mb-4">
    <header class="flex justify-between items-center text-lg font-bold">
      <h3>{{ month }} {{ title }}</h3>
      <h3>總花費：{{ totalAmount.toLocaleString() }}</h3>
    </header>
    <v-chart :option="pieOption" autoresize style="height: 250px"></v-chart>
  </el-card>
</template>

<style scoped lang="scss"></style>
