// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

class Storage{
    constructor(name,initdata){
        this.name = name
        this.initdata = initdata
    }
    get(){
        return JSON.parse(localStorage.getItem(this.name)) || this.initdata
    }
    set(data){
        localStorage.setItem(this.name, JSON.stringify(data))
    }
    static clear(){
        localStorage.clear()
    }
}

const initdata = '{\"姓名\":\"\",\"年龄\":\"\",\"性别\":\"男\",\"身份证号码\":\"\",\"诊断\":\"\",\"商品名称\":\"\",\"商品条码\":\"\",\"数量\":\"\",\"用法用量\":\"\"}'
const re = {
    姓名:'^[\\u4e00-\\u9fa5]*$',
    年龄:'^[0-9]{1,3}$',
    身份证号码:'(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
    商品条码:'^\\w*$',
    数量:'^[0-9]*$',
}
const sp = "        "
const vm = new Vue({
    el: '#app',
    data(){
        return JSON.parse(initdata)
    },
    methods: {
        copy(){
            let dataTag = this.$refs.dataTag
            st.set(this.$data)
            dataTag.value = sp + JSON.stringify(this.$data).replace(/,/g,"，") + sp
            dataTag.select()
            document.execCommand("copy")
        },
        init(){
            let data = st.get()
            for(let i in data){
                this.$data[i] = data[i]
            }
        },
        clear(){
            Storage.clear()
            this.init()
        },
        test(type){
            if(this[type]===""){return}
            if(this[type].match(new RegExp(re[type],"g"))===null){
                alert(type+"格式不正确")
            }
        }
    },
    created() {
        st = new Storage('medication',JSON.parse(initdata))
        let data = st.get()
        for(let i in data){
            this.$data[i] = data[i]
        }
    }
});
