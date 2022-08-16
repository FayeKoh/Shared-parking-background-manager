import request from '@/utils/request';
export const reqPayList = (paydata) => request({ url: `/expend/queryall`, method: 'get', data: paydata });

