<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="flex justify-between items-center h-full px-4">
    <h3 class="text-2xl font-bold">記帳小幫手</h3>
    <div class="flex gap-4">
      <h3 class="text-xl font-bold">歡迎回來！{{ userStore.username }}</h3>
      <el-button @click="handleLogout">登出</el-button>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
