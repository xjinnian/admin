<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChangeSelect from './components/ChangeSelect.vue'
import { artGetListService } from '@/api/article.js'
import ArticleEdit from './components/ArticleEdit.vue'
import { formatTime } from '@/utils/format.js'
// 定义请求参数
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false) //添加loading
const articleList = ref([]) //数据
// const articleList = ref([
// 假数据
//   {
//     id: 5961,
//     title: '新的文章啊',
//     pub_date: '2022-07-10 14:53:52.604',
//     state: '已发布',
//     cate_name: '体育'
//   },
//   {
//     id: 5962,
//     title: '新的文章啊',
//     pub_date: '2022-07-10 14:54:30.904',
//     state: null,
//     cate_name: '新闻'
//   },
//   {
//     id: 5963,
//     title: '新的文章啊',
//     pub_date: '2022-07-11 14:53:52.604',
//     state: '已发布',
//     cate_name: '消息'
//   }
// ])
const total = ref(0) //总条数
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value) //注意这里传递的数据要.value
  console.log(res)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
// 分类页
const onSizeChange = (size) => {
  //每页条数，将当前页重置1，修改每页条数的值为点击的值
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  //当前页
  params.value.pagenum = page
  getArticleList()
}
// 搜索
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
const articleEditRef = ref()

// 添加文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <ContainCard title="文章管理">
    <template #extrc>
      <el-button @click="onAddArticle" type="primary" class="button"
        >发布文章</el-button
      >
    </template>
    <!-- 主体表单 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- 组件 -->
        <ChangeSelect v-model="params.cate_id"></ChangeSelect>
      </el-form-item>
      <el-form-item label="发布文章：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 主体表格 -->
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="row">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 分类页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 抽屉 -->
    <ArticleEdit ref="articleEditRef"></ArticleEdit>
  </ContainCard>
</template>
