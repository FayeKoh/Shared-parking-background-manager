import request from '@/utils/request';
export const reqWeixinList = (wedata) => request({ url: `/c/queryAll`, method: 'get', data: wedata });

export const reqAddOrUpdateWeixin = (wedata) => {
  if (wedata.userId) {
    return request({ url: '/c/update', method: 'post', data: wedata });
  } else {
    return request({ url: '/c/add', method: 'post', data: wedata });
  }
}


export const reqDeleteWeixin = (id)=>request({url:`/c/delete/${id}`,method:'post' });

