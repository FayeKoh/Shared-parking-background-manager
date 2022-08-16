import request from '@/utils/request';
export const reqWalletList = (wadata) => request({ url: `/c/queryMoney`, method: 'get', data: wadata });
export const reqSearchParkingList = (searchObj) => request({ url: `/stall/seek`, method: 'get', params: searchObj });

export const reqAddOrUpdateParking = (padata) => {
  if (padata.stallId) {
    return request({ url: '/stall/update', method: 'post', data: padata });
  } else {
    return request({ url: '/stall/addstall', method: 'post', data: padata });
  }
}


export const reqDeleteParking = (id)=>request({url:`/stall/delete/${id}`,method:'post'});

