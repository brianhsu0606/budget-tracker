<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const router = useRouter()
const activePath = computed(() => router.currentRoute.value.path)

const pageList = [
  { path: '/home', name: 'home', label: '首頁', icon: '' },
  { path: '/expense', name: 'expense', label: '支出', icon: '' },
  { path: '/income', name: 'income', label: '收入', icon: '' },
  { path: '/setting', name: 'setting', label: '設定', icon: '' },
]

const avatarSrc = computed(() => {
  return userStore.avatar
    ? `/src/assets/images/avatars/${userStore.avatar}`
    : `/src/assets/images/avatars/avatar1.jpg`
})
</script>

<template>
  <div class="h-[25vh] flex flex-col items-center justify-center p-4 rounded-lg">
    <!-- 頭貼 -->
    <img
      :src="avatarSrc"
      alt="頭貼"
      class="w-24 h-24 rounded-xl mb-2 border-2 border-white shadow"
    />
    <!-- 顯示名稱 -->
    <h3 class="text-xl font-bold">{{ userStore.displayName }}</h3>
  </div>
  <el-menu :default-active="activePath" router class="bg-blue-100">
    <el-menu-item
      v-for="page in pageList"
      :key="page.path"
      :index="page.path"
      class="hover:bg-blue-300"
    >
      <h3 class="text-lg font-medium">{{ page.label }}</h3>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-item {
  color: #333333;
  border-bottom: 0.5px solid gray;

  &.is-active {
    @apply bg-blue-400;
  }
}
</style>
