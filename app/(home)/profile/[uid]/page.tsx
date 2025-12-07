"use client";

import { use, useEffect, useState } from "react";
import * as client from "../../client";
import Post from "../../post";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import { setCurrentUser } from "../../accountReducer";

export default function ProfilePage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = use(params);
  const [posts, setPosts] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.account);

  const fetchPosts = async () => {
    const data = await client.getPostsByUserId(uid);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [uid]);

  const handlePostDeleted = (deletedId: string) => {
    setPosts(prev => prev.filter(p => p._id !== deletedId));
  };

  const dispatch = useDispatch();
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
  }

  if (currentUser?._id == uid) {
    return (
      <div>
        <h1>My Profile</h1>
        <button onClick={signout}>signout</button>


        <div id="post-list" className="w-100 w-md-50 flex-grow-1 p-4 overflow-y-auto">
          <h2 className="mb-4">Recent Posts</h2>

          {posts.map((post: any) => (
            <div key={post._id} className="mx-auto mb-3" style={{ maxWidth: "24rem" }}>
              <Post {...post} onDelete={handlePostDeleted} />
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div>
      <h1>Profile Page</h1>


      <div id="post-list" className="w-100 w-md-50 flex-grow-1 p-4 overflow-y-auto">
        <h2 className="mb-4">Recent Posts</h2>

        {posts.map((post: any) => (
          <div key={post._id} className="mx-auto mb-3" style={{ maxWidth: "24rem" }}>
            <Post {...post} onDelete={handlePostDeleted} />
          </div>
        ))}
      </div>
    </div>
  );
}
