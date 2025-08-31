<script setup lang="ts">
import type { EChartsOption } from 'echarts'

defineProps<{
  title: string
  month: string
  totalAmount: number
  option: EChartsOption
}>()
</script>

<template>
  <el-card class="mb-4">
    <header class="flex justify-between items-center text-lg font-bold">
      <h3>{{ month }} {{ title }}</h3>
      <h3>總花費：{{ totalAmount.toLocaleString() }}</h3>
    </header>
    <v-chart :option="option" autoresize style="height: 250px"></v-chart>
  </el-card>
</template>

<style scoped lang="scss"></style>
