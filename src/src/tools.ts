export function omit<T, K extends keyof T>(params: T, keys: K[]): Omit<T, K> {
    const newObj = { ...params };
    for (const key of keys) {
        delete newObj[key]
    }
    return newObj
}