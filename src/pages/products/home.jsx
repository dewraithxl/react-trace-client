import React, { Component } from 'react'
import { Card, Select, Input, Icon, Button, Table, message } from 'antd';
import { reqProducts, reqProducts2, reqSearchProducts } from '../../api'
import LinkButton from '../../components/link-button'
const { Option } = Select;
//商品home路由组件
export default class ProductHome extends Component {
  state = {
    products: [],
    searchName: '',//搜索关键字
    searchType: 'productname'//搜索类型
  }
  //获取所有商品
  getProducts = async () => {
    const { searchName, searchType } = this.state
    let result
    if (searchName) {
      result = await reqSearchProducts(searchName)
    } else {
      result = await reqProducts()
    }
    if (result.status === 0) {
      const products = result.message
      this.setState({ products })
    } else {
      message.error('获取数据失败')
    }
  }
  //分页获取所有商品，后台无对应接口
  getProducts2 = (pageNum) => {
    const result = reqProducts2(pageNum, 5)
    if (result.status === 0) {
      const { total, list } = result.message
      this.setState({
        total,
        products: list
      })
    }
  }
  //初始化所有列
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'productname',
        key: 'productname',
      },
      {
        title: 'EPC',
        dataIndex: 'tagEPC',
        key: 'tagEPC',
      },
      {
        title: '生产日期',
        dataIndex: 'productiondate',
        key: 'productiondate',
      },
      {
        title: '生产商',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
      },
      {
        title: '碳足迹总量',
        dataIndex: 'carbonfpall',
        key: 'carbonfpall',
      },
      {
        title: '操作',
        render: (product) => (
          <span>
            <LinkButton onClick={()=>this.props.history.push('/products/detail',product)}>查看详情</LinkButton>
            <LinkButton onClick={()=>this.props.history.push('/products/addupdate',product)}>修改</LinkButton>
          </span>
        )
      },
    ]
  }
  //为第一次render准备数据
  componentWillMount() {
    this.initColumns()
  }
  //执行异步任务，发异步ajax请求
  componentDidMount() {
    this.getProducts()
  }
  render() {
    const { products, searchType, searchName } = this.state
    const title = (
      <span>
        <Select value={searchType} onChange={value => this.setState({ searchType: value })}>
          <Option value="productname">按名称搜索</Option>
          <Option value="tagEPC">按EPC搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0px 10px' }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type='primary' onClick={this.getProducts}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={()=>{this.props.history.push('/products/addupdate')}}>
        <Icon type='plus' />
        添加
      </Button>
    )
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            dataSource={products}
            columns={this.columns}
            rowKey='productId'
          />
        </Card>
      </div>
    )
  }
}