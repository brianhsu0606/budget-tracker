<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activePath = computed(() => router.currentRoute.value.path)

const pageList = [
  { path: '/home', name: 'home', label: '首頁', icon: '' },
  { path: '/expense', name: 'expense', label: '支出頁面', icon: '' },
  { path: '/income', name: 'income', label: '收入頁面', icon: '' },
]
</script>

<template>
  <el-menu :default-active="activePath" router>
    <el-menu-item v-for="page in pageList" :key="page.path" :index="page.path">
      <h3 class="text-lg font-medium">{{ page.label }}</h3>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  background-color: #e8f5e9;

  .el-menu-item {
    color: #333333;
    border-bottom: 0.5px solid gray;

    &:hover {
      background-color: #dcedc8;
    }
    &.is-active {
      background-color: #79ce7e;
    }
  }
}
</style>
