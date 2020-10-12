### 描述
让javascript使用设计模式更简单

### 安装
`npm i wj-design-art -S`

### 使用

#### 责任链模式的API

- ResChain类

| 类 | 说明 | 入参 |
| ---- | ---- | ---- |
| ResChain | constructor(handleFn: HandleFn, transaction?: any,  next?: ResChain) | HandleFn:处理事务的函数，transaction：事务， next：下一个处理对象 |

- 实例方法或属性

| 名称 | 说明 | 入参 | 出参 |
| ---- | ---- | ---- | ---- |
| setNext | 设置下一个处理对象，setNext(next: ResChain) | next: 下一个处理对象 | void |
| handle | 开始处理事务，handle(transaction?: any) | transaction：要处理的事务 | void |

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

#### 单例模式API

| 名称 | 说明 | 入参 | 出参 |
| ---- | ---- | ---- | ---- |
| singles | 一个属性，所有的单例 | none | none |
| add | 增加单例，add(_class: any, classname: string = _class.name, ...args: any[]) | _class：类，classname：类名，...args：实例化类时的参数 | void |
| del | 删除单例，del(key: string) | key：要删除的键 | void |
| clear | 清空，clear() | none | void |

#### 单例模式的使用
```javascript
import designArt from 'wj-design-art';
const { singleCase } = designArt;

class A {
    getName() {
        return 'wj';
    }
}
class B {
    getName() {
        return 'jack';
    }
}
class C {
    public myname: string;
    constructor(name: string) {
        this.myname = name;
    }
    getName() {
        return this.myname;
    }
}
singleCase.add(A); // {A: instance}
singleCase.add(B, 'singleB'); // {A: instance, singleB: instance}
singleCase.add(C, 'singleC', 'cname'); // {A: instance, singleB: instance, singleC: instance}
const singles = singleCase.singles; // {A: instance, singleB: instance, singleC: instance}
console.log(singles.A.getName()); // wj
console.log(singles.singleB.getName()); // jack
console.log(singles.singleC.getName()); // cname
singleCase.del('A'); // {singleB: instance, singleC: instance}
singleCase.del('singleB'); // {singleC: instance}
singleCase.clear(); // {}
```

### 命令模式
#### 命令模式API

- Command 类

| 类 | 说明 | 入参 |
| Command | 命令模式类 | none |

- 实例方法

| 名称 | 说明 | 入参 | 出参 |
| --- | ---- | ---- | ---- |
| add | 添加命令， add(command: CommandItem) | command：函数或者是实现了ICommand接口的实例 | Command |
| remove | 删除命令，remove(command: CommandItem) | command：函数或者是实现了ICommand接口的实例 | Command |
| undo | 撤销命令，删除最后一次添加的命令，undo() | none | Command |
| reset | 重置命令，清空所有命令，reset() | none | Command |

#### 命令模式的使用

```javascript
import designArt from 'wj-design-art';
import { ICommand } from 'wj-design-art/lib/Command/types.d.ts';

const { Command } = designArt;

const command = new Command();

class One implements ICommand {
    execute() {
        console.log('one');
    }
}

const one = new One();

function two() {
    console.log('command two');
}

command.add(one).add(two);

command.add(function() {
    console.log('command three');
});

// one,command two,command three

command.remove(one); // command two,command three

command.undo(); // command two

command.execute(); // command two

```

### 仓库地址
<https://github.com/WJjack/wj-design-art.git>
