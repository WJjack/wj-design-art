// 命令模式

import { ICommand, CommandItem } from './types';
import { instanceofCommand } from '@/util';

export default class Command implements ICommand {
    private commandArr: CommandItem[] = [];

    constructor() {}

    add(command: CommandItem) {
        this.commandArr.push(command);
        return this;
    }

    remove(command: CommandItem) {
        for(let i = 0; i < this.commandArr.length; i++) {
            if(this.commandArr[i] === command) {
                this.commandArr.splice(i, 1);
            }
        }
        return this;
    }

    undo() {
        this.commandArr.pop();
        return this;
    }

    reset() {
        this.commandArr = [];
        return this;
    }

    execute() {
        this.commandArr.forEach((command, index) => {
            if(instanceofCommand(command)) {
                if(command.execute) {
                    command.execute();
                } else {
                    throw new Error('该类不存在execute方法');
                }
            } else if(typeof command === 'function') {
                command();
            } else {
                throw new Error('不符合命令模式的规则，要么是函数，要么是实现了ICommand接口的实例');
            }
        });
    }
}