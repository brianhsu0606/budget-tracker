<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <h3>{{ userStore.avatar }}</h3>
  <h3>{{ userStore.displayName }}</h3>
</template>

<style scoped lang="scss"></style>
