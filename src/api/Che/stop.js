import request from '@/utils/request';
export const reqStopList = (stdata) => request({ url: `/stop/queryall`, method: 'get', data: stdata });
export const reqAddOrUpdateStop = (stdata) => {
  if (stdata.stopId) {
    return request({ url: '/stop/update', method: 'post', data: stdata });
  } else {
    return request({ url: '/stop/addstop', method: 'post', data: stdata });
  }
}
export const reqDeleteStop = (id)=>request({url:`/stop/delete/${id}`,method:'post' });

