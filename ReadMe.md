# File-Transfer-System

***文件传输系统***

----

**项目简介：**

* 该项目用于往服务器传输文件
* 鉴于有时需要往不同服务器上传输文件，尤其部分Windwos Server远程时并不友好
* （对于没有服务器使用经验的人来说，远程 windows 过于麻烦，且对网速有一定要求使用， FTP 的使用也需要一定的经验，而且部分windows服务器是无法远程的！ ）
* 本项目就是为了方便文件上传，直接通过浏览器上传问文件
* 本项目基于nodeJS ，express库作为服务端
* 项目只实现了功能，前端界面处于半成品，使用请自行开发前端界面

**程序依赖：**

* 数据库：Mysql 8 
* 服务器：node  
```shell
# 安装包依赖
npm install --save
```

*(如果你不需要数据库，只需要将Ajax部分注释掉即可)*

**数据库配置**：

* db文件夹下 ，db.config.js 配置mysql数据库信息
* ftps.sql 是建表语句

**运行程序**

```shell
node app
```

**访问地址**

> http://localhost:3000/