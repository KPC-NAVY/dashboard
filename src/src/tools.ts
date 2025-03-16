export function omit<T, K extends keyof T>(params: T, keys: K[]): Omit<T, K> {
    const newObj = { ...params };
    for (const key of keys) {
        delete newObj[key]
    }
    return newObj
}

export function create<K extends string, V = any>(keys: K[], value?: V): Record<K, V> {
    const newObj: any = {};
    keys.flatMap((k) => {
        newObj[k] = value ?? {};
    })
    return newObj
}