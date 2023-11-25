import request from '@/utils/request'
// 注册
export const userRegiterServer = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}
// 登录
export const userLogonServer = ({ username, password }) => {
  //参数需要对象包装
  return request.post('/api/login', { username, password })
}

//获取用户数据接口
export const useGetinfoServer = () => request.get('/my/userinfo')
