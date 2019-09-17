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
    商品条码:'[0-9]{9}',
    数量:'^[0-9]*$',
}
const sp = "        "
const vm = new Vue({
    el: '#app',
    data: function(){
        return JSON.parse(initdata)
    },
    methods: {
        copy: function(){
            let dataTag = this.$refs.dataTag
            st.set(this.$data)
            dataTag.value = sp + JSON.stringify(this.$data).replace(/,/g,"，") + sp
            dataTag.select()
            document.execCommand("copy")
            Swal.fire({
                position: 'center',
                type: 'success',
                title: '复制完成',
                showConfirmButton: false,
                timer: 1500
            })
        },
        init: function(){
            let data = st.get()
            for(let i in data){
                this.$data[i] = data[i]
            }
        },
        clear:function(){
            Storage.clear()
            this.init()
        },
        test:function(type,e){
            if(this[type]===""){return}
            if(this[type].match(new RegExp(re[type],"g"))===null){
                Swal.fire({
                    position: 'center',
                    type: 'warning',
                    title: type + '填写不合要求',
                    showConfirmButton: false,
                    timer: 1000
                })
                //setTimeout(function(){e.target.focus()},1000)
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
