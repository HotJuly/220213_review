import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'

function filterAsyncRoutes(routeNames,asyncRoutes){
  // routeNames是路由别名字符串组成的数组
  // asyncRoutes是路由对象组成的数组
  // 返回值:需要一个可以访问的路由对象组成的数组
  const newAsyncRoutes = asyncRoutes.filter((routeObj)=>{

    // 对当前路由的子路由也进行过滤操作,最终得到过滤完的子路由数组,替换掉children中的完整数组
      if(routeObj.children&&routeObj.children.length){
        routeObj.children = filterAsyncRoutes(routeNames,routeObj.children)
      }

      return routeNames.includes(routeObj.name);
  })

  return newAsyncRoutes;
}

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 用于保存服务器返回的用户的routes数组
    // 该数组中存放的是用户能够访问的路由别名
    routeNames:[],

    // 用于存储当前用户能够访问的所有路由对象
    routes:[],

    // 用于存储服务器返回的用户的buttons数组
    // 用于实现按钮级权限管理
    buttons:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION : (state,data) => {
    state.routeNames = data.routes;

    state.buttons = data.buttons;

    // 通过filterAsyncRoutes方法过滤现在的所有的异步路由,
    // 最终返回一个当前用户可以访问的异步路由数组
    // console.log(111);
    const newAsyncRoutes = filterAsyncRoutes(state.routeNames,asyncRoutes);

    // 如果现在添加的路由与之前的不冲突,就都保留,如果冲突了,就保留当前最新的
    router.addRoutes([...newAsyncRoutes,...anyRoutes])

    // 这里是为了解决左侧列表的显示BUG,而写的
    state.routes = [...constantRoutes,...newAsyncRoutes,...anyRoutes];
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSION',data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

