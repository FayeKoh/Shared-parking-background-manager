//将四个模块请求的接口函数统一暴露
import * as trademark from './product/tradeMark';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from './product/sku';

//引入权限相关的接口文件
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission'


import * as parking from './Che/parking';
import * as pay from './Che/pay';
import * as stop from './Che/stop';
import * as weixin from './Che/weixin';
import * as wallet from './Che/wallet';
//对外暴露
export default {
    trademark,
    attr,
    sku,
    spu,
    user,
    role,
    permission,
    parking,
    pay,
    stop,
    weixin,
    wallet
}
