<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import CommonAside from '@/components/CommonAside.vue'
</script>

<template>
  <el-container class="h-full">
    <el-aside class="bg-[#57C273]" width="250px">
      <CommonAside />
    </el-aside>

    <el-container>
      <el-header class="bg-[#8FD8A6] border-b border-gray-300">
        <CommonHeader />
      </el-header>
      <el-main class="bg-gray-50">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss"></style>
