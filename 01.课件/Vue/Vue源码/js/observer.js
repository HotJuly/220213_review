function Observer(data) {
    // data->vm._data,this->ob对象
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // this->ob对象
        var me = this; //保存Observer实例化对象，因为下面要用
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm");
        // });
        
    },
    convert: function(key, val) { 
        //     ob.convert("msg", "hello mvvm");
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 
        this.defineReactive(this.data, key, val); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(vm._data, "msg", "hello mvvm"); 

        // 创建dep实例对象
        // data对象中每具有一个直系属性就会生成一个对应的dep对象
        // data对象中每具有一个属性就会生成一个对应的dep对象
        var dep = new Dep();  

        // 将当前属性的属性值传入进入,此处为隐式递归
        // 最终只要属性值是对象类型,就会继续递归,将所有的属性都变为响应式属性
        var childObj = observe(val);
        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 将data对象身上所有的属性都进行重写
        // 原先data对象中的所有属性都是具有value值的,
        // 但是经过该操作,所有的属性就会变为访问描述符,只剩下get/set方法
        // 注意点:Vue通过闭包的形式将本该丢弃的value值保存起来了

        // Object.defineProperty(data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {

        //         注意点:对一个响应式属性进行更新,如果新值与旧值相同,页面不会触发更新
        //         if (newVal === val) {
        //             return;
        //         }

        //         使用闭包缓存新值,将旧值彻底丢弃
        //         val = newVal;

        //         如果更新的新值,是对象数据类型,那么该对象中所有的属性都会被深度劫持,变为响应式属性
        //         childObj = observe(newVal);
                
        //         通知视图进行更新
        //         dep.notify();
        //     }
        // });

    }
};


function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        // dep.addSub(watcher);

        // dep对象收集到了与他相关的watcher对象
        // 当前响应式属性收集到了与他相关的插值语法
        // dep.subs.push(watcher);
        this.subs.push(sub);

    },

    depend: function() {
        // watcher.addDep(dep);
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
        // this.subs.forEach(function(sub) {
        //     watcher.update();
        // });
    }
};

Dep.target = null;