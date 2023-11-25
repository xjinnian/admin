<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChangeEdit from './components/ChangeEdit.vue'
import { artGetChannelsService, artDelChannelService } from '@/api/article.js'
const channelList = ref([])
const dialog = ref()
// 分类添加
const onAddChannel = () => {
  dialog.value.open({})
}
// 编辑
const onEditChannel = (row) => {
  dialog.value.open(row)
}
// 删除
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getarticleList()
}
const getarticleList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getarticleList()
const onSuccess = () => {
  getarticleList()
}
</script>
<template>
  <ContainCard title="文章分类">
    <template #extrc>
      <el-button @click="onAddChannel" class="button" type="primary"
        >添加分类</el-button
      >
    </template>
    <!-- 主体 表格部分 -->
    <el-table :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 弹窗 -->
    <ChangeEdit @success="onSuccess" ref="dialog"></ChangeEdit>
  </ContainCard>
</template>
