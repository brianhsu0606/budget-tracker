<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElDialog } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import profileApi from '@/apis/profile'

const userStore = useUserStore()

// 表單資料
const profileForm = ref({
  displayName: userStore.displayName,
  avatar: userStore.avatar || 'avatar1.jpg',
})

// 表單規則
const rules = {
  displayName: [
    { required: true, message: '請輸入顯示名稱', trigger: 'blur' },
    { min: 2, max: 20, message: '顯示名稱必須 2~20 個字', trigger: 'blur' },
  ],
}

// 預設頭貼列表
const avatars = ['avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg', 'avatar4.jpg', 'avatar5.jpg']

// 控制彈窗顯示
const avatarDialogVisible = ref(false)

// 選擇頭貼
const selectAvatar = (name: string) => {
  profileForm.value.avatar = name
  avatarDialogVisible.value = false
}

// 提交表單
const handleSubmit = async () => {
  try {
    const updatedProfile = await profileApi.updateProfile(profileForm.value)
    userStore.setUser(updatedProfile)
    ElMessage.success('個人資料更新成功！')
  } catch (error) {
    console.log('更新失敗', error)
  }
}
</script>

<template>
  <el-card class="w-1/2 mx-auto mt-10 p-6 rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">個人設定</h2>

    <el-form :model="profileForm" :rules="rules" label-width="100px">
      <!-- 頭貼 -->
      <el-form-item label="頭貼">
        <img
          :src="`/src/assets/images/avatars/${profileForm.avatar}`"
          alt="頭貼"
          class="w-40 h-40 rounded-xl cursor-pointer border border-gray-500 hover:shadow-lg transition"
          @click="avatarDialogVisible = true"
        />

        <el-dialog
          title="選擇頭貼"
          v-model="avatarDialogVisible"
          width="700px"
          :destroy-on-close="true"
        >
          <div class="flex justify-between gap-4">
            <img
              v-for="avatar in avatars"
              :key="avatar"
              :src="`/src/assets/images/avatars/${avatar}`"
              alt="頭貼選項"
              class="w-28 h-28 rounded-xl cursor-pointer border border-gray-500 hover:shadow-lg transition"
              @click="selectAvatar(avatar)"
            />
          </div>
        </el-dialog>
      </el-form-item>

      <!-- 顯示名稱 -->
      <el-form-item label="名稱" prop="displayName">
        <el-input v-model="profileForm.displayName" placeholder="請輸入顯示名稱" />
      </el-form-item>

      <!-- 提交按鈕 -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
img {
  object-fit: cover;
}
</style>
