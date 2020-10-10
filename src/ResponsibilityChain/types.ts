export interface ResHandle {
    isNext: boolean;
    nextTransaction?: any;
    [k: string]: any;
}

export type HandleFn = (transaction?: any) => Promise<unknown>;