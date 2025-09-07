<script setup lang="ts">
import type { Transaction, Dialog, Category } from '@/types/type'
import type { FormInstance } from 'element-plus'
import { onMounted, ref, computed, reactive } from 'vue'
import { useCrud } from '@/composables/useCrud'
import CategoryTable from '@/components/CategoryTable.vue'
import TransactionTable from '@/components/TransactionTable.vue'
import TransactionPieChart from '@/components/TransactionPieChart.vue'
import expenseApi from '@/apis/expense'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
dayjs.locale('zh-tw')

const defaultForm: Transaction = {
  id: null,
  date: dayjs().format('YYYY-MM-DD'),
  name: '',
  category: 'food',
  amount: 0,
}
const dialog = reactive<Dialog>({
  isVisible: false,
  isEdit: false,
  form: { ...defaultForm },
})

// 表單驗證
const formRef = ref<FormInstance | undefined>()
const rules = {
  date: [{ required: true, message: '請選擇日期', trigger: 'blur' }],
  name: [{ required: true, message: '請輸入名稱', trigger: 'blur' }],
  category: [{ required: true, message: '請選擇分類', trigger: 'blur' }],
  amount: [{ required: true, message: '請輸入金額', trigger: 'blur' }],
}

// CRUD
const {
  list: expenseList,
  isLoading,
  fetchList,
  handleAdd,
  handleEdit,
  handleDelete,
  handleSubmit,
} = useCrud(
  formRef,
  dialog,
  defaultForm,
  expenseApi.getExpenseList,
  expenseApi.addExpense,
  expenseApi.updateExpense,
  expenseApi.deleteExpense,
)

// 月份篩選
const currentMonth: string = dayjs().format('YYYY-MM')
const selectedMonth = ref<string>(currentMonth)
const filteredExpenseList = computed(() => {
  return expenseList.value.filter(
    (expense) => dayjs(expense.date).format('YYYY-MM') === selectedMonth.value,
  )
})

// 月份總花費
const totalCost = computed(() => {
  return filteredExpenseList.value.reduce((sum, item) => sum + item.amount, 0)
})

// 分類清單
const categories: Category[] = [
  { key: 'food', title: '飲食', icon: 'KnifeFork', color: 'bg-blue-400' },
  { key: 'transportation', title: '交通', icon: 'Van', color: 'bg-green-400' },
  { key: 'entertainment', title: '娛樂', icon: 'SwitchFilled', color: 'bg-red-400' },
  { key: 'shopping', title: '購物', icon: 'Handbag', color: 'bg-yellow-400' },
  { key: 'daily', title: '日常', icon: 'Box', color: 'bg-orange-400' },
  { key: 'other', title: '其他', icon: 'Document', color: 'bg-sky-200' },
]

// 計算各分類的總金額，物件形式 { 'food': 1000, 'daily': 200 }
const categorySums = computed(() => {
  return filteredExpenseList.value.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount
      return acc
    },
    {} as Record<string, number>,
  )
})

// 將 categories 多兩個屬性 amount, percentage
const categoryMap = computed(() => {
  return categories
    .map((c) => {
      const amount = categorySums.value[c.key] || 0
      const percentage = totalCost.value ? (amount / totalCost.value) * 100 : 0
      return {
        ...c,
        amount,
        percentage: percentage.toFixed(1),
      }
    })
    .sort((a, b) => b.amount - a.amount)
})

// 表格分類篩選
const selectedCategory = ref<string | null>(null)
const handleCategoryChange = (key: string | null) => {
  selectedCategory.value = key
}
const tableList = computed(() => {
  return expenseList.value
    .filter((expense) => dayjs(expense.date).format('YYYY-MM') === selectedMonth.value)
    .filter((expense) => !selectedCategory.value || expense.category === selectedCategory.value)
})

onMounted(() => {
  fetchList()
})
</script>

<template>
  <!-- Header 新增按鈕、月份篩選 -->
  <div class="overflow-x-auto">
    <el-card class="mb-4 min-w-[500px]">
      <header class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <el-button @click="handleAdd" type="primary" class="text-lg h-10 p-4">新增支出</el-button>
        <h3 class="text-2xl font-semibold text-center order-first sm:order-none">支出分析</h3>
        <el-date-picker
          v-model="selectedMonth"
          type="month"
          format="YYYY-MM"
          value-format="YYYY-MM"
          :clearable="false"
          class="text-lg"
          size="large"
        />
      </header>
    </el-card>
  </div>

  <!-- 內容區 -->
  <el-row :gutter="20" v-loading="isLoading" element-loading-text="載入中，請稍後...">
    <el-col :sm="24" :lg="10" class="mb-4 sm:mb-0">
      <TransactionPieChart
        title="expense"
        :month="selectedMonth"
        :totalAmount="totalCost"
        :categories="categories"
        :categorySums="categorySums"
      />
      <CategoryTable :data="categoryMap" />
    </el-col>

    <el-col :sm="24" :lg="14">
      <TransactionTable
        :list="tableList"
        :categories="categories"
        :month="selectedMonth"
        :category="selectedCategory"
        @row-click="handleEdit"
        @category-change="handleCategoryChange"
      />
    </el-col>
  </el-row>

  <!-- 對話框 dialog-->
  <el-dialog v-model="dialog.isVisible" class="w-[90%] sm:w-1/2 2xl:w-1/3">
    <h3 class="text-xl font-bold mb-4">{{ dialog.isEdit ? '編輯支出' : '新增支出' }}</h3>
    <el-form
      ref="formRef"
      :model="dialog.form"
      :rules="rules"
      v-loading="isLoading"
      element-loading-text="載入中，請稍後..."
    >
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
      <div :class="['flex', dialog.isEdit ? 'justify-between' : 'justify-end']">
        <el-button
          v-if="dialog.isEdit && dialog.form.id"
          @click="handleDelete(dialog.form.id)"
          type="danger"
        >
          刪除
        </el-button>
        <div>
          <el-button @click="handleSubmit" type="primary">
            {{ dialog.isEdit ? '編輯' : '新增' }}
          </el-button>
          <el-button @click="dialog.isVisible = false">取消</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
