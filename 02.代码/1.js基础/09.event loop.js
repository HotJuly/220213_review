const fs = require('fs');
const { nextTick } = require('process');
/*
    超时定时器
        setTimeout的第二个参数是代表延迟的时间(单位是ms)
        第二个参数哪怕写的是0,它也代表的是1
            也就是说第二个参数的最小是为1

    此处出现12是正常现象,因为事件轮训机制的入口是timer阶段
    此处出现21是异常现象,因为主线程代码过少,导致进入轮询阶段的时候,连1ms都没到
        所以会先去执行5号阶段的宏任务,再回过头来执行满足时间条件的定时器回调函数
*/
/*
    1号阶段->timer阶段,定时器阶段
    4号阶段->I/O阶段,读写文件阶段
    5号阶段->check阶段,与setImmediate有关

    node轮训机制会从1号阶段进入,6号阶段执行结束之后,回到1号阶段,继续轮询

    入口是1号阶段,轮询的休息区是4号阶段
        如果除了I/O操作以外,没有其余的宏任务需要执行,
            那么就会停在4号阶段,等待文件读写结束

    注意:
        1.不是到达某个阶段,就清空该阶段的宏任务队列
            是到达某个阶段之后,只会执行满足条件的宏任务(回调函数)
*/
// setTimeout(()=>{
//     console.log(1)
// },0)

// // 读写文件是很耗时的操作,光开启读写文件的通道就需要100ms以上
// // 所以node中最费时间的就是I/O操作
// fs.readFile("./01.原型相关.html",()=>{
//     console.log(2)

//     setTimeout(()=>{
//         console.log(3)
//     },0)

//     setImmediate(()=>{
//         console.log(4)
//     })
    
// })

// setImmediate(()=>{
//     console.log(5)
// })

// for (let index = 0; index < 1000000; index++) {
// }


/*
    在js中
        .then开启的微任务已经是VIP级别了
        但是nextTick开启的微任务是超级VIP,优先于.then执行

    注意:
        1.当js在执行一个微任务的时候,必须将当前微任务队列清空才能离开
        2.node中其实有两个微任务队列,一个是nextTick专用(SVIP),一个是.then专用(VIP)
*/
Promise.resolve().then(()=>{
    console.log(1)

    Promise.resolve().then(()=>{
        console.log(2)
    })
    
    nextTick(()=>{
        console.log(3)
    })
    
    Promise.resolve().then(()=>{
        console.log(4)
    })
})

nextTick(()=>{
    console.log(5)
})