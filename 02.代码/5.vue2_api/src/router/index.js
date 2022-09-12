import Vue from 'vue';
import VueRouter from 'vue-router';

import About from '@/components/About'
import Home from '@/components/Home'

Vue.use(VueRouter);

export default new VueRouter({
    // mode:"hash",
    mode:"history",
    routes:[
        {
            path:"/about",
            component:About
        },
        {
            path:"/home",
            component:Home,
            meta:{
                isShow:false
            }
        }
    ]
})