export async function calculateHash(value: string): Promise<string> {
    var encoder = new TextEncoder().encode(value);
    var buffer = await crypto.subtle.digest('SHA-256', encoder);
    return Array.from(new Uint8Array(buffer)).map(x => x.toString(16).padStart(2, '0')).join('');
}

export function isEqual(obj1: unknown, obj2: unknown): boolean {
    if (obj1 === obj2) {
        return true;
    }

    if (typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const o1 = obj1 as Record<string, unknown>;
    const o2 = obj2 as Record<string, unknown>;

    if (o1.constructor !== o2.constructor) {
        return false;
    }

    if (o1 instanceof Date && o2 instanceof Date) {
        return o1.getTime() === o2.getTime();
    }

    if (o1 instanceof Set && o2 instanceof Set) {
        if (o1.size !== o2.size) return false;

        for (const item1 of o1) {
            let hasMatch = false;
            for (const item2 of o2) {
                if (isEqual(item1, item2)) {
                    hasMatch = true;
                    break;
                }
            }
            if (!hasMatch) return false;
        }
        return true;
    }

    if (o1 instanceof Map && o2 instanceof Map) {
        if (o1.size !== o2.size) return false;

        for (const [key1, value1] of o1.entries()) {
            let foundKey2: unknown = undefined;
            for (const key2 of o2.keys()) {
                if (isEqual(key1, key2)) {
                    foundKey2 = key2;
                    break;
                }
            }

            if (foundKey2 === undefined) return false;
            if (!isEqual(value1, o2.get(foundKey2))) return false;
        }
        return true;
    }

    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(o2, key)) {
            return false;
        }

        if (!isEqual(o1[key], o2[key])) {
            return false;
        }
    }

    return true;
}
