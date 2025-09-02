<script setup lang="ts"></script>

<template>
  <div class="text-center mt-20">
    <h1 class="text-4xl font-bold mb-6">404</h1>
    <p class="text-2xl font-bold mb-6">頁面不存在</p>
    <el-button type="primary" @click="$router.push({ name: 'home' })" class="text-xl p-6">
      回首頁
    </el-button>
  </div>
</template>

<style scoped lang="scss"></style>
