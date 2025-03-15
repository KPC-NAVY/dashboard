/// <reference lib="dom"/>
interface RustInvoke extends Record<string, (param?: any) => any> {
    greet: (param: { name: string }) => string
}
export function invoke<T extends (keyof RustInvoke | string)>(cmd: T, ...args: T extends keyof RustInvoke ? Parameters<RustInvoke[T]> : any): Promise<T extends keyof RustInvoke ? ReturnType<RustInvoke[T]> : any>

