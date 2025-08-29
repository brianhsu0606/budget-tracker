<script setup lang="ts">
import type { Form } from '@/types/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import authApi from '@/apis/auth'
import profileApi from '@/apis/profile'

const router = useRouter()
const userStore = useUserStore()

const isLogin = ref<boolean>(true)
const showPassword = ref<boolean>(false)

// 註冊
const registerFormRef = ref()
const registerForm = ref<Form>({
  username: '',
  password: '',
})
const registerRules = {
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 3, max: 20, message: '帳號必須為 3 - 20 個字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 5, max: 20, message: '密碼必須為 5 - 20 個字', trigger: 'blur' },
  ],
}

const handleRegister = async () => {
  try {
    await authApi.register(registerForm.value)
    ElMessage.success('註冊成功！')
    isLogin.value = true
  } catch (error) {
    console.log('註冊失敗', error)
  }
}

// 登入
const loginFormRef = ref()
const loginForm = ref<Form>({
  username: '',
  password: '',
})
const loginRules = {
  username: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
}

const handleLogin = async () => {
  try {
    await loginFormRef.value.validate()
    const token = await authApi.login(loginForm.value)

    if (token) {
      userStore.setUser({ username: loginForm.value.username, token })
      const profile = await profileApi.getProfile()
      console.log(profile)

      ElMessage.success('登入成功！')
      router.push('/home')
    } else {
      ElMessage.error('帳號或密碼錯誤')
    }
  } catch (error) {
    console.log('登入失敗', error)
  }
}

const handleGuestLogin = () => {
  // userStore.guestLogin()
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
          <el-form v-if="isLogin" ref="loginFormRef" :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" prefix-icon="User" placeholder="請輸入帳號" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                prefix-icon="Lock"
                placeholder="請輸入密碼"
              >
                <template #suffix>
                  <el-icon @click="showPassword = !showPassword" class="cursor-pointer">
                    <View />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-button class="w-full h-10 text-base" type="primary" @click="handleLogin">
              登入
            </el-button>

            <el-divider>或</el-divider>

            <div class="flex justify-between items-center text-base font-medium">
              <!-- 跳轉至 註冊 -->
              <span>
                沒有帳號嗎？
                <span
                  @click="isLogin = !isLogin"
                  class="text-blue-400 cursor-pointer hover:underline"
                >
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
          <el-form v-else ref="registerFormRef" :model="registerForm" :rules="registerRules">
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                prefix-icon="User"
                placeholder="請輸入帳號"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                :type="showPassword ? 'text' : 'password'"
                prefix-icon="Lock"
                placeholder="請輸入密碼"
              >
                <template #suffix>
                  <el-icon @click="showPassword = !showPassword" class="cursor-pointer">
                    <View />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-button class="w-full h-10 text-base" type="primary" @click="handleRegister">
              註冊
            </el-button>

            <el-divider>或</el-divider>

            <!-- 跳轉至 登入 -->
            <span class="text-base font-medium">
              已經有帳號了？
              <span
                @click="isLogin = !isLogin"
                class="text-blue-400 cursor-pointer hover:underline"
              >
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
