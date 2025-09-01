<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import CommonAside from '@/components/CommonAside.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isAsideVisible = ref<boolean>(true)

const checkScreen = () => {
  isAsideVisible.value = window.innerWidth >= 1024
}
const handleAsideClick = (route: string) => {
  router.push(route)
  if (window.innerWidth < 1024) {
    isAsideVisible.value = false
  }
}
onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>

<template>
  <el-container class="h-full">
    <el-header class="bg-[#8FD8A6] border-b border-gray-300">
      <CommonHeader>
        <el-button
          type="primary"
          class="sm:hidden"
          @click="isAsideVisible = !isAsideVisible"
          icon="Expand"
        />
      </CommonHeader>
    </el-header>

    <el-container>
      <el-aside v-if="isAsideVisible" class="bg-[#57C273] w-40 sm:w-64">
        <CommonAside @item-click="handleAsideClick" />
      </el-aside>
      <el-main class="bg-gray-50">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss"></style>
