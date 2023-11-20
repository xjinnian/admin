<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
console.log(router, route)
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
