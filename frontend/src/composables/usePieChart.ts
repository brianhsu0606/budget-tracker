import { computed, type Ref } from 'vue'
import type { Category } from '@/types/type'

export function usePieChart(categories: Category[], categorySums: Ref<Record<string, number>>) {
  const pieData = computed(() => {
    return categories.map((c) => ({
      name: c.title,
      value: categorySums.value[c.key],
    }))
  })

  const pieOption = computed(() => ({
    title: {
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    // },
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
          show: true,
          formatter: (params: { name: string; value: number; percent: number }) =>
            params.value === 0 ? '' : `${params.name}: ${params.percent.toFixed(1)}%`,
          fontSize: 14,
          fontWeight: 500,
        },
        labelLine: {
          show: true, // 連線到圖外
        },
      },
    ],
    color: [
      '#60a5fa', // bg-blue-400
      '#4ade80', // bg-green-400
      '#f87171', // bg-red-400
      '#facc15', // bg-yellow-400
      '#fb923c', // bg-orange-400
      '#818cf8', // bg-indigo-400
    ],
  }))
  return { pieOption }
}
