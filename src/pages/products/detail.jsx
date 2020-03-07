import React, { Component } from 'react'
import { Card, Icon, Button, List } from 'antd';
import LinkButton from '../../components/link-button'

const Item = List.Item
export default class ProductDetail extends Component {
  render() {
    const product = this.props.location.state;
    const {productname,tagEPC,hscode,productiondate,guaranteeperiod,manufacturer,carbonfpall} = product
    const title = (
      <LinkButton>
        <span>
          <Icon onClick={()=>{this.props.history.goBack()}} type="arrow-left" style={{ color: '#4f6db6', marginRight: 10, fontSize: 20 }}></Icon>
          商品详情
        </span>
      </LinkButton>
    )
    return (
      <div>
        <Card title={title} className="product-detail">
          <List split itemLayout="vertical">
            <Item>
              <span className="left">商品名称:</span>
              <span>{productname}</span>
            </Item>
            <Item>
              <span className="left">EPC编码:</span>
              <span>{tagEPC}</span>
            </Item>
            <Item>
              <span className="left">HSCODE:</span>
              <span>{hscode}</span>
            </Item>
            <Item>
              <span className="left">生产日期:</span>
              <span>{productiondate}</span>
            </Item>
            <Item>
              <span className="left">保质期:</span>
              <span>{guaranteeperiod}</span>
            </Item>
            <Item>
              <span className="left">生产商:</span>
              <span>{manufacturer}</span>
            </Item>
            <Item>
              <span className="left">碳足迹总量:</span>
              <span>{carbonfpall}</span>
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}