import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductDetail from './detail'
import ProductAddUpdate from './addupdate'
import ProductHome from './home'
import './products.less'

//商品路由组件
export default class Products extends Component {
  render() {
    return (
      <Switch>
        {/* exact表示路径完全匹配 */}
        <Route exact path='/products' component={ProductHome} />
        <Route path='/products/detail' component={ProductDetail} />
        <Route path='/products/addupdate' component={ProductAddUpdate} />
        <Redirect to='/products' />
      </Switch> 
    )
  }
}