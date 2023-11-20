import { defineStore } from 'pinia'
import { ref } from 'vue'
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
    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true
  }
)
