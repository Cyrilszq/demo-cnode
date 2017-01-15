// 生产环境配置文件
module.exports = {
    port:3000, //监听的端口
    session:{
        secret:'demo-cnode',
        key:'demo-cnode',
        maxAge: 2592000000
    },
    mongodb:'mongodb://localhost:27017/demo-cnode',

    name:'demo-cnode',
    description:'一个模仿cnode的demo',

    debug:false
};