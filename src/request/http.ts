import Vue from 'vue';
import axios from 'axios';
import Qs from 'qs';
import store from '@/store/index';

// 引用加载和消息提示组件
import { Loading, Message } from 'element-ui'

Vue.prototype.$http = axios;

const $axios = axios.create({
  // 设置超时请求时间
  timeout: 30000,
  // 基础url, 会在请求url自动添加前置连接
  baseURL: 'http://192.168.2.34'
})

// 用户加载过程中提示
let loading: any = null;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // loading = Loading.service({ text: '拼命加载中' })
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (loading) {
      loading.close()
    }
    const code = response.status
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (loading) {
      loading.close()
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
        case 404:
          Message.error('网络请求不存在')
          break;
        default:
          Message.error(error.response.data.message)
      }
    } else {
      if (error.message.include('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }
      return Promise.reject(error)
    }
  }
)

// get，post请求方法
export default {
  post(url: string, data: any) {
    return $axios({
      method: 'post',
      url,
      data: Qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  get(url: string, params: any) {
    return $axios({
      method: 'get',
      url,
      params
    })
  }
}

