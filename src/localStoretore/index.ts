import { LocalStoreKey } from '../lib/types'

export function getLocalStoreData<T>(key: LocalStoreKey): T | null {
    try {
        const data = localStorage.getItem(key)
        return data === null ? data : (JSON.parse(data) as T)
    } catch (_error) {
        return null
    }
}

export function setLocalStoreData<T>(key: LocalStoreKey, data: T): void {
    try {
        const dataString = JSON.stringify(data)
        localStorage.setItem(key, dataString)
    } catch (_error) {
        return
    }
}

export function removeLocalStoreData(key: LocalStoreKey): void {
    try {
        localStorage.removeItem(key)
    } catch (_error) {
        return
    }
}