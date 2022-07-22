## 介绍

带类型的本地存储，支持：

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
 * 设置本地存储
 * 
 * @param {string} key - 键名
 * @param {*} value - 键值
 */
localStorage.setItem('foo', { bar: 'bar' })
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
