## Unreleased

[null]

## 2.3.0 (11-13, 2018)

* 更新 Engine 版本（[v1.6.0](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#160-11-07-2018) & [v1.7.0](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#170-11-13-2018)）
* 修复 个别 Windows 机器安装时无法兼容 bin 名称带冒号问题
  * `lf:eslint` 重名为 `lf-eslint`
  * `legoflow:eslint` 重名为 `legoflow-eslint`
  * `lf:ci` 重名为 `lf-ci`
  * `legoflow:ci` 重名为 `legoflow-ci`

**注意** 内部构建环境 CI Docker 兼容 `lf:ci`

## 2.2.0 (11-06, 2018)

* 更新 Engine [v1.5.0](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#150-11-02-2018)

## 2.1.0 (10-23, 2018)

* 更新 Engine [v1.4.0](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#140-10-22-2018)

## 2.0.3 (10-18, 2018)

* 更新 Engine [v1.2.0](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#120-10-18-2018)

## 2.0.2 (09-25, 2018)

* 更新 Engine [v1.0.1](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#101-09-25-2018)
  * 修复构建 dll 工作流缺少扩展通用配置问题

## 2.0.1 (09-05, 2018)

* 更新 Engine [v0.0.53](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0053-09-5-2018)
  * 修复 JS 复合使用模块导出语法问题

## 2.0.0 (09-05, 2018)

* 更新 Engine [v0.0.52](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0052-09-5-2018)
  * 主要更新 Babel@7.0.0
* 增加 新建项目参数
* 增加 可获取新建项目类型
* 优化 版本检查改为通过 CNPM 源，加速获取新版本数据

## 2.0.0-beta.31 (08-10, 2018)

* 增加 **`lf path`** 查询安装觉得路径
* 增加 标识 `from:ci`，方便可从 Shell 模块中通过该字段判断通过 CI 构建
* 升级 Engine [v0.0.50](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0050-08-09-2018)

## 2.0.0-beta.30 (08-03, 2018)

* 升级 Engine [v0.0.49](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0049-08-03-2018)
* 优化 初始化项目类型 ( Vue.js / Vue.ts )
  * 默认增加 npm scripts
    * `npm run eslint` 检查 src 文件夹下代码 eslint 规范
    * `npm run eslint:fix` 修复 src 文件夹下代码 eslint 规范
  * 默认加入低版本 Android 兼容方案
    * 暴露全局 Promise
    * 配置 webpack{ VueChunkStyle: false }
  * 默认将 var.scss 配置为全局作用域
    * webpack{ sass.globalResources: [ ./src/style/var.scss ] }
    * 再无需在 vue 文件 style 标签下 `@import "~var.scss"`

## 2.0.0-beta.29 (07-26, 2018)

* 增加 CI 构建指定环境
* 升级 Engine [v0.0.48](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0048-07-26-2018)
  * 通过 npm 安装 cli 的方式，在 Windows / Linux 复杂环境下，会导致各类安装失败问题。为了避免这样类似的情况发生，重构 override 重载模块的调用安装方法，适配 [Yarn](https://yarnpkg.com/zh-Hans/) 全局安装策略方式 **`yarn global add legoflow-cli`**

## 2.0.0-beta.28 (07-17, 2018)

* 升级 Engine [v0.0.47](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0047-07-20-2018)
* 升级 Project，修复新建项目 Vue.js 项目类型脚手架依赖多余模块问题
* 升级 Project，修复新建项目 “作为源路径” 新建完成时，提示错误问题

## 2.0.0-beta.27 (07-17, 2018)

* 升级 Project & Config，支持[可创建 NPM LegoFlow 模板类型项目](https://legoflow.com/wiki/#%E8%87%AA%E5%AE%9A%E4%B9%89-npm-%E4%BB%93%E5%BA%93%E6%A8%A1%E6%9D%BF%E7%B1%BB%E5%9E%8B)

## 2.0.0-beta.26 (07-07, 2018)

* 增加 动态更新超时提示
* 更新 Engine [v0.0.45](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0045-07-09-2018)

## 2.0.0-beta.25 (07-06, 2018)

* 更新 Engine [v0.0.44](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0044-07-06-2018)

## 2.0.0-beta.24 (07-03, 2018)

* 增加 未定义命名错误信息提示
* 修复 v1 迁移 v2 配置 `hot` 字段
* 更新 Engine [v0.0.43](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0043-07-03-2018)

## 2.0.0-beta.23 (06-27, 2018)

* 更新 Engine [v0.0.42](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0042-06-27-2018)

## 2.0.0-beta.21 (06-24, 2018)

* 修复 `lf:eslint` 在 Linux 平台 `cnpm` 安装后 bin/eslint 不存在问题

## 2.0.0-beta.20 (06-22, 2018)

* 增加 `lf:eslint` 调用 [ESLint 模块](http://eslint.cn/docs/user-guide/command-line-interface)
* 更新 Engine [v0.0.39](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0039-06-22-2018)

## 2.0.0-beta.19 (06-20, 2018)

* 升级 Engine [v0.0.38](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0038-06-20-2018)
* 优化 新建项目提问
* 修复 `build:dll` `env<[object Object]> undefined` 问题
* 修复 端口被占用问题

## 2.0.0-beta.18 (06-19, 2018)

* 升级 Engine [v0.0.37](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0037-06-19-2018)
* 优化 升级提示逻辑
* 升级 Project，Vue.js 脚手架改为采用 Webpack Mode 形式

## 2.0.0-beta.17 (06-14, 2018)

* 主要更新提供 CI 模块，支持持续构建

## 2.0.0-beta.16 (06-11, 2018)

* 升级 Engine [v0.0.32](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0032-06-11-2018)
* 优化 Vue.ts 脚手架项目

## 2.0.0-beta.14 (06-07, 2018)

* 修复 autoOpenChrome 问题
* 升级 Engine [v0.0.31](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0031-06-07-2018)

## 2.0.0-beta.13 (06-04, 2018)

* 更新 Project，脚手架项目接入 [Standard](https://standardjs.com/rules-zhcn.html) 标准

## 2.0.0-beta.12 (06-04, 2018)

* 升级 Engine [v0.0.30](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0030-06-04-2018)
* 增加 Vue.ts 项目

## 2.0.0-beta.11 (05-22, 2018)

* 升级 Engine [v0.0.25](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0025-05-22-2018)

## 2.0.0-beta.9 (05-14, 2018)

* 升级 Engine [v0.0.23](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0023-05-14-2018)
* 修复 创建项目时选择源路径问题

## 2.0.0-beta.8 (05-10, 2018)

* 升级 Project，支持自定义项目类型

## 2.0.0-beta.7 (05-09, 2018)

* 增加 开发或构建时指定或选择环境
* 升级 Engine [v0.0.22](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0022-05-09-2018)

## 2.0.0-beta.2 (05-04, 2018)

* 修复 工作流启动失败
* 优化 v1 迁移功能 **migrate:v2**

## 2.0.0-beta.1 (05-03, 2018)

* 升级 Engine [v0.0.18](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0018-05-03-2018)

## 2.0.0-beta.0 (04-28, 2018)

* 同步公布 beta.0 版本

## 0.0.6 (04-27, 2018)

* 修复 Webpack 端口检查递增
* 增加 通过端口号关闭进程

## 0.0.5 (04-27, 2018)

* 升级 Engine [v0.0.17](https://github.com/legoflow/engine/blob/master/CHANGELOG.md#0017-04-27-2018)
* 修复 新建项目未创建 "图片" 文件夹

## 0.0.4 (04-26, 2018)

* 更新 Engine，升级 Babel 7 版本
* 更新 dependencies 依赖
* 修复 Windows 兼容性问题

## 0.0.3 (04-24, 2018)

* 增加全局设置，与客户端共享配置
* 提供 “迁移” 功能，通过该功能对 v1.x 项目进行迁移到 v2.x 版本
