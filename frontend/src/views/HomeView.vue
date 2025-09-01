<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSixMonthSummary } from '@/composables/useSixMonthSummary'
import { useReadOnly } from '@/composables/useReadOnly'
import expenseApi from '@/apis/expense'
import incomeApi from '@/apis/income'

const {
  list: expenseList,
  isLoading: isExpenseLoading,
  fetchList: fetchExpenseList,
} = useReadOnly(expenseApi.getExpenseList)
const {
  list: incomeList,
  isLoading: isIncomeLoading,
  fetchList: fetchIncomeList,
} = useReadOnly(incomeApi.getIncomeList)

const { lastSixMonths, incomeByMonth, expenseByMonth, monthSummary } = useSixMonthSummary(
  incomeList,
  expenseList,
)

const chartOptions = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {},
  xAxis: {
    type: 'category',
    data: lastSixMonths.value,
    axisLabel: { fontSize: 16, fontWeight: 'bold' },
  },
  yAxis: { type: 'value', axisLabel: { fontSize: 16, fontWeight: 'bold' } },
  series: [
    {
      name: '收入',
      type: 'line',
      data: incomeByMonth.value,
      itemStyle: { color: '#4CAF50' },
    },
    {
      name: '支出',
      type: 'line',
      data: expenseByMonth.value,
      itemStyle: { color: '#F44336' },
    },
  ],
}))

onMounted(() => {
  fetchIncomeList()
  fetchExpenseList()
})
</script>

<template>
  <el-card
    v-loading="isExpenseLoading && isIncomeLoading"
    element-loading-text="載入中，請稍後..."
    class="mb-4"
  >
    <!-- 表格 -->
    <h3 class="text-xl font-bold mb-4 text-center">近 6 個月收支紀錄</h3>
    <el-table
      :data="monthSummary.slice().reverse()"
      style="width: 100%"
      class="sm:text-lg font-bold"
      stripe
      border
    >
      <el-table-column prop="month" label="月份" />
      <el-table-column prop="income" align="right" header-align="left">
        <template #header>
          <span class="text-green-600 font-bold">收入</span>
        </template>
        <template #default="{ row }">
          {{ row.income.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="expense" align="right" header-align="left">
        <template #header>
          <span class="text-red-600 font-bold">支出</span>
        </template>
        <template #default="{ row }">
          {{ row.expense.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="結餘" align="right" header-align="left">
        <template #default="{ row }">
          <span :class="[row.balance > 0 ? 'text-green-600' : 'text-red-600']">
            {{ row.balance.toLocaleString() }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 折線圖 -->
  <div class="overflow-x-auto">
    <el-card class="relative min-w-[600px]">
      <h3 class="text-xl font-bold absolute left-1/2 -translate-x-1/2">近 6 個月收支分析</h3>
      <v-chart :option="chartOptions" autoresize style="height: 300px" />
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
