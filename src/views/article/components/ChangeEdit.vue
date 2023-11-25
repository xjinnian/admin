<script setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article.js'

const dialogVisible = ref(false)
const form = ref()

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,10}$/,
      message: '分类名必须是1-10位的英文或数字',
      trigger: 'blur'
    }
  ]
}
const open = (obj) => {
  dialogVisible.value = true
  formModel.value = { ...obj } //如果是添加则传入空对象，把formmodel值变成空，如果是编辑则回显数据
}
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await form.value.validate()
  const isEdit = formModel.value.id //判断是否有id，有则是编辑，无就是添加
  try {
    if (isEdit) {
      await artEditChannelService(formModel.value)
      ElMessage.success('编辑成功')
    } else {
      await artAddChannelService(formModel.value)
      ElMessage.success('添加成功')
    }
  } catch (error) {
    console.log(error)
  }

  emit('success')
  dialogVisible.value = false
}

defineExpose({ open })
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑' : '添加'"
    width="30%"
  >
    <!-- 内容部分 -->
    <el-form
      ref="form"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item prop="cate_name" label="分类名称">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="cate_alias" label="分类别名">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="onSubmit" type="primary"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
