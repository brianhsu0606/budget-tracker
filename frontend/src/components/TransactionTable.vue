<script setup lang="ts">
import type { Transaction, Category } from '@/types/type'
import dayjs from 'dayjs'

defineProps<{
  data: Transaction[]
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'row-click', row: Transaction): void
}>()
</script>

<template>
  <el-table
    :data="data"
    @row-click="emit('row-click', $event)"
    class="2xl:text-lg font-medium cursor-pointer"
    border
  >
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
    <el-table-column prop="amount" label="金額" align="right" header-align="left">
      <template #default="{ row }">
        {{ row.amount.toLocaleString() }}
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
