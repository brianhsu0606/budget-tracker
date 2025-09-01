import { computed, type Ref } from 'vue'
import type { Category } from '@/types/type'

export const usePieChart = (
  categories: Category[],
  categorySums: Ref<Record<string, number>>,
  title: string,
) => {
  const colorMap: Record<string, string[]> = {
    expense: [
      '#60a5fa', // blue-400
      '#4ade80', // green-400
      '#f87171', // red-400
      '#facc15', // yellow-400
      '#fb923c', // orange-400
      '#9CA3AF', // gray-400
    ],
    income: [
      '#4ade80', // green-400
      '#f87171', // red-400
      '#9CA3AF', // gray-400
    ],
  }

  const pieData = computed(() => {
    const hasData = categories.some((c) => categorySums.value[c.key] > 0)

    if (!hasData) {
      // 無資料時顯示灰色圓餅
      return [{ name: '無資料', value: 0, itemStyle: { color: '#e5e7eb' } }] // gray-200
    }

    return categories.map((c) => ({
      name: c.title,
      value: categorySums.value[c.key],
    }))
  })

  const pieOption = computed(() => ({
    tooltip: {},
    series: [
      {
        name: '分類',
        type: 'pie',
        radius: '60%',
        data: pieData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          formatter: (params: { name: string; value: number; percent: number }) => {
            if (params.name === '無資料') return ''
            return `${params.name}: ${params.percent.toFixed(1)}%`
          },
          fontSize: 16,
          fontWeight: 500,
        },
      },
    ],
    color: colorMap[title],
  }))
  return { pieOption }
}
