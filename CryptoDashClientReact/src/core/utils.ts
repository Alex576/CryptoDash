import { Regex } from "lucide-react";

export function tryParse<T>(json: string | null): T | null {
    if (!json) return null;
    try {
        return JSON.parse(json) as T;
    } catch (error) {
        console.error("Failed to parse json", error);
        return null;
    }
}

export function isEquals(obj1: unknown, obj2: unknown): boolean {
    if (Object.is(obj1, obj2)) {
        return true;
    }

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        return isEqualArray(obj1, obj2);
    }
    if (Array.isArray(obj1) || Array.isArray(obj2)) {
        return false;
    }

    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }
    if (obj1 instanceof Regex && obj2 instanceof Regex) {
        return obj1.toString() === obj2.toString();
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let i = 0; i < keys1.length; i++) {
        if (!isEquals((obj1 as Record<string, unknown>)[keys1[i]], (obj2 as Record<string, unknown>)[keys1[i]])) {
            return false;
        }

    }
    return true;
}

export function isEqualArray(arr1: unknown[], arr2: unknown[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    arr1.sort();
    arr2.sort();
    for (let i = 0; i < arr1.length; i++) {
        if (!isEquals(arr1[i], arr2[i])) {
            return false;
        }
    }
    return true;
}