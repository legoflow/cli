<h1 align="center"> legoflow-cli </h1>

<p align="center">
    <a href="https://opensource.org/licenses/MIT">
        <img alt="Licence" src="https://img.shields.io/badge/license-MIT-green.svg" />
    </a>
    <a href="">
        <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg" />
    </a>
</p>

<p align="center">
    <strong>命令行工具</strong>
</p>

## 最近更新

**[CHANGELOG](./CHANGELOG.md)**

## 依赖

* Node.js >= **8.x**

## 安装

```
npm i legoflow-cli -g
```

## 使用

### 查看命令

```
legoflow -h

lf -h
```

### 新建项目

```shell
legoflow init

# 使用简写
lf init
```

### 开发

```shell
# 进入 legoflow 项目
cd test

lf dev

# 可选择环境
lf dev --env

# 可指定环境
lf dev test
```

### 构建

```shell
# 进入 legoflow 项目
cd test

lf build

# 可选择环境
lf build --env

# 可指定环境
lf build preview
```

### 构建 dll

```shell
lf build:dll
```

### 全局设置

```shell
# 设置参数
lf set <name> <value>

# 查看参数
lf get <name>

# 还原参数
lf clean
```

具体参数参考 [这里](https://github.com/legoflow/config)

### v1.x 项目迁移到 v2.x

```shell
cd test

lf migrate:v2
```

**注意** 该功能只能把 v1.x 与 v2.x 都存在的功能进行迁移，若 2.x 摒弃的功能无法被迁移。例如：

* v1.x 项目配置中的 `assets` 被迁移为 `workflow.build{ 'html.resourcesDomain' }`
* v1.x 项目配置中的 `dist` / `vue@2.1` / ... 则无法被迁移

具体功能对比参考 [这里](https://github.com/legoflow/legoflow/issues/12)

### 关闭指定端口线程

```shell
lf kill:port 6701
```

### 调用内置 ESLint 模块

通过该命令可调用内置的 [ESLint 模块](http://eslint.cn/docs/user-guide/command-line-interface)

```shell
lf:eslint

lf:eslint -v
lf:eslint -h
lf:eslint ...
```

## 许可

[MIT](./LICENSE)
