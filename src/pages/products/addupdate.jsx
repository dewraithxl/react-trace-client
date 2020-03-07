import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Card,
  Icon,
  message
} from 'antd';
import LinkButton from '../../components/link-button'
import { reqAddProduct, reqUpdateProduct } from '../../api'
import moment from 'moment';
const { TextArea } = Input
const { Item } = Form

//商品的添加修改路由组件
class ProductAddUpdate extends Component {
  submit = () => {
    //表单验证
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        //1.收集数据，封装product对象
        const { productiondate } = values
        //将moment对象转成字符串
        values.productiondate = productiondate.format('YYYY-MM-DD')
        //2.调用接口请求函数，添加/更行
        let result,mes='添加成功!'
        if(this.isUpdate){
          values.productId=this.product.productId
          mes='修改成功！'
          result = await reqUpdateProduct(values)
        } else{
          result = await reqAddProduct(values)
        }
        //3.根据结果提示
        if (result.status === 0) { 
          message.success(mes)
          this.props.history.goBack()
        } else {
          message.success(mes)
        }
      }
    })
  }
  componentWillMount () {
    // 取出携带的state
    const product = this.props.location.state  // 如果是添加没值, 否则有值
    // 保存是否是更新的标识
    this.isUpdate = !!product
    // 保存商品(如果没有, 保存是{})
    this.product = product || {}
  }
  render() {
    const {isUpdate,product} = this
    
    const formItemLayout = {
      layout: "horizontal",
      labelCol: { span: 2 },
      wrapperCol: { span: 10 }
    }
    //Button所在的Item布局
    const tailLayout = {
      wrapperCol: { offset: 2}
    }
    const title = (
      <LinkButton>
        <span>
          <Icon onClick={()=>{this.props.history.goBack()}} type="arrow-left" style={{ color: '#4f6db6', marginRight: 10, fontSize: 20 }}></Icon>
            {isUpdate?'更新':'添加'}商品
        </span>
      </LinkButton>
    )
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Card title={title}>

          <Form {...formItemLayout}>
            <Item label="商品名称" >
              {getFieldDecorator('productname', {
                initialValue: product.productname,
                rules: [
                  { required: true, whitespace: true, message: '商品名称必须输入' }
                ]
              })(<Input placeholder="请输入商品名称" />)}
            </Item>
            <Item label="EPC编码" >
              {getFieldDecorator('tagEPC', {
                initialValue: product.tagEPC,
                rules: [
                  { required: true, whitespace: true, message: 'EPC编码必须输入' }
                ]
              })(<Input placeholder="请输入商品EPC编码" />)}

            </Item>
            <Item label="HSCODE">
              {getFieldDecorator('hscode', {
                initialValue: product.hscode,
                rules: [
                  { required: true, whitespace: true, message: 'HSCODE必须输入' }
                ]
              })(<Input placeholder="请输入商品HSCODE" />)}

            </Item>
            <Item label="生产商">
              {getFieldDecorator('manufacturer', {
                initialValue: product.manufacturer,
                rules: [
                  { required: true, whitespace: true, message: '生产商必须输入' }
                ]
              })(<TextArea placeholder="请输入商品生产商" autoSize />)}
            </Item>
            <Item label="生产日期">
              {getFieldDecorator('productiondate', {
                initialValue: moment(product.productiondate),
                rules: [
                  //日期一定用设置type: 'object'，因为返回的是moment对象
                  { type: 'object', required: true, whitespace: true, message: '请选择日期'}
                ]
              })(<DatePicker placeholder='选择日期' style={{ width: '45%' }} 
              // onChange={(value,dateString)=>{value=dateString}}
              />)}
            </Item>
            <Item label="保质期">
              {getFieldDecorator('guaranteeperiod', {
                initialValue: product.guaranteeperiod,
                rules: [
                  { required: true, message: '请输入商品保质期' }
                ]
              })(<Input placeholder="请输入商品保质期" />)}
            </Item >
            <Item {...tailLayout}>
              <Button type='primary' onClick={this.submit}>提交</Button>
            </Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(ProductAddUpdate)