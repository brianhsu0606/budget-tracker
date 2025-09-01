<script setup lang="ts">
interface CategoryMap {
  key: string
  title: string
  icon: string
  color: string
  amount: number
  percentage: string
}

defineProps<{
  data: CategoryMap[]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <el-card class="min-w-[360px]">
      <el-table :data="data" border class="text-base sm:text-lg font-bold">
        <el-table-column prop="title" label="分類" min-width="120">
          <template #default="{ row }">
            <div class="flex items-center gap-4">
              <component :is="row.icon" class="p-1 w-10 rounded-lg" :class="row.color" />
              <h3>{{ row.title }}</h3>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金額" align="right" header-align="left">
          <template #default="{ row }">{{ row.amount.toLocaleString() }} </template>
        </el-table-column>
        <el-table-column
          prop="percentage"
          label="比例"
          align="right"
          header-align="left"
          min-width="90"
        >
          <template #default="{ row }"> {{ row.percentage.toLocaleString() }} % </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
