import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        // 该对象用于记录出去了,但是没有回来的请求
        fns:{}
    },
    mutations:{
        addFn(state,{url,cb}){
            state.fns[url] = cb;
        },
        removeFn(state,url){
            delete state.fns[url]
        },
        clearFns(state){
            const cbs = Object.values(state.fns);
            cbs.forEach((cb)=>{
                cb();
            })
        }
    }
})