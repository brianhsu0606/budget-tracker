<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  ElMessage.success('登出成功')
  router.push('/login')
}
</script>

<template>
  <header class="flex justify-between items-center h-full px-4">
    <h3 class="text-2xl font-bold">記帳小幫手</h3>
    <el-button @click="handleLogout" type="primary">登出</el-button>
  </header>
</template>

<style scoped lang="scss"></style>
