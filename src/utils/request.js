// 接口文档:   https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850835
import axios from 'axios'
import { ElMessage } from 'element-plus' //导入elme组件库错误提示组件
import router from '@/router'
import { useUserStore } from '@/stores'
const baseURL = 'http://big-event-vue-api-t.itheima.net' //基地址
const instance = axios.create({
  baseURL, //基地址 todo1 配置
  timeout: 10000
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //todo2 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // todo3 响应下的成功状态0
    if (response.data.code === 0) {
      return response
    }
    // todo4 处理业务失败
    ElMessage.error(response.data.message || '服务器繁忙')
    return Promise.reject(response.data)
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //todo5 如果错误401 权限不足，token过期
    if (error.response?.status === '401') {
      router.push('/login')
    }
    //todo 错误的默认情况，给提示
    ElMessage.error(error.response.data.message || '服务器繁忙')
    return Promise.reject(error)
  }
)
export default instance
export { baseURL }
