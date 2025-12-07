"use client";

import * as client from "./client";
import { useEffect, useReducer, useState } from "react";
import Post from "./post";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
    const data = await client.getAllPosts();
    setPosts(data);
  }

  const handlePostDeleted = (deletedId: string) => {
    setPosts(prev => prev.filter(p => p._id !== deletedId));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (

    <div id="home" className="d-flex flex-column flex-md-row vh-100">
      <div id="post-list" className="w-100 w-md-50 flex-grow-1 p-4 overflow-y-auto">
        <h2 className="mb-4">Recent Posts</h2>
        {posts.map((post: any) => (
          <div key={post._id} >
            <Post {...post} onDelete={handlePostDeleted} />

          </div>
        ))}
      </div>
    </div>
  );
}
