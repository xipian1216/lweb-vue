---
title: 系统核心 API 参考手册
summary: API 文档
author: 系统架构组
date: '2026-02-14'
category: API
tags: [文档, API, 系统]
---

# 系统核心 API 参考手册

本文档详细介绍了博客系统的内部接口调用规范。

## 认证接口 `POST /api/v1/login`

用户通过此接口获取身份令牌。

### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
| :--- | :--- | :--- | :--- |
| `username` | `string` | 是 | 用户唯一账号 |
| `password` | `string` | 是 | 经过加密的字符串 |
| `mfa_token` | `string` | 否 | 二次验证码 |

### 响应示例

```json
{
  "code": 200,
  "data": {
    "token": "eyJh...etc",
    "expires_in": 3600
  },
  "message": "success"
}