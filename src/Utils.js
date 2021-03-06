const STORAGE_ENGINE = localStorage;
// const STORAGE_ENGINE = sessionStorage;
const Utils = {
    // 在stroage中存/取数据
    setItem(key, val) {
        if (typeof val === 'object') {
            STORAGE_ENGINE.setItem(key, JSON.stringify(val))
        } else {
            STORAGE_ENGINE.setItem(key, val)
        }
    },
    getItem(key) {
        let ele = STORAGE_ENGINE.getItem(key);
        let val = null;
        try {
            val = JSON.parse(ele);
        } catch (error) {
            val = ele;
        }
        return val;
    },

    // 用户信息相关方法
    // 在stroage中存/取用户token
    setToken(token) {
        STORAGE_ENGINE.setItem('_token', token);
    },
    getToken() {
        return STORAGE_ENGINE.getItem('_token');
    },

    // 在stroage中存/取用户信息
    setUserInfo(userInfo) {
        STORAGE_ENGINE.setItem('_userInfo', userInfo);
    },
    getUserInfo() {
        return STORAGE_ENGINE.getItem('_userInfo');
    },
    
    // 清除stroage中数据
    clear() {
        STORAGE_ENGINE.clear();
    },
    
    //登出
    logout() {
        this.clear();
    },

    // 获取登录时存放的权限字段数组
    getPermission() {
        let val = [];
        try {
            val = JSON.parse(STORAGE_ENGINE.getItem('_permission_'));
        } catch (error) {
            val = [];
        }
        return val;
    },

    // 权限控制：根据权限字段返回Boolean值，用来判断路由或者页面中按钮的显示隐藏
    canVisit(name) {
        let permission = this.getPermission();
        if (!Array.isArray(permission)) {
            permission = [];
        }
        let isPermission = false
        let obj = null;
        obj = permission.find((item, index) => {
            return item.symbol.includes(name);
        });
        if (obj) {
            isPermission = true;
        };
        if (isPermission || name === 'index' || name === 'homeIndex') {
            return true;
        } else {
            return false;
        }
        // return true;
    },
    /**
     * 对象的深度拷贝
     * @param data 需要拷贝的元数据
     * @return {any} 返回拷贝后的新数据
     */
    deepClone(data) {
        const type = this.getType(data);
        let obj;

        if (type === 'array') {
            obj = [];
        } else if (type === 'object') {
            obj = {};
        } else {
            //不再具有下一层次
            return data;
        }
        if (type === 'array') {
            for (let i = 0, len = data.length; i < len; i++) {
                obj.push(this.deepClone(data[i]));
            }
        } else if (type === 'object') {
            for (let key in data) {
                obj[key] = this.deepClone(data[key]);
            }
        }
        const constructor = data.constructor;
        if (constructor) {
            return Object.assign(new constructor(), obj);
        }
        return obj;
    },

    /**
     * 处理空的参数
     * @param data
     * @returns
     */
    cleanData(data) {
        let _data = {};
        for (let key in data) {
            if (Object.prototype.toString.call(data[key]) === '[object Object]') {
                _data[key] = null;
            } else if (data[key] instanceof Array) {
                _data[key] = [];
            } else {
                _data[key] = undefined;
            }
        }
        return _data;
    },

    /**
     * 判断对象类型
     * @param {Object} object
     * @return {String} object type
     */
    getType(object) {
        var toString = Object.prototype.toString;
        var map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        if (object instanceof Element) {
            return 'element';
        }
        return map[toString.call(object)];
    },
    
    preventClose(e) {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
            e.returnValue = '关闭提示';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示';
    },
    /**
     * 
     * @param {路由守卫next回调} next 
     * @param {vue} that 
     */
    showConfirm(next, that) {
        that.$confirm({
            title: '确定要离开当前页面吗？',
            content: '离开后您将取消本次编辑的全部内容，确定要离开吗？',
            cancelText: "取消",
            okText: '确定',
            centered: true,
            onOk() {
                next();
            },
            onCancel() {
                that.$router.go(1);
            },
            class: 'test',
        });
    },
    //附件url转换
    changefileUrl(url, str = '') {
        let arr = url ? url.split(',') : [];
        let arr1 = [];
        arr.map((ele, index) => {
            let one = ele.lastIndexOf('_');
            let two = ele.lastIndexOf('.');
            let newStr = ele.replace(ele.substring(one, two), '');
            let arr = newStr.split('/')
            let name = arr[arr.length - 1];
            arr1.push({
                uid: (index + 1) / -1 + '',
                name: name,
                url: ele,
                status: 'done'
            })
        })
        return arr1;
    },
};

export default Utils;