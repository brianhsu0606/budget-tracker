<script setup lang="ts">
import { useUserStore } from './stores/userStore'

const userStore = useUserStore()
userStore.initUser()
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss"></style>
