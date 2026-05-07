const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_API_URL) {
  console.warn("NEXT_PUBLIC_BACKEND_URL is not defined");
}

import { getStorageItem } from "@/lib/storage";

// export async function getPosts() {
//     const res = await fetch(`${BACKEND_API_URL}/posts`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//     });
//     const posts = await res.json();
//     return posts;
// }

export async function getPostsForAuthenticatedUsers() {
    const token = await getStorageItem('token');

    // if(!token) {
    //     return getPosts();
    // }
    const res = await fetch(`${BACKEND_API_URL}/posts/get-posts-for-authenticated-users`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const posts = await res.json();

    console.log(posts);

    return posts;
}

export async function createPost({ title, description, category }: { title: string; description: string, category: string}) {
    const token = await getStorageItem('token');
    const res = await fetch(`${BACKEND_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, category }),
    });
    const post = await res.json();
    return post;
}

export async function updatePost({ slug, title, description, category }: { slug: string; title: string; description: string; category: string }) {
    const token = await getStorageItem('token');
    const res = await fetch(`${BACKEND_API_URL}/posts/${slug}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, category }),
    });
    const post = await res.json();
    return post;
}

export async function deletePost({ slug }: { slug: string }) {
    const token = await getStorageItem('token');
    const res = await fetch(`${BACKEND_API_URL}/posts/${slug}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const post = await res.json();
    return post;
}

export async function getPost({ slug }: { slug: string }) {
    const res = await fetch(`${BACKEND_API_URL}/posts/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const post = await res.json();
    return post;
}

export async function getPostVotes(slug: string) {
    const res = await fetch(`${BACKEND_API_URL}/posts/${slug}/votes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const votes = await res.json();
    return votes;
}