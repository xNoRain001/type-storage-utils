## 介绍

带类型的本地存储，同时还提供设置过期时间，支持的数据类型有：

  - string

  - number 

  - boolean 

  - null 

  - undefined 

  - array

  - object

  - date

## 下载

### npm

```
npm i type-storage-utils
```

### src

```html
<script src="../dist/type-storage-utils.js"></script>
```

## 使用

```javascript
// npm
import { localStorage, sessionStorage } from 'type-storage-utils'

// src
const { localStorage, sessionStorage } = typeStorage
```

## APIs

### setItem

```javascript
/**
 * 设置本地存储，支持设置过期时间，当访问过期的数据时，会返回 null。
 * 
 * @param {string} key - 键名
 * @param {*} value - 键值
 * @param {(number|Date)} [expiredTime] - 过期时间，接收数字或日期
 *  - 数字 60 代表将在一分钟后过期
 *  - 日期 Sun Jul 24 2022 12:54:33 GMT+0800 (中国标准时间) 代表将在这个时间过期
 */
localStorage.setItem('foo', { bar: 'bar' }, 60)
```

### getItem

```javascript
/**
 * 获取本地存储 
 * 
 * @param {string} key - 键名
 * @returns {*} 键值
 */
const value = localStorage.getItem('foo') // output: { bar: 'bar' }
Object.prototype.toString.call(value) // output: [object Object]
```

### removeItem

```javascript
/**
 * 清除指定键名的本地存储 
 * 
 * @param {string} key - 键名
 */
localStorage.removeItem('foo')
```

### clear

```javascript
/** 清除所有的本地存储 */
localStorage.clear()
```

### used

```javascript
/**
 * 查询已使用的存储容量
 * 
 * @returns {string} 返回已使用的存储容量
 */
localStorage.used() // 0.000045%
```
