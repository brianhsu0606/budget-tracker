<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const router = useRouter()
const activePath = computed(() => router.currentRoute.value.path)

const emit = defineEmits<{
  (e: 'item-click', route: string): void
}>()

const handleClick = (route: string) => {
  emit('item-click', route)
}

const pageList = [
  { path: '/home', name: 'home', label: '首頁', icon: 'House' },
  { path: '/expense', name: 'expense', label: '支出', icon: 'DataLine' },
  { path: '/income', name: 'income', label: '收入', icon: 'Money' },
  { path: '/setting', name: 'setting', label: '設定', icon: 'Setting' },
]

const avatarSrc = computed(() => {
  const avatar = userStore.avatar || 'avatar1.jpg'
  return `/images/avatars/${avatar}`
})
</script>

<template>
  <!-- 個人資訊 -->
  <div
    class="h-[25vh] 2xl:h-[20vh] flex flex-col items-center justify-center border-b-2 border-gray-300"
  >
    <img
      :src="avatarSrc"
      alt="頭貼"
      class="w-24 h-24 rounded-xl mb-2 border-2 border-white shadow"
    />
    <h3 class="text-xl font-bold">{{ userStore.displayName }}</h3>
  </div>

  <!-- 導航欄 -->
  <el-menu :default-active="activePath" router class="bg-green-50">
    <el-menu-item
      v-for="page in pageList"
      :key="page.path"
      :index="page.path"
      class="hover:bg-[#E6F4EA] flex gap-4 items-center text-gray-700 border-b-2 border-gray-300;"
      @click="handleClick(page.path)"
    >
      <h3 class="text-lg font-medium ml-2">{{ page.label }}</h3>
      <component :is="page.icon" class="w-6 h-6"></component>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-item {
  &.is-active {
    @apply bg-[#BFE6C8] text-gray-700;
  }
}
</style>
