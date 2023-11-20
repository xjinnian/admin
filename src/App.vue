<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
console.log(router, route)
</script>

<template>
  <div>我是APP根组件</div>

  <router-view></router-view>
  <hr />
  <button @click="router.push('/login')">点击跳转login</button>
  <el-button @click="$router.push('/list')">点击跳转list</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <TestDemo></TestDemo>
</template>

<style scoped></style>
