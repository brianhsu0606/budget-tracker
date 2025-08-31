import { computed, type Ref } from 'vue'
import type { Category } from '@/types/type'
import type { EChartsOption, PieSeriesOption, TooltipComponentOption } from 'echarts'

export const usePieChart = (categories: Category[], categorySums: Ref<Record<string, number>>) => {
  const pieData = computed(() => {
    return categories.map((c) => ({
      name: c.title,
      value: categorySums.value[c.key],
    }))
  })

  const pieOption = computed<EChartsOption>(() => ({
    title: { left: 'center' },
    tooltip: { trigger: 'item' } as TooltipComponentOption,
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
        labelLine: { show: true },
      } as PieSeriesOption,
    ],
    color: ['#60a5fa', '#4ade80', '#f87171', '#facc15', '#fb923c', '#818cf8'],
  }))
  return { pieOption }
}
