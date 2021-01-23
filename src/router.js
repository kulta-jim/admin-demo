import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入（路由）组件
// 基本布局Main页面
import Main from './views/main'

import Login from './views/login.vue'
import Home from './views/home'
//账号
import Account from './views/account'
// 表单
import FrontEnd from './views/forms/front-end'
import BackEnd from './views/forms/back-end'
//设置
import Setting from './views/setting'
// 图表
import ChartIcTest from './views/chart/top250'
// 表格
import Project from './views/tables/project'


// 告诉 Vue 使用 VueRouter
Vue.use(VueRouter)

// 定义路由router
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: '*',
            redirect: {
                name: "login"
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                name: '登录'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Main,
            meta: {
                name: '首页'
            },
            redirect: {
                name: 'homeIndex'
            },
            children: [
                {
                    path: 'index',
                    name: 'homeIndex',
                    meta: {
                        name: '首页',
                        auth: true,
                    },
                    component: Home
                }
            ]
        },
        {
            path: '/account',
            name: 'account',
            component: Main,
            meta: {
                name: '账号管理',
                unfold: true
            },
            redirect: {
                name: 'accountIndex'
            },
            children: [
                {
                    path: 'index',
                    name: 'accountIndex',
                    meta: {
                        name: '账号列表',
                        auth: true,
                    },
                    component: Account
                }
            ]
        },
        {
            path: '/department',
            name: 'department',
            component: Main,
            meta: {
                name: '部门管理',
                unfold: true
            },
            redirect: {
                name: "front-end"
            },
            children: [
                {
                    path: 'front-end',
                    name: 'front-end',
                    component: FrontEnd,
                    meta: {
                        name: '前端开发部'
                    }
                }, {
                    path: 'back-end',
                    name: 'back-end',
                    component: BackEnd,
                    meta: {
                        name: '后端开发部'
                    }
                }
            ]
        },
        {
            path: '/chart',
            name: 'chart',
            component: Main,
            meta: {
                name: '图表',
                unfold:true
            },
            redirect: {
                name: 'chart_ic_test'
            },
            children: [
                {
                    path: 'chart-ic-test',
                    name: 'chart_ic_test',
                    meta: {
                        name: 'IC Test Chart',
                        auth: true,
                    },
                    component: ChartIcTest
                }
            ]
        },
        {
            path: '/tables',
            name: 'tables',
            component: Main,
            meta:{
                name: '表格',
                unfold: true
            },
            redirect: {
                name: ''
            },
            children: [
                {
                    path: 'project',
                    name: 'project',
                    meta:{
                        name: 'project',
                        auth:true
                    },
                    component: Project
                }
            ]
        },
        {
            path: '/setting',
            name: 'setting',
            component: Main,
            meta: {
                name: '设置'
            },
            redirect: {
                name: 'settingIndex'
            },
            children: [
                {
                    path: 'index',
                    name: 'settingIndex',
                    meta: {
                        name: '设置',
                        auth: true,
                    },
                    component: Setting
                }
            ]
        },
    ]
});

// 将router暴露出去供其他文件使用
export default router;