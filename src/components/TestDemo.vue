<script setup>
import { useUserStore, useCountStore } from '@/stores'
const userStore = useUserStore()
const countStore = useCountStore()
const add = () => {
  userStore.setToken('asdw')
}
const remove = () => {
  userStore.removeToken()
}
</script>

<template>
  <div>我是测试组件testdemo</div>
  token值:{{ userStore.token }}
  <button @click="add">添加</button>
  <button @click="remove">删除</button>
  <h3>我是count值 {{ countStore.count }}</h3>
</template>
