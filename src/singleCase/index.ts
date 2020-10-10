// 单例模式

import { isClass } from '../util';

const singleCase = (function() {
    let singleObj: { [k: string]: any } = {};
    
    return {
        singles: singleObj,
        add(_class: any, classname: string = _class.name, ...args: any[]) {
            
            const singleArr = Object.values(singleObj);
            const singleKeys = Object.keys(singleObj);

            // 是否是class类
            const _isClass = isClass(_class, true);
            const hasClass = singleArr.some(v => v instanceof _class);
            const isRename = singleKeys.some(v => v === classname);
            
            if(!_isClass) { // 非类
                throw new Error('非类不能创建单例');
            } else if(isRename) { // 有重复名称
                throw new Error('单例模式名称不能重名');
            } else if(!hasClass) { // 不存在的类
                singleObj[classname] = new _class(...args);
                
                Object.defineProperty(singleObj, classname, {
                    writable: false
                });
            }
        },
        del(key: string) {
            Reflect.deleteProperty(singleObj, key);
        },
        clear() {
            for(let k in singleObj) {
                Reflect.deleteProperty(singleObj, k);
            }
        }
    }
})();

Object.defineProperty(singleCase, 'singles', {
    writable: false
});

export default singleCase;
