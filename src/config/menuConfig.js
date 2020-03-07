const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品管理',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '商品详情',
        key: '/products',
        icon: 'bars'
      },
      {
        title: '碳足迹计算器',
        key: '/calculator',
        icon: 'tool'
      },
    ]
  },
  {
    title: '生产管理',
    key: '/produce',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '工厂信息',
        key: '/produce',
        icon: 'bars'
      },
      {
        title: '设备信息',
        key: '/produce',
        icon: 'tool'
      },
      {
        title: '碳足迹信息',
        key: '/producecarbon',
        icon: 'tool'
      }
    ]
  },
]

export default menuList