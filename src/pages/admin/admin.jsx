import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Products from '../products/products'
import Produce from '../produce/produce'
import Calculator from '../calculator/calculator'

const { Footer, Sider, Content } = Layout;
//后台管理路由
export default class Admin extends Component {
  render(){
    const user = memoryUtils.user
    if(!user){
      return <Redirect to='/login' />
    }
    return(
      <Layout style={{height: "100%"}}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header> Header </Header>
        <Content style={{margin: '20px 15px 0 15px', backgroundColor: '#fff'}}>
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/products' component={Products} />
            <Route path='/produce' component={Produce} />
            <Route path='/calculator' component={Calculator} />
            <Redirect to='/home' />
          </Switch>
        </Content>
        <Footer style={{margin:0, padding: 0, height: '25px', textAlign: 'center'}}>© 2019 Nanjing University of Posts and Telecommunications All Rights Reserved X3W</Footer>
      </Layout>
    </Layout>
    )
  }
}