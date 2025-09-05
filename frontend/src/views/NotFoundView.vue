<script setup lang="ts"></script>

<template>
  <div class="flex justify-center items-center h-full font-bold bg-green-50">
    <div class="flex flex-col items-center justify-center gap-10">
      <h1 class="text-8xl">404</h1>
      <p class="text-4xl">您要找的頁面不存在，請返回首頁</p>
      <el-button
        @click="$router.push({ name: 'home' })"
        type="primary"
        class="text-3xl p-6 h-14 w-34"
      >
        回首頁
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
