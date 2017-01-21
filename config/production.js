// 生产环境配置文件
module.exports = {
    port:3000,
    name:'demo-cnode',
    description:'一个模仿cnode的demo',

    session:{
        secret:'demo-cnode',
        key:'demo-cnode',
        maxAge: 2592000000
    },
    mongodb:'mongodb://localhost:27017/demo-cnode',

    multerStorageOpts: {
        //保存头像的路径
        destination: function (req, file, cb) {
            cb(null, '/usr/share/nginx/demo-cnode/public/img')
        },
        // 设置保存时的文件名
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split(".");
            cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    },

    debug:false
};