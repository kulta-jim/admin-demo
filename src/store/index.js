import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        collapsed: false,
        logoShow: true,
    },
    getters: {
        // es6语法,箭头函数更简洁
        collapsedText: state => 'hahaha' + state.collapsed,
        logoShowText: state => 'hahaha' + state.logoShow,
        getToken(state){
            if (!state.token){
                state.token = localStorage.getItem('token')
            }
            return state.token
        }
    },
    mutations: {
        changeShowState(state) {
            state.collapsed = !state.collapsed
            state.logoShow = !state.logoShow
        },
        setToken(srate, token){
            state.token = token
            localStorage.token = token
        }
    },
    actions: {
        changeShowStateAsync({ commit }) {
            setTimeout(() => {
                commit('changeShowState')
            }, 1000);
        }
    },
})

export default store