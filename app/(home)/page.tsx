"use client";

import * as client from "./client";
import { useEffect, useReducer, useState } from "react";
import Post from "./post";
import AboutPage from "./about";
import ProfilePage from "./profile/page";


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
    <div id="home" className="container-fluid">
      <AboutPage />
      <h2 className="mb-4 text-center">Recent Posts</h2>

      {posts.map((post: any) => (
        <div key={post._id} >
          <Post {...post} onDelete={handlePostDeleted} />
        </div>
      ))}
    </div>
  );
}
