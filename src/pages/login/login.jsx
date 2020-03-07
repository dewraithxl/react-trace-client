import React, { Component } from 'react'
import { Form, Icon, Input, Button, message} from 'antd'
import {Redirect} from 'react-router-dom'

import './login.less'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
//登录路由组件
class Login extends Component {
  handleSubmit = (event) => {
    //阻止默认行文
    event.preventDefault()
    //得到form对象
    const form = this.props.form
    //获取表单输入数据
    const values = form.getFieldsValue()
    //对所有表单校验
    form.validateFields(async (err, values) => {
      //校验成功
      if (!err) {
        // console.log('提交登录的ajax请求 ', values)
        const {username,password} = values
        const result = await reqLogin(username,password)
        if(result.status === 0){
          //提示登录成功
          message.success('登录成功')
          //保存user
          const user = result.message
          memoryUtils.user = user
          storageUtils.saveUser(user)
          //跳转路由
          this.props.history.replace('/')
        }
      } else {
        console.log('校验失败');
      }
    });
  }
  render() {
    //判断用户当前是否已登录
    const user = memoryUtils.user
    if(user){
      return <Redirect to='/'/>
    }
    const form = this.props.form
    const { getFieldDecorator } = form;
    return (
      <div className="login">
        <header className="login-header">
          <img src="" alt="" />
        </header>
        <section className="login-content">
          <h2>碳足迹溯源管理系统</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                //声明式验证
                rules: [
                  { required: true, whitespace: true, message: '用户名必须输入' },
                  { min: 4, message: '用户名至少为4位' },
                  { max: 12, message: '用户名最多为12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                ],
                validateFirst: true
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                /> 
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                //声明式验证
                rules: [
                  { required: true, whitespace: true, message: '密码必须输入' },
                  { min: 4, message: '密码至少为4位' },
                  { max: 12, message: '密码最多为12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' }
                ],
                validateFirst: true
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Login);

export default WrapLogin