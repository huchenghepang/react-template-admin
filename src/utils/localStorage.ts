import { cloneDeep, merge } from "lodash";
import { UserState } from "../store/slices/userSlice";

interface LocalStorageInfo {
    token?: string;
    store?:unknown;
    user: UserState
}


type LocalStorageKey = keyof LocalStorageInfo


/**
 * 将指定的键值对存储到浏览器的本地存储中。
 *
 * @param {LocalStorageKey} key - 要存储的键。
 * @param {LocalStorageInfo[LocalStorageKey]} value - 要存储的值，类型根据键动态推导。
 */
export function setLocalStorage<K extends LocalStorageKey>(
    key: K,
    value: LocalStorageInfo[K]
) {
    localStorage.setItem(key, JSON.stringify(value));
}


/**
 * 从本地存储中获取指定键的值。
 *
 * @param {LocalStorageKey} key - 要获取的键。
 * @returns {LocalStorageInfo[LocalStorageKey]} - 返回与键对应的值。
 */
export function getLocalStorage<K extends LocalStorageKey>(
    key: K
): LocalStorageInfo[K] | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as LocalStorageInfo[K]) : null;
}


/**
 * 从本地存储中移除指定的键值对。
 *
 * @param {LocalStorageKey} key - 要移除的键。
 */
export function removeLocalStorage(key: LocalStorageKey) {
    window.localStorage.removeItem(key)
}


/**
 * 将复杂对象存储到浏览器的本地存储中。
 * 使用 lodash 来确保对象的深拷贝，避免直接引用。
 *
 * @param {LocalStorageKey} key - 要存储的键。
 * @param {LocalStorageInfo[LocalStorageKey]} value - 要存储的复杂对象。
 */
export function setComplexLocalStorage<K extends LocalStorageKey>(
    key: K,
    value: LocalStorageInfo[K]
) {

    // 使用 lodash 的 cloneDeep 进行深拷贝，确保存储的是副本而非引用
    const clonedValue = cloneDeep(value);
    // 存储深拷贝后的数据
    localStorage.setItem(key, JSON.stringify(clonedValue));
}


/**
 * 从本地存储中获取复杂对象的值。
 * 使用 lodash 的 cloneDeep 来避免引用的问题。
 *
 * @param {LocalStorageKey} key - 要获取的键。
 * @returns {LocalStorageInfo[LocalStorageKey]} - 返回与键对应的复杂对象值。
 */
export function getComplexLocalStorage<K extends LocalStorageKey>(
    key: K
): LocalStorageInfo[K] | null {
    const item = localStorage.getItem(key);

    // 如果数据存在，则进行深拷贝，确保返回的是副本而非引用
    return item ? (cloneDeep(JSON.parse(item)) as LocalStorageInfo[K]) : null;
}

/**
 * 合并本地存储中的复杂对象与新的对象。
 * 使用 lodash 的 merge 来合并数据。
 *
 * @param {LocalStorageKey} key - 要合并的键
 * @param {Partial<LocalStorageInfo[K]>} newValue - 新的数据，将合并到原有对象中
 */
export function mergeComplexLocalStorage<K extends LocalStorageKey>(
    key: K,
    newValue: Partial<LocalStorageInfo[K]>
) {
    const existingValue = getComplexLocalStorage(key);

    if (existingValue) {
        // 使用 lodash 的 merge 来合并原有对象与新对象
        const mergedValue = merge({}, existingValue, newValue);
        setComplexLocalStorage(key, mergedValue); // 存储合并后的数据
    } else {
        setComplexLocalStorage(key, newValue as LocalStorageInfo[K]); // 如果没有数据，则直接存储新的数据
    }
}

