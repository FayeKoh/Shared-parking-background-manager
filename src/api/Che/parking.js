import request from '@/utils/request';
export const reqParkingList = (padata) => request({ url: `/stall/queryall`, method: 'get', data: padata });

export const reqAddOrUpdateParking = (padata) => {
  if (padata.stallId) {
    return request({ url: '/stall/update', method: 'post', data: padata });
  } else {
    return request({ url: '/stall/addstall', method: 'post', data: padata });
  }
}

export const reqBanParking = (padata)=>request({url:`/stall/jinzu`,method:'post', data: padata });

export const reqDeleteParking = (id)=>request({url:`/stall/delete/${id}`,method:'post'});

