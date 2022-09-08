function MVVM(options) {
  /*
        options={
            el: "#app",
            data: {
                msg: "hello mvvm",
                person:{
                    name:"xiaoming",
                    msg:"123"
                },
            }
        }
        this->mvvm的实例对象,后续简称vm对象
    */

  this.$options = options;

  var data = (this._data = this.$options.data);
  // var data = (this._data = this.$options.data);
  // var data = this.$options.data;

  var me = this;

  /*
        MVVM源码的第一部分:数据代理

        代理:当我们找某个代理购买东西,代理会找厂家获取东西,再将东西转交给我们
            从我们的视角来看,感觉代理是有货的,但其实他并没有存储货物,
            只是做了个转交的工作

        目的:方便用户读取_data中的相关状态数据,可以简化用户的操作,
            读取属性时可以少写._data操作

        次数:2次(与data直系属性个数有关)

        流程:
            1.使用Object.keys方法,获取到data对象上所有的直系属性名组成的数组
            2.遍历得到的属性名数组,执行_proxy方法
            3.根据每个直系属性的名称,在组件实例对象上,添加同名的属性名
                并将该属性变为get/set方法
                当用户读取该属性的值时,会自动调用get方法,找this._data对象读取数据并进行返回
                当用户设置该属性的值时,会自动调用set方法,对this._data对象上同名的属性进行修改
    
    */
  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  // Object.keys的用处,就是返回一个由当前对象所有直系属性名组成的数组
  // Object.keys(options.data).forEach(function(key) {
  // ["msg","person"].forEach(function(key) {
  //     vm._proxy("msg");
  // });

  /*
        问题:什么是响应式?
        回答:当某个属性的值发生变化时,页面会渲染出最新的结果

        需求:当某个属性的值发生变化时,页面会渲染出最新的结果
        拆解:
            1.当某个属性的值发生变化时
                可以给该属性添加get/set方法,用来监视用户的读取和修改操作

            2.页面渲染最新的结果
                将得到的最新数据,通过原生DOM的CRUD方法更新到页面上展示
    
    */
  /*
    MVVM源码第二部分:数据劫持

    劫持:控制某个对象,强迫他做自己不想做的事情

    目的:为了监视用户修改某个响应式属性的操作,如果值发生了变化,就通知DOM进行更新

    次数:4次(与当前data对象所有的属性个数有关,会深度劫持)

    流程:
        1.将data对象交给observe函数
        2.observe函数内部会判断当前data是不是空值或者是不是对象
            如果是空值或者不是对象,就结束数据劫持
        3.如果是对象,那么就创建一个Observer对象
        4.Observer构造函数中,会自动调用walk方法
        5.walk方法中,会使用Object.keys方法获取到data的所有直系属性名
        6.每具有一个直系属性名,就会调用一次defineReactive方法进行数据劫持
        7.defineReactive函数中会做以下几个事情:
            1.创建一个对应的dep对象
            2.检查当前数据劫持的属性值,将属性值交给observe函数
                如果是对象那么,递归回到流程2
            3.将data中的所有属性进行重写,将其从value值格式变为get/set方法格式
                通过get方法监视用户读取属性操作
                    如果用户读取该属性的值,就会返回闭包中保存的属性值

                通过set方法监视用户修改属性操作
                    1.判断新值与旧值是否相同,如果相同就return,什么都不做
                    2.对属性值进行深度劫持
                    3.通过调用dep.notify方法通知DOM进行更新
   */

  observe(data, this);
//   observe(options.data, vm);

  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    // key=>"msg",this->vm对象
    var me = this;

    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });

    // Object.defineProperty方法可以给一个对象添加或者修改某个属性
    // vm对象身上不存在msg属性,所以此处是在新增msg属性,方法后续使用this.msg语法
    // 属性分为两种,一种是有value值的属性,另一种是有get/set方法的属性
    // value值和get/set方法不能共存,
    // 具有get/set方法的属性,一般称为访问描述符
    // 当用户读取该属性的值时,会自动调用get方法,并将get方法的返回值进行返回给用户
    // 当用户设置该属性的值时,会自动调用set方法,执行内部的代码

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
  },
};
