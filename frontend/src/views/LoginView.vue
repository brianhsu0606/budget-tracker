<script setup lang="ts">
import type { Form } from '@/types/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import authApi from '@/apis/auth'
import profileApi from '@/apis/profile'
import { getErrorMessage } from '@/utils/error'

const router = useRouter()
const userStore = useUserStore()

const isLoading = ref<boolean>(false)
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
  isLoading.value = true
  try {
    await authApi.register(registerForm.value)
    ElMessage.success('註冊成功！')
    isLogin.value = true
  } catch (error) {
    ElMessage.error(getErrorMessage(error, '註冊失敗'))
  } finally {
    isLoading.value = false
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
  isLoading.value = true
  try {
    await loginFormRef.value.validate()
    const token = await authApi.login(loginForm.value)

    if (token) {
      userStore.setToken(token)

      const profile = await profileApi.getProfile()
      userStore.setUser(profile)

      ElMessage.success('登入成功！')
      router.push('/home')
    }
  } catch (error) {
    ElMessage.error(getErrorMessage(error, '登入失敗'))
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <el-row class="h-full">
    <el-col
      :xs="0"
      :sm="0"
      :md="12"
      class="bg-gradient-to-br from-green-300 to-green-600 flex justify-center items-center"
    >
      <img src="/images/login.png" alt="登入圖片" class="max-w-[80%]" />
    </el-col>

    <el-col :xs="24" :sm="24" :md="12" class="bg-green-100">
      <div class="flex justify-center items-center h-full">
        <el-card class="px-4 py-2 rounded-xl min-w-[460px]">
          <h2 class="text-2xl font-semibold text-center mb-4">記帳小幫手</h2>

          <!-- 登入表單 -->
          <transition name="fade-slide" mode="out-in">
            <el-form
              v-if="isLogin"
              ref="loginFormRef"
              :model="loginForm"
              :rules="loginRules"
              @keyup.enter="handleLogin"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.username"
                  prefix-icon="User"
                  placeholder="請輸入帳號"
                />
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
              <el-button
                @click="handleLogin"
                type="primary"
                class="w-full h-10 text-base"
                :loading="isLoading"
              >
                登入
              </el-button>

              <el-divider>或</el-divider>

              <span class="text-base font-medium">
                沒有帳號嗎？
                <span
                  @click="isLogin = !isLogin"
                  class="text-green-600 cursor-pointer hover:underline"
                >
                  註冊
                </span>
              </span>
            </el-form>

            <!-- 註冊表單 -->
            <el-form
              v-else
              ref="registerFormRef"
              :model="registerForm"
              :rules="registerRules"
              @keyup.enter="handleRegister"
            >
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
              <el-button
                @click="handleRegister"
                type="primary"
                class="w-full h-10 text-base"
                :loading="isLoading"
              >
                註冊
              </el-button>

              <el-divider>或</el-divider>

              <span class="text-base font-medium">
                已經有帳號了？
                <span
                  @click="isLogin = !isLogin"
                  class="text-green-600 cursor-pointer hover:underline"
                >
                  登入
                </span>
              </span>
            </el-form>
          </transition>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.el-input {
  @apply w-full h-10 text-base;
}

.fade-slide-enter-from {
  transform: translateX(50%);
  opacity: 0;
}
.fade-slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.fade-slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.fade-slide-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
</style>
