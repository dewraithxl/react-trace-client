//应用中所有接口请求函数的模块
//每个函数的返回值是promise
//要求：根据接口文档定义接口请求

import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

//登录
export const reqLogin = (username,password) => ajax('./login', {username, password},'POST')
//添加用户
// export const reqAddUser = (user) => ajax('./manage/user/add', {user},'POST')
//查询所有商品
export const reqProducts = () => ajax('./products')
//获取商品分页列表,后台未写相应的接口
export const reqProducts2 = (pageNum, pageSize) => ajax('./products',{pageNum, pageSize})
//搜索商品
export const reqSearchProducts = (searchName) => ajax('./products/search',{searchName})
//查询某个商品详情
export const reqProduct = (productId) => ajax('./products/detail', {productId}, 'POST')
//添加商品
export const reqAddProduct = (product) => ajax('../products/add', product, 'POST') 
//修改商品
export const reqUpdateProduct = (product) => ajax('../products/update', product, 'POST') 


//jsonp请求天气数据
export const reqWeather = (city)=>{
  return new Promise((resolve, reject)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {},(err, data)=>{
      // console.log('jsonp()', err, data)
      if(!err && data.status ==='success'){
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }
    })
  })
}