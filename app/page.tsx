import { getPosts } from "../api/posts/route";
import Post from "@/components/posts/Post";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="text-gray-800 text-4xl">Posts</h1>
      <p className="text-gray-600 text-lg my-2">
        Here you can find all the posts that have been shared by users.
      </p>
      <hr className="border-gray-400 my-2" />

      {/* list of posts */}
      {posts.data
        .sort((a: any, b: any) => b.total_votes - a.total_votes)
        .map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
    </>
  );
}
