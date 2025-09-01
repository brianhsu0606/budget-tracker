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
    <header
      class="flex justify-between items-center border-b border-gray-400 pb-2 text-xl font-bold"
    >
      <h3>{{ month }} {{ title }}</h3>
      <h3>
        <span>總{{ title }}： </span>
        <span :class="[title === '支出' ? 'text-red-600' : 'text-green-600']">
          {{ totalAmount.toLocaleString() }}
        </span>
      </h3>
    </header>
    <v-chart :option="pieOption" autoresize style="height: 250px" />
  </el-card>
</template>

<style scoped lang="scss"></style>
