function Compile(el, vm) {
    // this->com对象,el->"#app",vm->vm

    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);

        // 此处就是beforeMount的执行时机

        this.init();

        // 这就是挂载
        this.$el.appendChild(this.$fragment);

        // 此处就是mounted的执行时机

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->#app元素
        var fragment = document.createDocumentFragment(),
            child;

        while (child = el.firstChild) {
            // 将#app元素内部所有的直系子节点全部放入文档碎片对象中
            // 说白了就是被抄家了
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // 获取当前元素内部所有子节点组成的伪数组
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // 第一次进入
        // [text节点,p节点,text节点].forEach(function(node) {

        // 第二次进入
        // [text节点].forEach(function(node) {
            // text->"{{msg}}"
        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         com.compile(p节点);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         com.compileText(text节点, "msg");
        //     }

        //     if (p节点.childNodes && p节点.childNodes.length) {
        //         me.compileElement(p节点);
        //     }
        // });
    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
        // [class标签属性对象,v-on:click标签属性对象].forEach(function(attr) {
        //     var attrName = attr.name;
        //     if (me.isDirective(attrName)) {
        //         exp => 'clickHandle';
        //         var exp = attr.value;
        //          dir => 'on:click'
        //         var dir = attrName.substring(2);

        //         if (me.isEventDirective(dir)) {
        //             compileUtil.eventHandler(p节点, vm, 'clickHandle', 'on:click');
        //         } else {
        //             compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        //         }

        //         node.removeAttribute(attrName);
        //     }
        // });
    },

    compileText: function(node, exp) {
        // com.compileText(text节点, "msg");
        // compileUtil.text(text节点, vm对象, "msg");
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // compileUtil.text(text节点, vm对象, "msg");
        // this.bind(text节点, vm, "msg", 'text');
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(text节点, vm, "msg", 'text');
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        // updaterFn && updaterFn(text节点, this._getVMVal(vm, "msg"));
        // updaterFn && updaterFn(text节点, "hello mvvm");
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 小总结:
        // 调用一次bind就可以得到一个对应的watcher对象
        // 一个插值语法会生成一个对应的watcher对象
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

        // new Watcher(vm, "msg", function(value, oldValue) {
        //     textUpdater(text节点, value, oldValue);
        // });
        
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        //compileUtil.eventHandler(p节点, vm, 'clickHandle', 'on:click');
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // this._getVMVal(vm, "msg")

        var val = vm._data;

        // ["msg"]
        // "person.name"=>["person","name"]
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
        // 第一次的val结果
        //     val = vm._data["person"];

        // 第二次的val结果
        // 经过了数据劫持,没经过数据代理
        //     val = vm._data["person"]["name"];

        // 以下写法才会经过数据代理,但是Vue没这么写
        //     val = vm["person"]["name"];
        // });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // updaterFn && updaterFn(text节点, "hello mvvm");

        //更新响应式属性之后的实参 node->text节点, value=>"hello vue"

        // text节点.textContent = typeof value == 'undefined' ? '' : value;
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};