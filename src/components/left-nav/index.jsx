import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;

//左侧导航组件
class LeftNav extends Component {
  //从数组元素生成标签的reduce方法
  getMenuNodes_reduce = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        // 向pre添加<SubMenu>
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_reduce(item.children)}
          </SubMenu>
        ))
      }
      //这一步不能忘
      return pre
    }, [])
  }
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      //得到当前请求的路由
    const path = this.props.location.pathname
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        //确认应该展开的菜单项
        //查找与请求路径相同的子Item,find是数组的方法
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        //如果存在，当前Item的子列表要展开
        if(cItem){
          this.openKey = item.key
        }
        
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  //在第一次render前执行一次，为第一次render准备数据
  componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    //得到当前请求的路由
    let path = this.props.location.pathname
    //为了将子路由对应的选项卡也选中
    if(path.indexOf('/products')===0){
      path = '/products'
    }
    //得到需要展开的openkey
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <h2>碳足迹管理系统</h2>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNodes
          }
          {/* <Menu.Item key="1">
            <Link to='/home'>
              <Icon type="pie-chart" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品详情</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to='/product'>
                <Icon type="mail" />
                <span>商品信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='/product'>
                <Icon type="mail" />
                <span>碳足迹计算器</span>
              </Link>
            </Menu.Item>
          </SubMenu> */}
          {/* <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="mail" />
                <span>生产管理</span>
              </span>
            }
          >
            <Menu.Item key="6">工厂信息</Menu.Item>
            <Menu.Item key="7">设备信息</Menu.Item>
            <Menu.Item key="8">碳足迹信息</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="mail" />
                <span>加工管理</span>
              </span>
            }
          >
            <Menu.Item key="10">加工信息</Menu.Item>
            <Menu.Item key="11">碳足迹信息</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="mail" />
                <span>仓储管理</span>
              </span>
            }
          >
            <Menu.Item key="13">仓库信息</Menu.Item>
            <Menu.Item key="14">碳足迹信息</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <Icon type="mail" />
                <span>物流管理</span>
              </span>
            }
          >
            <Menu.Item key="16">运输信息</Menu.Item>
            <Menu.Item key="17">碳足迹信息</Menu.Item>
            <Menu.Item key="18">碳足迹地图</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub6"
            title={
              <span>
                <Icon type="mail" />
                <span>销售管理</span>
              </span>
            }
          >
            <Menu.Item key="20">销售信息</Menu.Item>
            <Menu.Item key="21">碳足迹信息</Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>

    )
  }
}

//withRouter高价组件：包装非路由组件，返回一个新的组件
//新的组件向非路由组件传递3个属性，history/Location/match
export default withRouter(LeftNav)