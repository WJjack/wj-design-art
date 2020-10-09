// 责任链模式

import { ResHandle, HandleFn } from './types';

/**
 * @description 责任链模式  ResponsibilityChain
 */
export default class ResChain {
    // 要处理的事务
    private transaction: any;
    // 处理事务的函数
    private handleFn: HandleFn;
    // 下一个处理对象
    private next: ResChain;

    constructor(handleFn: HandleFn, transaction?: any,  next?: ResChain) {
        this.transaction = transaction;
        this.handleFn = handleFn;
        this.next = next;
    }

    /**
     * @description 设置下一个处理对象
     * @param next 
     */
    setNext(next: ResChain) {
        this.next = next;
    }

    /**
     * @description 处理
     * @param transaction 
     */
    handle(transaction?: any) {
        this.transaction = transaction ?? this.transaction;

        this.handleFn.apply(this, [this.transaction]).then((res: ResHandle) => {
            if(res.isNext) {
                const nextTransaction = res.nextTransaction ?? this.transaction;

                this.next.handle(nextTransaction);
            }
        });
    }

}