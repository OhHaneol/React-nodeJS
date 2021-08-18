//  배포 모드라면 prod.js 의 MONGO_URI를 얻어오고, 
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {    //  local develop 라면 dev.js 의 MONGO_URI를 받아옴.
    module.exports = require('./dev');
}