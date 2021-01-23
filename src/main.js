import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import 'ant-design-vue/dist/antd.css';
import 'xe-utils'
import VXeTable from 'vxe-table'


import {
    Input,
    Button,
    Menu,
    Icon,
    Breadcrumb,
    Table,
    Tag,
    Form,
    Checkbox,
} from 'ant-design-vue';

// Vue.component和Vue.use这里作用都是注册组件
// Vue.component(Input.name, Input);
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Form)
Vue.use(Checkbox)


Vue.use(VXeTable)
Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
