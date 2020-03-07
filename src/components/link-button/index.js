import React, { Component } from 'react'
import './index.less'

//像链接的按钮，处理所有不需要跳转的原生a
export default function LinkButton(props) {
  return <button {...props} className="link-botton">{props.children}</button>
}