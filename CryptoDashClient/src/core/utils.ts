export function tryParse<T>(json: string | null): T | null {
    if (!json) return null;
    try {
        return JSON.parse(json) as T;
    } catch (error) {
        console.error("Failed to parse json", error);
        return null;
    }
}