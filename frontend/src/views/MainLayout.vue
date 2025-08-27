<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import CommonAside from '@/components/CommonAside.vue'
</script>

<template>
  <el-container class="h-full">
    <el-header class="bg-blue-300 border-b border-gray-300">
      <CommonHeader />
    </el-header>

    <el-container>
      <el-aside class="bg-blue-200" width="250px">
        <CommonAside />
      </el-aside>
      <el-main class="bg-blue-50">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss"></style>
