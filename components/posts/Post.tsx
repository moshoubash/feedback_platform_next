"use client";

import { upvote, downvote } from "@/api/votes/route";

export default function Post({ post }: { post: any }) {
  function handleVote(type: string) {
    if (type == "upvote") {
      upvote(post.id);
    } else {
      downvote(post.id);
    }
  }

  return (
    <div key={post.id}>
      <h2 className="text-gray-800 text-2xl">{post.title}</h2>
      <div className="flex items-center">
        {/* upvote and downvote */}
        <button
          onClick={() => handleVote("upvote")}
          className="text-green-600 bg-green-200 hover:bg-green-300 transition-all duration-200 rounded-md text-lg my-2 px-2 cursor-pointer"
        >
          ↑
        </button>
        <span className="text-gray-600 text-lg my-2 px-2">
          {post.total_votes ?? 0}
        </span>
        <button
          onClick={() => handleVote("downvote")}
          className="text-red-600 bg-red-200 hover:bg-red-300 transition-all duration-200 rounded-md text-lg my-2 px-2 cursor-pointer"
        >
          ↓
        </button>
      </div>
      <p className="text-gray-600 text-lg my-2">{post.description}</p>
      <p className="bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-200 p-2 rounded-md w-fit text-gray-600 text-lg my-2">
        {post.category}
      </p>
      <hr className="border-gray-400 my-4" />
    </div>
  );
}
