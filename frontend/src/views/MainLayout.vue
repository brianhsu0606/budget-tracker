<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import CommonAside from '@/components/CommonAside.vue'
</script>

<template>
  <el-container class="h-full">
    <el-header class="bg-green-300">
      <CommonHeader />
    </el-header>

    <el-container>
      <el-aside class="bg-green-200">
        <CommonAside />
      </el-aside>
      <el-main class="bg-green-50">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss"></style>
