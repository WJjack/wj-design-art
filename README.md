### 描述
让javascript使用设计模式更简单

### 安装
`npm i wj-design-art -S`

### 使用

#### 责任链模式的使用
```javascript
import designArt from 'wj-design-art';

// 要处理的事务
const count = 1100;

// 部门处理事务的函数
function deptHandleFn(transaction: any) {
    return new Promise((resolve) => {
        setTimeout(function() {
            if(transaction >= 500) {
                console.log(transaction + '部门不能解决，给单位')
                resolve({
                    isNext: true
                });
            } else {
                resolve({
                    isNext: false
                });
            }
        }, 1000);
    });
}

// 单位处理事务的函数
function companyHandleFn(transaction: any) {
    return new Promise((resolve) => {
        setTimeout(function() {
            if(transaction >= 1000) {
                console.log(transaction + '单位不能解决，给集团');
                resolve({
                    isNext: true
                });
            } else {
                resolve({
                    isNext: false
                });
            }
        }, 1000);
    });
}

// 集团处理事务的函数
function groupHandleFn(transaction: any) {
    return new Promise((resolve) => {
        setTimeout(function() {
            console.log(transaction + '集团解决了')
            resolve({
                isNext: false
            });
        }, 1000);
    });
}

const dept = new designArt.ResChain(deptHandleFn, count);
const company = new designArt.ResChain(companyHandleFn, count);
const group = new designArt.ResChain(groupHandleFn, count);

dept.setNext(company);
company.setNext(group);

// 或者不用setNext函数，直接给定下一处理对象
// const group = new designArt.ResChain(groupHandleFn, count);
// const company = new designArt.ResChain(companyHandleFn, count, group);
// const dept = new designArt.ResChain(deptHandleFn, count, company);

dept.handle();

// 输出结果为
// 1100部门不能解决，给单位
// 1100单位不能解决，给集团
// 1100集团解决了
```
