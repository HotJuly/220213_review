function MVVM(options) {
    /*
        options=>{
                    el: "#app",
                    data: {
                        msg: "hello mvvm",
                        person:{
                            name:"xiaoming",
                            msg:"123"
                    }
                }
        this->vm对象
      }
    
    */

    this.$options = options;

    // 这里就是beforeCreate的执行时机

    var data = this._data = this.$options.data;
    // var data = (this._data = this.$options.data);
    // var data = (this.$options.data);

    var me = this; 

    
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });

    /*
        MVVM源码第一部分:数据代理
        代理:意思就是说代理本身并没有数据,但是他会找其他人获取数据,进行返回使用
        目的:方便读取data中的数据,可以直接在this身上直接获取数据,不需要找$data对象获取
        次数:2次(只代理data中的直系属性)
        流程:
            1.会使用Object.keys方法获取到data对象身上所有的直系属性名组成的数组
            2.遍历该数组,得到每一个属性名
            3.将每个属性名都代理到vm对象身上,给vm对象添加相同的属性
            4.使用Object.defineProperty来添加属性,可以让该属性拥有get和set方法
                当开发者读取当前属性时候,会触发get函数,执行内部代码,
                    最终读取的结果是根据函数的返回值决定的

                当开发者设置/修改当前属性时,会触发set函数,执行内部代码,
                    最终会将修改的值直接修改$data对象身上的对应属性

        小总结:他其实并不是响应式原理中不可获取的一部分
    */
    // ["msg","person"].forEach(function(key) {
    //     vm._proxy("msg");
    // });

    /* 
        响应式原理分析

        需求:当一个属性的值发生变化时,需要将最新的结果渲染到页面上
        拆解:
            1.如何知道属性值的变化?
                可以通过Object.defineProperty方法重写属性,使其变为get和set方法
                    通过这两个方法就可以知道该属性的读取和修改

            2.如何将最新的结果渲染到页面上?
                通过原生DOM的CRUD方法,对对应的标签的内容进行更新即可

        准备工作:
            1.我们通过数据劫持已经将data中所有的属性都进行重写,变成了get/set方法
                只要开发者修改他们的值,Vue源码就可以得知该操作

            2.在data属性被重写的过程中,我们为每个属性都准备了一个对应的dep对象

            3.在插值语法解析的时候,每个插值语法都会生成一个对应的watcher对象

        dep和watcher的映射关系准备
            1.new Wacther中会调用getVMVal,获取当前插值语法对应的值
            2.在读取的过程中,会将Dep.target修改为当前的watcher对象
            3.获取表达式结果的过程中,会触发响应式属性的get方法,从而执行dep.depend方法,开始收集watcher
            4.watcher会调用addDep方法,将与自身相关的dep对象都收集到自己的depIds属性中
            5.而dep对象会使用subs属性,收集与自身相关的所有watcher对象

        响应式触发流程:
            1.this.msg=123,会触发msg属性的set方法(也就是所谓的数据代理)
            2.在set方法中,会修改_data对象中,对应属性的属性值
                vm._data["msg"] = newVal;
            3.由于_data对象中所有的属性都已经变为访问描述符,所以会触发set方法(此处触发的是数据劫持的set方法)
            4.set方法中会调用dep.notify方法通知视图进行更新
            5.notify中会遍历dep对象的subs属性,获取到与当前dep对象相关的所有watcher对象
            6.调用这些watcher对象的update方法
            7.调用new Watcher时候准备好的更新器函数,将获取到的最新数据传入更新器函数,更新指定节点


        问题1:Vue更新数据是同步更新还是异步更新?
        答案:同步更新

        问题2:Vue更新视图是同步更新还是异步更新?
        答案:Vue1是同步更新DOM,Vue2是异步更新视图
            Vue2中会将更新视图的操作放入到nextTick函数中

        问题3:
            Vue1更新视图的最小单位是什么?
                标签(精准更新)

            Vue2更新视图的最小单位是什么?
                组件(更新范围太大,存在误杀的情况)

            Vue1之所以可以这么精准,是因为他给每个插值语法都生成了一个watcher对象
            Vue2之所以这么更新,是因为他给每个组件都生成了一个watcher对象
                但其实Vue2还有diff算法配置,他会二次检查需要更新的内容

        问题4:
            Vue2中,请问数组的下标是否具有响应式效果?
                没有响应式效果

            Vue1中,请问数组的下标是否具有响应式效果?
                具有响应式效果

            出现以上现象是因为,尤大大考虑到数组中一般存放的数据量会非常大,但是修改的机会很少
                所以,数组的下标没有经过数据劫持,
                同时为了解决数组下标不是响应式的效果,他重写了7个数组的方法
                    push,pop,shift,unshift,sort,splice,reverse

        面试题5:请问Vue2中,数组中如果是对象的话,请问对象的属性名会不会被数据劫持
            会
            Vue2会将data中的数组的__proto__修改为全新的一个原型对象
                该原型对象是根据数组的prototype生成的全新对象,上面会重写以上7个方法

                最终可以实现的效果:
                    1.如果使用push方法的是data中的数组,那么就会有更新视图的功能
                    2.如果使用push方法的不是data中的数组,那么就没有更新视图的功能

    */

    /*
        MVVM源码第二部分:数据劫持
        劫持:控制某个对象,逼迫其做不想做的事情
        目的:监视开发者对某些属性的修改或者读取操作,如果出现修改操作,就会及时通知视图更新
        次数:4次(与data对象中拥有多少个属性名有关,具有递归效果)
        流程:
            1.调用observe函数,开始进行劫持操作
                该函数内部会判断当前传入的数据是否是对象数据类型
                    如果不是就直接返回
                    如果是就new Observer函数,创建ob对象
            2.Observer函数中,在创建ob对象的时候,会执行walk函数,遍历data对象中所有的直系属性名
            3.对每个属性名执行defineReactive函数,该函数会进行数据劫持
                -创建一个全新的dep对象
                    也就是说data中每具有一个属性就会创建出一个对应的dep对象

                -将当前属性值传入observe函数,如果属性值还是个对象,开始递归遍历,深度劫持该对象,回到流程1
                    如果不是对象数据类型,则没事
                -使用Object.defineProperty重写data对象上所有的属性
                    -将原先是value值的属性描述符变为具有get/set方法的访问描述符
                    -如果开发者读取该属性值,就会触发get方法,执行内部的代码
                        直接返回原值(此时已经没有value值了,但是Vue通过闭包保存了原先的value值)
                    -如果开发者修改该属性值,就会触发set方法,执行内部的代码
                        -判断新值与旧值是否相同
                            如果不相同就继续执行后续代码
                            如果相同就直接返回,也就是说更新十次属性,如果属性值都相同,只会触发一次页面更新
                        -判断新值的数据类型是否为对象
                            如果是对象,就会对该对象进行深度数据劫持,将内部所有的属性都变为响应式属性
                        -调用dep.notify方法,通知视图进行更新

    
    */
    observe(data, this);
    // observe(vm._data, vm);

    // 此处就是created的执行时机
    

    /*
        MVVM源码第三部分:模版解析
        目的:
            1.将页面指定元素的内容作为模版进行解析,展示对应的数据以及解析指令(首次渲染)
            2.他在为未来实现响应式更新页面做准备工作

        流程:
            1.将el元素或者body元素作为模版传入到Compile函数中进行解析
                如果el是真实DOM就直接使用,不是的话就找到页面上对应的真实DOM进行操作
            2.将el元素中所有的子节点都转移到文档碎片对象中,防止后续频繁操作DOM节点,影响到页面渲染
            3.遍历文档碎片中所有的子节点,根据子节点的类型来实现不同的操作
                -如果子节点是元素节点
                    会取出当前节点的所有标签属性节点,遍历判断是否是Vue指令
                    如果是Vue指令,在继续判断是否是事件指令,如果是就绑定事件
                -如果子节点是文本节点,同时满足插值语法的正则判断
                    会获取当前文本节点的表达式内容,传递给bind函数
            4.bind函数中,会根据当前的节点类型找到对应的更新器函数
              -根据表达式的结果,从data对象中,获取到对应的属性值
              -将该属性值以及标签节点传入到指定的更新器函数中,执行更新效果
              -注意点:在调用bind函数的时候,会同时创建一个watcher对象
                每具有一个插值语法就会创建出一个watcher对象

            5.如果当前节点编译结束,就会回到3之后,判断当前节点是否还有子节点
                如果具有子节点就继续递归解析
            6.最终将解析完的文档碎片对象插入到页面的el元素中进行展示
                    
        
    
    */
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
        // key->"msg" this->vm对象
        var me = this;

        Object.defineProperty(me, key, {
            configurable: false, //不能重复定义
            enumerable: true, //可以遍历
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });

        // 此处在给vm对象新增属性msg
        // 属性一共分为两种,一种叫做属性描述符,一种叫做访问描述符
        // 属性描述符就是说当前这个属性具有value值
        // 访问描述符就是说当前这个属性不具有value值,只具有set/get方法
        // value值和get/set方法不会共存
        // 如果修改访问描述符的属性值,就会触发set方法,如果是读取访问描述符的属性值,就会触发get方法

        // Object.defineProperty(vm, "msg", {
        //     configurable: false, //不能重复定义
        //     enumerable: true, //可以遍历
        //     get: function proxyGetter() {
        //         return vm._data["msg"];
        //     },
        //     set: function proxySetter(newVal) {
        //         vm._data["msg"] = newVal;
        //     }
        // });

    }
};