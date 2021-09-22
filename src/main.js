import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import './plugins/axios'
//按需引入Element
import element from './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

import axios from "axios"
// 设置接口基准地址
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// 通过 axios 请求拦截器添加 token，保证拥有获取数据的权限。
axios.interceptors.request.use(config => {
  // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

// 阻止显示生产模式的消息
Vue.config.productionTip = false
//引用并注册全局组件Icon,svg矢量图标，谁用谁引入
import Icon from "@/components/Icon.vue";
Vue.component("Icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
