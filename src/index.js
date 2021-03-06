//入口js
import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import App from './app'

import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

//读取local中的数据
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(<App />, document.getElementById('root'))
  