//发送ajax请求模块，封装axios库,返回的是promise对象
//优化：统一处理请求异常
//优化2：异步返回的不是response，而是response.data
import axios from 'axios'
import {message} from 'antd'
const querystring = require('querystring');

export default function ajax(url, data={}, type='GET'){
  return new Promise((resolve,reject) => {
    let promise
    //1.执行异步ajax请求
    if(type==='GET'){
      promise = axios.get(url, {params: data})
    } else {
      //Post请求需要将其转换成字符串
      console.log(querystring.stringify(data))//username=xiaoming&password=666666
      promise = axios.post(url, querystring.stringify(data))
    }
    //2.成功
    promise.then(response =>{
      resolve(response.data)
    }).catch(error => {
      message.error('请求出错'+ error.message)
    })
    //3.失败，不调用reject
  }) 
}