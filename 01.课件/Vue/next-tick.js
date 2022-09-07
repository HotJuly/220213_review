const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}

/*
  nextTick源码重点:
    1.所有的nextTick函数,共享一个callbacks数组
      该数组会收集所有nextTick接收的cb回调函数
    2.执行多次nextTick只会触发一次timerFunc
      也就是说,调用多次nextTick只会开启一个微任务
    3.当微任务执行的时候,nextTick会将callbacks中所有的回调函数遍历执行

    
  响应式数据更新视图流程:
    1.当某个响应式属性值发生变化之后,会触发该属性的set方法
    2.set方法中会触发dep.notify,通知视图进行更新
    3.dep.notify中会调用wacther.update方法(通知对应的组件进行更新)
    4.update方法中会调用queueWacther方法
    5.queueWacther方法中会调用nextTick函数,并将更新视图的方法传入给该函数
      也就证明了Vue更新视图的操作是异步更新
*/

export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}