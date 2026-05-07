const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_API_URL) {
  console.warn("NEXT_PUBLIC_BACKEND_URL is not defined");
}

import { getStorageItem } from "@/lib/storage";

export async function upvote(postId:string) {
    const token = await getStorageItem('token');
    if(!token){
        window.location.href = "/login";
    }
    const response = await fetch(`${BACKEND_API_URL}/posts/${postId}/upvote`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (typeof window !== 'undefined') {
        window.location.reload();
    }
    return Response.json(data);
}

export async function downvote(postId:string) {
    const token = await getStorageItem('token');
    if(!token){
        window.location.href = "/login";
    }
    const response = await fetch(`${BACKEND_API_URL}/posts/${postId}/downvote`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (typeof window !== 'undefined') {
        window.location.reload();
    }
    return Response.json(data);
}
