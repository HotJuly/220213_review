import axios from 'axios';
import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:20000
})

// 获取用于创建取消器的构造函数
const CancelToken = axios.CancelToken;

request.interceptors.request.use((config)=>{

    // 获取到当前请求的路径
    const url = config.url;
    // console.log('config',config)

    config.cancelToken = new CancelToken((cb)=>{
        // 该回调函数会被同步执行
        // 这个cb如果被调用,当前请求就会被取消
        store.commit('addFn',{url,cb})
    })

    return config
})

request.interceptors.response.use((response)=>{
    // 获取当前返回响应的请求路径
    // console.log(response)
    const url = response.config.url;

    store.commit('removeFn',url)
    return response.data;
})

export default request