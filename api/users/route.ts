const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_API_URL) {
  console.warn("NEXT_PUBLIC_BACKEND_URL is not defined");
}

const getStorageItem = (key: string) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

const setStorageItem = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
};

const removeStorageItem = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export async function login({ email, password }: { email: string; password: string }) {
    const res = await fetch(`${BACKEND_API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const user = await res.json();

    setStorageItem('token', user.token);
    setStorageItem('user', JSON.stringify(user));

    if(!user.message){
        window.location.href = "/";
    }

    return user;
}

export async function register({ name, email, password, password_confirmation }: { name: string; email: string; password: string; password_confirmation: string }) {
    const res = await fetch(`${BACKEND_API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
    });
    const user = await res.json();

    setStorageItem('token', user.token);
    setStorageItem('user', JSON.stringify(user));

    if(!user.errors){
        window.location.href = "/";
    }

    return user;
}

export async function userProfile() {
    const res = getStorageItem('user');
    return res;
}

export async function logout() {
    const token = getStorageItem('token');
    const res = await fetch(`${BACKEND_API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    removeStorageItem('token');
    removeStorageItem('user');
    
    window.location.href = "/";

    return res.json();
}
    