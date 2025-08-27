<script setup lang="ts">
import type { Transaction, Dialog, Category } from '@/types/type'
import type { FormInstance } from 'element-plus'
import { onMounted, ref, computed, reactive } from 'vue'
import { usePieChart } from '@/composables/usePieChart'
import { usePagination } from '@/composables/usePagination'
import { useCrud } from '@/composables/useCrud'
import incomeApi from '@/apis/income'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
dayjs.locale('zh-tw')

const defaultForm: Transaction = {
  id: null,
  date: dayjs().format('YYYY-MM-DD'),
  name: '',
  category: 'salary',
  amount: 0,
}

const dialog = reactive<Dialog>({
  isVisible: false,
  isEdit: false,
  form: { ...defaultForm },
})

// 表單驗證
const formRef = ref<FormInstance>()
const rules = {
  date: [{ required: true, message: '請選擇日期', trigger: 'blur' }],
  name: [{ required: true, message: '請輸入名稱', trigger: 'blur' }],
  category: [{ required: true, message: '請選擇分類', trigger: 'blur' }],
  amount: [{ required: true, message: '請輸入金額', trigger: 'blur' }],
}

// CRUD
const {
  list: incomeList,
  isLoading,
  fetchList,
  handleAdd,
  handleEdit,
  handleDelete,
  submit,
} = useCrud(
  formRef,
  dialog,
  defaultForm,
  incomeApi.getIncomeList,
  incomeApi.addIncome,
  incomeApi.updateIncome,
  incomeApi.deleteIncome,
)

// 月份篩選
const currentMonth: string = dayjs().format('YYYY-MM')
const selectedMonth = ref<string>(currentMonth)
const filteredIncomeList = computed(() => {
  return incomeList.value.filter(
    (income) => dayjs(income.date).format('YYYY-MM') === selectedMonth.value,
  )
})

// 分類清單
const categories: Category[] = [
  { key: 'salary', title: '薪水', icon: 'Money', color: 'bg-green-400' },
  { key: 'stock', title: '股票', icon: 'DataLine', color: 'bg-red-400' },
  { key: 'other', title: '其他', icon: 'Document', color: 'bg-blue-400' },
]

// 計算各分類的總金額，物件形式 { 'food': 1000, 'daily': 200 }
const categorySums = computed(() => {
  return filteredIncomeList.value.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount
      return acc
    },
    {} as Record<string, number>,
  )
})

// 計算總金額
const totalIncome = computed(() => {
  return filteredIncomeList.value.reduce((sum, item) => sum + item.amount, 0)
})

// 將 categories 多兩個屬性 amount, percentage
const categoryMap = computed(() => {
  return categories
    .map((c) => {
      const amount = categorySums.value[c.key] || 0
      const percentage = totalIncome.value ? (amount / totalIncome.value) * 100 : 0
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
const { pageSize, currentPage, pagedList, handlePageChange } = usePagination(filteredIncomeList)

onMounted(() => {
  fetchList()
})
</script>

<template>
  <!-- Header 新增按鈕、月份篩選 -->
  <el-card class="mb-4">
    <header class="flex justify-between items-center">
      <el-button @click="handleAdd" type="primary" class="text-lg h-10 p-4">新增收入</el-button>
      <h3 class="text-2xl font-semibold">收入分析</h3>
      <el-date-picker
        v-model="selectedMonth"
        type="month"
        format="YYYY-MM"
        value-format="YYYY-MM"
        :clearable="false"
        class="text-lg"
      />
    </header>
  </el-card>

  <!-- 圓餅圖 -->
  <el-row :gutter="20" v-loading="isLoading" element-loading-text="載入中，請稍後...">
    <!-- 左邊 圓餅圖、各分類金額 -->
    <el-col :span="10">
      <!-- 圓餅圖 -->
      <el-card class="mb-4">
        <header class="flex justify-between items-center text-lg font-bold">
          <h3>{{ selectedMonth }} 支出</h3>
          <h3>總花費：{{ totalIncome.toLocaleString() }}</h3>
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
        <el-table :data="pagedList" border>
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
          <el-table-column label="操作" min-width="130">
            <template #default="{ row }">
              <el-button @click="handleEdit(row)" type="primary">編輯</el-button>
              <el-button @click="handleDelete(row.id)" type="danger">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 分頁功能 pagination -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="filteredIncomeList.length"
        @current-change="handlePageChange"
      />
    </el-col>
  </el-row>

  <!-- 表單 dialog-->
  <el-dialog v-model="dialog.isVisible">
    <el-form ref="formRef" :model="dialog.form" :rules="rules">
      <el-form-item prop="date" label="日期">
        <el-date-picker v-model="dialog.form.date" />
      </el-form-item>
      <el-form-item prop="name" label="名稱">
        <el-input v-model="dialog.form.name" />
      </el-form-item>
      <el-form-item prop="category" label="分類">
        <el-select v-model="dialog.form.category">
          <el-option
            v-for="category in categories"
            :key="category.key"
            :value="category.key"
            :label="category.title"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="amount" label="金額">
        <el-input-number v-model="dialog.form.amount" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submit">確認</el-button>
      <el-button @click="dialog.isVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
