import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 NProgress 包对应的JS和CSS--点击路由跳转时显示进度条
import NProgress from 'nprogress'
// 导入树状表格
import TreeTable from 'vue-table-with-tree-grid'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import './plugins/axios'
//按需引入Element
// import element from './plugins/element'
Vue.use(element)

import axios from "axios"
// 设置接口基准地址
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// 通过 axios 请求拦截器添加 token，保证拥有获取数据的权限。
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在 响应 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

//引用并注册全局组件Icon,svg矢量图标，谁用谁引入
import Icon from "@/components/Icon.vue";
Vue.component("Icon", Icon);

Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 阻止显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
