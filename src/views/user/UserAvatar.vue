<script setup>
import { ref, onMounted } from 'vue'
import ChangeSelect from '@/views/article/components/ChangeSelect.vue'
const box = ref()
const sel = ref()

console.log(box.value)
onMounted(() => {
  console.log(box.value)
  console.log(sel.value)
})
const hander = () => {
  console.log(box.value)
}
</script>
<template>
  user更换头像
  <div ref="box" @click="hander">box1盒子</div>
  <ChangeSelect ref="sel"></ChangeSelect>
</template>
