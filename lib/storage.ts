import Cookies from 'js-cookie';

export async function getStorageItem(key: string): Promise<string | null | undefined> {
    if (typeof window !== 'undefined') {
        return Cookies.get(key);
    }
    
    try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        return cookieStore.get(key)?.value;
    } catch (error) {
        console.error('Error accessing cookies on server:', error);
        return null;
    }
}

export function setStorageItem(key: string, value: string) {
    if (typeof window !== 'undefined') {
        Cookies.set(key, value, { expires: 1 });
    }
}

export function removeStorageItem(key: string) {
    if (typeof window !== 'undefined') {
        Cookies.remove(key);
    }
}
