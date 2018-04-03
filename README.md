# figure

> A plug-in that can upload more than one picture

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 项目说明
一个多图上传组件

# 线上地址
[figure.wopelo.la](http://figure.wopelo.la)

# 目录说明

## api
后端接口

## prod.server.js
打包好的项目的启动文件

# 相关操作

``` bash
# 下载依赖
npm install --save-dev

# 热重载 端口8080
npm run dev

# build项目
npm run build

# 运行打包好的项目 端口81
node prod.server.js

# 完整项目
master分支中仅实现了图片选择、预览、删除功能，complete分支实现了图片上传到后端并保存，具体信息请查看complete分支的README.md文件