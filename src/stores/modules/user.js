import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useGetinfoServer } from '@/api/user.js'

export const useUserStore = defineStore(
  'my-user',
  () => {
    const token = ref('')
    const setToken = (key) => {
      token.value = key
    }
    const removeToken = () => {
      token.value = ''
    }
    // 用户个人信息
    const user = ref({})
    const getUser = async () => {
      const res = await useGetinfoServer()
      user.value = res.data.data
    }
    const setUser = (obj) => (user.value = obj)

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
