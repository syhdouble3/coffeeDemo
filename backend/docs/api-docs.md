# 后端API接口文档

## 目录
- [基础信息](#基础信息)
- [认证接口](#认证接口)
- [菜单管理接口](#菜单管理接口)
- [数据结构](#数据结构)
- [错误码说明](#错误码说明)
- [调用示例](#调用示例)

## 基础信息

- 接口基础路径: `http://localhost:8082/api`
- 服务端口: 8082
- 认证方式: Bearer Token
- 数据格式: JSON
- 字符编码: UTF-8
- 跨域支持: 已配置,支持localhost:3000域名访问

### 全局请求头
需要认证的接口都需要在请求头中携带token:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 全局响应格式
```json
{
    "data": {},      // 响应数据
    "message": "",   // 响应消息
    "status": 200    // 状态码
}
```

## 认证接口

### 1. 用户注册
- **接口路径**: POST /api/auth/register
- **接口描述**: 新用户注册
- **请求体**:
```json
{
    "username": "string",  // 必填,用户名
    "password": "string",  // 必填,密码
    "email": "string"      // 必填,邮箱地址
}
```
- **验证规则**:
  - username: 不能为空
  - password: 不能为空
  - email: 不能为空,必须是有效的邮箱格式
- **响应体**:
```json
{
    "token": "string",     // JWT令牌
    "message": "string"    // 响应消息
}
```

### 2. 用户登录
- **接口路径**: POST /api/auth/login
- **接口描述**: 用户登录获取token
- **请求体**:
```json
{
    "username": "string",  // 必填,用户名
    "password": "string"   // 必填,密码
}
```
- **验证规则**:
  - username: 不能为空
  - password: 不能为空
- **响应体**:
```json
{
    "token": "string",     // JWT令牌
    "message": "string"    // 响应消息
}
```

## 菜单管理接口

### 1. 创建菜单
- **接口路径**: POST /api/menus
- **接口描述**: 创建新菜单
- **权限要求**: ADMIN角色
- **请求体**:
```json
{
    "name": "string",      // 必填,菜单名称,最大长度100
    "sort": number,        // 可选,排序号
    "parentId": number,    // 可选,父级菜单ID
    "path": "string",      // 可选,路由路径,最大长度200
    "code": "string",      // 必填,菜单编号,最大长度50
    "remark": "string"     // 可选,备注,最大长度500
}
```
- **验证规则**:
  - name: 不能为空,最大长度100
  - code: 不能为空,最大长度50
  - path: 最大长度200
  - remark: 最大长度500
- **响应体**: 返回MenuResponse对象

### 2. 更新菜单
- **接口路径**: PUT /api/menus/{id}
- **接口描述**: 更新现有菜单
- **权限要求**: ADMIN角色
- **路径参数**:
  - id: 菜单ID
- **请求体**: 同创建菜单
- **响应体**: 返回MenuResponse对象

### 3. 删除菜单
- **接口路径**: DELETE /api/menus/{id}
- **接口描述**: 删除指定菜单
- **权限要求**: ADMIN角色
- **路径参数**:
  - id: 菜单ID
- **响应**: 200 OK

### 4. 获取菜单树
- **接口路径**: GET /api/menus/tree
- **接口描述**: 获取层级结构的菜单树
- **权限要求**: 已认证用户
- **响应体**: 返回MenuResponse数组,包含层级结构

### 5. 获取菜单列表
- **接口路径**: GET /api/menus
- **接口描述**: 获取所有菜单列表
- **权限要求**: 已认证用户
- **响应体**: 返回MenuResponse数组

### 6. 获取单个菜单
- **接口路径**: GET /api/menus/{id}
- **接口描述**: 获取指定菜单详情
- **权限要求**: 已认证用户
- **路径参数**:
  - id: 菜单ID
- **响应体**: 返回MenuResponse对象

## 数据结构

### MenuResponse
```json
{
    "id": number,           // 菜单ID
    "name": "string",       // 菜单名称
    "sort": number,         // 排序号
    "parentId": number,     // 父级菜单ID
    "parentName": "string", // 父级菜单名称
    "children": [],         // 子菜单列表
    "path": "string",       // 路由路径
    "code": "string",       // 菜单编号
    "remark": "string",     // 备注
    "createTime": "string", // 创建时间
    "updateTime": "string"  // 更新时间
}
```

## 错误码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未认证或token已过期 |
| 403 | 没有权限访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 调用示例

### 1. 用户登录
```javascript
// 登录请求
const response = await axios.post('http://localhost:8082/api/auth/login', {
    username: 'admin',
    password: '123456'
});

// 保存token
const token = response.data.token;
localStorage.setItem('token', token);

// 设置全局请求头
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### 2. 获取菜单树
```javascript
const response = await axios.get('http://localhost:8082/api/menus/tree', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const menuTree = response.data;
```

### 3. 创建菜单
```javascript
const response = await axios.post('http://localhost:8082/api/menus', {
    name: '系统管理',
    sort: 1,
    code: 'system',
    path: '/system',
    remark: '系统管理模块'
}, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
```

## 注意事项

1. 认证相关
   - 除了注册和登录接口,其他所有接口都需要在请求头中携带token
   - token格式为:Bearer + 空格 + token字符串
   - token有效期为24小时

2. 权限相关
   - 菜单管理的修改操作(创建/更新/删除)需要ADMIN角色
   - 菜单查询接口只需要用户已认证即可访问

3. 跨域支持
   - 后端已配置CORS,支持localhost:3000域名访问
   - 如需支持其他域名访问,需要修改SecurityConfig中的配置

4. 接口响应
   - 所有接口都使用JSON格式返回数据
   - 请求失败时会返回错误信息和对应的HTTP状态码
