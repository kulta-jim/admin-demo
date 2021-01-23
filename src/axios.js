import Vue from "vue";
import axios from "axios";
import router from "./router";
import { message as Message } from "ant-design-vue";
import store from "./store/index";
import { toStringJSON } from "xe-utils";

// 实际开发中需要根据不同的环境选择不同的api_baseUrl
// const api_url = process.env.VUE_APP_API_URL;
const api_url = "http://localhost:8000/api/v1";

let config = {
  baseURL: api_url,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  validateStatus: function(status) {
    return status >= 200 && status < 500; // default
  },
};

const _axios = axios.create(config);

// 添加请求拦截器
_axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // console.log(config.headers)
    // 如果登录存了token的话，在这里把token放入请求头
    let _token = store.getters.getToken;
    console.log(config.headers.Authorization);
    if (_token) {
      config.headers.Authorization = "Bearer " + _token;
    }
    console.log(config.headers.Authorization);
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    Message.error(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
_axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.status === 200) {
      const data = toStringJSON(response.data);
      console.log(data);
      if (data.code === 200) {
        Message.info("成功");
        if (data.access) {
          console.log(store);
          store.mutations.setToken(data.data.access);
          console.log(store);
        }
        return data.data;
      }
      if (data.code === 401) {
        store.headers.Authorization = "";
        router.push({
          path: "/login",
        });
      }

      return Promise.reject(data.message);
    }

    return Promise.reject(response.status);
    // return Promise.reject(new Error(response.msg));
    // if (response.status === 200) {
    //   const data = JSON.stringify(response.data);
    //   if (data.code === 200) {
    //     return data.data;
    //   }
    //   if (data.code === 401) {
    //       UserInfoTool.clear();
    //       router.push({
    //         path: "/login",
    //       });
    //     }

    //   }
    // } else {
    //   return Promise.reject(new Error(response.msg));
    // }
    // if (response.status === 200) {
    //     if (data.code === 200){
    //         return data.datas
    //     }
    //     elif (response.status === 401) {
    //         Message.error('登录失效，请重新登录');
    //         // 清除账号token信息，返回登录页面
    //         UserInfoTool.clear();
    //         router.push({
    //             path: '/login'
    //         })
    //     }
    //     // 如果响应头中携带authorization等信息，重置token
    // } else {
    //     // Message.error(data.messaasge);
    //     return Promise.reject(new Error(response.msg));
    // }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

Vue.prototype.$domain = api_url;
Vue.prototype.$axios = _axios;
Vue.prototype.$baseUrl = config.baseURL;
export default _axios;
export const domain = api_url;
