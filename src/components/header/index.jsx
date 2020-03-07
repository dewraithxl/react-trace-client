import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import { formatDate } from '../../utils/dateUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './index.less'
import LinkButton from '../link-button';


class Header extends Component {
  state = {
    currentTime: formatDate(new Date()),
    dayPictureUrl: '',
    weather: ''
  }
  getTime = () => {
    this.timerId = setInterval(() => {
      const currentTime = formatDate(new Date())
      this.setState({ currentTime })
    }, 1000);
  }
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('南京')
    this.setState({ dayPictureUrl, weather })
  }
  getTitle = () => {
    let path = this.props.location.pathname
    //为了将子路由对应的选项卡也选中
    if(path.indexOf('/products')===0){
      path = '/products'
    }
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        //在子item中查找匹配
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  logout = () => {
    Modal.confirm({
      title: '确定退出吗？',
      content: '',
      okText: '确认',
      cancelText: '取消',
      //使用箭头函数，避免this被改
      onOk: ()=>{
        //删除数据
        storageUtils.removeUser()
        memoryUtils.user = null
        //跳转路由
        this.props.history.replace('/login')
      },
      onCancel() { },
    })
  }
  //启动定时器获取天气
  componentDidMount() {
    this.getTime()
    this.getWeather()
  }
  //清除定时器
  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    const { currentTime, weather } = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)