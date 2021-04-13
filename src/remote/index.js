/* 
axios 组件 进行 远程调用
*/

import Axios from 'axios';

const BASEPATH = `http://localhost:7001`;

// params 参数传递  ？vname=zhangsan&vage=200
export const doGET = (url,params) => {
  return Axios({
    url,
    params,
    baseURL:BASEPATH,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 10000,
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
    responseEncoding: 'utf8' // default
  });
}

export const doPOST = (url,data) => {
  return Axios({
    url,
    data,
    baseURL:BASEPATH,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 10000,
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
    responseEncoding: 'utf8' // default
  });
}

export const doPUT = (url,data) => {
  return Axios({
    url,
    data,
    baseURL:BASEPATH,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 10000,
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
    responseEncoding: 'utf8' // default
  });
}

export const doDELETE = (url,data) => {
  return Axios({
    url,
    data,
    baseURL:BASEPATH,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 10000,
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
    responseEncoding: 'utf8' // default
  });
}