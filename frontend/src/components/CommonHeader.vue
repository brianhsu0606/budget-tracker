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
  <header class="flex justify-between items-center h-full">
    <h3 class="font-bold text-2xl">記帳小幫手</h3>
    <el-button @click="handleLogout">登出</el-button>
  </header>
</template>

<style scoped lang="scss"></style>
