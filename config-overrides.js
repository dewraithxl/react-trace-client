const { override, fixBabelImports,addLessLoader }=require('customize-cra');

module.exports = override(
    //针对antd实现按需导入：根据import来打包（使用babel-plugin-import）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#4f6db6'}
    })
);