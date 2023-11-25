<script setup>
import { artGetChannelsService } from '@/api/article.js'
import { ref } from 'vue'
const channelList = ref([])
const getarticleList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getarticleList()
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
