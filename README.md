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

# 分支说明
这个分支实现了上传总大小在10mb以内的多张图片并，保存路径为根目录下的image文件夹，这个文件夹需要在clone之后手动创建，否则保存图片时会找不到相应路径。
实现图片保存的文件在api/save.js中
设置express能接受的请求数据大小的代码在build/webpack.dev.conf.js的第55行