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

export async function upvote(request: Request) {
    const token = getStorageItem('token');
    const { postId } = await request.json();
    const response = await fetch(`${BACKEND_API_URL}/posts/${postId}/upvote`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log("upvote", data);
    return Response.json(data);
}

export async function downvote(request: Request) {
    const token = getStorageItem('token');
    const { postId } = await request.json();
    const response = await fetch(`${BACKEND_API_URL}/posts/${postId}/downvote`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log("downvote",data);
    return Response.json(data);
}
