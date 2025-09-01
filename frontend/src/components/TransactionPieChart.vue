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

const titleMap: Record<string, string> = {
  expense: '支出',
  income: '收入',
}

const categorySumsRef = toRef(props, 'categorySums')

const { pieOption } = usePieChart(props.categories, categorySumsRef, props.title)
</script>

<template>
  <div class="overflow-x-auto">
    <el-card class="mb-4 min-w-[360px]">
      <header
        class="flex justify-between items-center border-b border-gray-400 pb-2 text-xl font-bold"
      >
        <h3>{{ month }} {{ titleMap[title] }}</h3>
        <h3>
          <span>總{{ titleMap[title] }}： </span>
          <span :class="[title === 'expense' ? 'text-red-600' : 'text-green-600']">
            {{ totalAmount.toLocaleString() }}
          </span>
        </h3>
      </header>
      <v-chart :option="pieOption" autoresize style="height: 250px" />
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
