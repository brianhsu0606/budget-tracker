<script setup lang="ts">
import type { Profile } from '@/types/type'
import { ref, computed } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import profileApi from '@/apis/profile'

const userStore = useUserStore()

const profileForm = ref<Profile>({
  displayName: userStore.displayName,
  avatar: userStore.avatar || 'avatar1.jpg',
})

// 表單驗證
const formRef = ref<FormInstance>()
const rules = {
  displayName: [
    { required: true, message: '請輸入顯示名稱', trigger: 'blur' },
    { min: 2, max: 20, message: '顯示名稱必須 2~20 個字', trigger: 'blur' },
  ],
}

const avatars = ['avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg', 'avatar4.jpg', 'avatar5.jpg']
const avatarSrc = computed(() => {
  const avatar = profileForm.value.avatar || 'avatar1.jpg'
  return `/images/avatars/${avatar}`
})

// 選擇頭貼
const avatarDialogVisible = ref<boolean>(false)
const selectAvatar = (name: string) => {
  profileForm.value.avatar = name
  avatarDialogVisible.value = false
}

const isLoading = ref<boolean>(false)
const handleUpdate = async () => {
  isLoading.value = true
  try {
    await formRef.value?.validate()
    const updatedProfile = await profileApi.updateProfile(profileForm.value)
    userStore.setUser(updatedProfile)
    ElMessage.success('個人資料更新成功！')
  } catch (error) {
    console.log('更新失敗', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="overflow-x-auto">
    <el-card
      class="min-w-[360px] sm:w-[500px] 2xl:w-[550px] mx-auto mt-10 p-4"
      v-loading="isLoading"
      element-loading-text="載入中，請稍後..."
    >
      <h2 class="text-2xl font-bold mb-2">個人資訊</h2>
      <!-- 頭貼 -->
      <img
        :src="avatarSrc"
        alt="頭貼"
        class="w-40 h-40 rounded-xl cursor-pointer border-2 border-gray-300 hover:shadow-md hover:border-green-500 transition block mx-auto mb-6"
        @click="avatarDialogVisible = true"
      />

      <el-dialog title="選擇頭貼" v-model="avatarDialogVisible" class="sm:w-[700px]" width="80%">
        <div class="flex flex-wrap justify-between gap-4">
          <img
            v-for="avatar in avatars"
            :key="avatar"
            :src="`/images/avatars/${avatar}`"
            alt="頭貼選項"
            class="w-20 h-20 sm:w-28 sm:h-28 rounded-xl cursor-pointer border-2 border-gray-300 hover:shadow-md hover:border-green-500 transition"
            @click="selectAvatar(avatar)"
          />
        </div>
      </el-dialog>

      <el-form ref="formRef" :model="profileForm" :rules="rules" label-width="60px">
        <el-form-item label="名稱" prop="displayName">
          <el-input v-model="profileForm.displayName" placeholder="請輸入顯示名稱" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdate" class="w-full">更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
