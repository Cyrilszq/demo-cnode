module.exports = {
    port:3000,
    session:{
        secret:'demo-cnode',
        key:'demo-cnode',
        maxAge: 2592000000
    },
    mongodb:'mongodb://localhost:27017/demo-cnode'
};