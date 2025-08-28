<script setup lang="ts">
import type { LoginForm } from '@/types/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { ElMessage } from 'element-plus'
import authApi from '@/apis/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref<boolean>(true)
const changeForm = () => {
  isLogin.value = !isLogin.value
}

// 登入
const formRef = ref()
const loginForm = ref<LoginForm>({
  username: '',
  password: '',
})
const rules = {
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 5, max: 20, message: '帳號必須為 5 - 20 個字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 5, max: 20, message: '密碼必須為 5 - 20 個字', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  const token = await authApi.login(loginForm.value)
  console.log(token)

  if (token) {
    router.push('/home')
  } else {
    ElMessage.error('帳號或密碼錯誤')
  }
}

const handleGuestLogin = () => {
  authStore.guestLogin()
  router.push('/home')
}
</script>

<template>
  <el-row class="h-full">
    <el-col :span="12" class="bg-blue-300"></el-col>

    <el-col :span="12" class="bg-blue-100">
      <div class="flex justify-center items-center h-full">
        <el-card class="px-4 py-2 rounded-xl w-1/2 max-w-[500px]">
          <h2 class="text-xl font-semibold text-center mb-4">記帳小幫手</h2>

          <!-- 帳號登入表單 -->
          <el-form v-if="isLogin" ref="formRef" :model="loginForm" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" prefix-icon="User" placeholder="請輸入帳號" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                prefix-icon="Lock"
                type="password"
                placeholder="請輸入密碼"
              />
            </el-form-item>
            <el-button class="w-full h-10 text-base" type="primary" @click="handleLogin">
              登入
            </el-button>

            <el-divider>或</el-divider>

            <div class="flex justify-between items-center text-base font-medium">
              <!-- 跳轉至 註冊 -->
              <span>
                沒有帳號嗎？
                <span @click="changeForm" class="text-blue-400 cursor-pointer hover:underline">
                  註冊
                </span>
              </span>
              <!-- 訪客登入 -->
              <span @click="handleGuestLogin" class="text-blue-400 cursor-pointer hover:underline">
                訪客登入
              </span>
            </div>
          </el-form>

          <!-- 帳號註冊表單 -->
          <el-form v-else ref="formRef" :model="loginForm" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" prefix-icon="User" placeholder="請輸入帳號" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                prefix-icon="Lock"
                type="password"
                placeholder="請輸入密碼"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                prefix-icon="Lock"
                type="password"
                placeholder="再次輸入密碼"
              />
            </el-form-item>
            <el-button class="w-full h-10 text-base" type="primary" @click="handleLogin">
              註冊
            </el-button>

            <el-divider>或</el-divider>

            <!-- 跳轉至 登入 -->
            <span class="text-base font-medium">
              已經有帳號了？
              <span @click="changeForm" class="text-blue-400 cursor-pointer hover:underline">
                登入
              </span>
            </span>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-input {
  @apply w-full h-10 text-base;
}
</style>
