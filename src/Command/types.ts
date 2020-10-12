export interface ICommand {
    execute: () => any;
    [k: string]: any;
}

export type CommandItem = ICommand | ICommand['execute'];