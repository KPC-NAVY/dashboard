/// <reference lib="dom"/>
interface RustInvoke extends Record<string, (param?: any) => any> {
    hello_tauri: (param?: {}) => string
}
export function invoke<T extends keyof RustInvoke>(cmd: T, ...args: Parameters<RustInvoke[T]>): Promise<ReturnType<RustInvoke[T]>>
export function invoke(cmd: string, arg?: any): Promise<any>
