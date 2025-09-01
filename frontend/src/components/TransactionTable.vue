<script setup lang="ts">
import type { Transaction, Category } from '@/types/type'
import { toRef } from 'vue'
import { usePagination } from '@/composables/usePagination'
import dayjs from 'dayjs'

const props = defineProps<{
  list: Transaction[]
  categories: Category[]
  month: string
  category: string | null
}>()

const listRef = toRef(props, 'list')

const emit = defineEmits<{
  (e: 'row-click', row: Transaction): void
  (e: 'category-change', key: string | null): void
}>()

const { pageSize, currentPage, pagedList, handlePageChange } = usePagination(listRef)
</script>

<template>
  <div class="overflow-x-auto shadow-lg border-x rounded-md sm:border-none sm:rounded-none">
    <el-card class="min-w-[600px]">
      <!-- 分類按鈕 -->
      <header class="flex mb-4">
        <el-button
          v-for="button in [{ key: null, title: '全部' }, ...props.categories]"
          @click="emit('category-change', button.key)"
          type="primary"
          :key="button.key"
          class="flex-1"
          :class="{ '!bg-green-900': category === button.key }"
        >
          {{ button.title }}
        </el-button>
      </header>

      <!-- 表格 table -->
      <el-table
        :data="pagedList"
        @row-click="emit('row-click', $event)"
        class="2xl:text-lg font-medium cursor-pointer mb-4"
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

      <!-- 分頁 pagination -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="list.length"
        @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
