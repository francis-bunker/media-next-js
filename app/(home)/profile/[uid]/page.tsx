"use client";

import { use, useEffect, useState } from "react";
import * as client from "../../client";
import Post from "../../post";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../accountReducer";

export default function ProfilePage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = use(params);
  const [username, setUsername] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.account);



  const fetchPosts = async () => {
    const data = await client.getPostsByUserId(uid);
    setPosts(data);
  };

  const fetchUsername = async () => {
    const user = await client.findUserById(uid);
    const username = user.username;
    setUsername(username);
  }

  useEffect(() => {
    fetchPosts();
    fetchUsername();
  }, [uid]);

  const handlePostDeleted = (deletedId: string) => {
    setPosts(prev => prev.filter(p => p._id !== deletedId));
  };

  const dispatch = useDispatch();
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
  }


  return (
    <div>
      {(currentUser?._id === uid) ?
        <div className="container text-center p-4">
          <h1>My Profile</h1>
          <button className="btn btn-primary" onClick={signout}>signout</button>
        </div>
        :
        <div className="container text-center p-4">
          <h1>Profile Page</h1>
          <p>Username: {username}</p>
        </div>
      }


      <div id="post-list" className="container">
        <h2 className="text-center">Recent Posts</h2>
        {posts.map((post: any) => (
          <div key={post._id} >
            <Post {...post} onDelete={handlePostDeleted} />
          </div>
        ))}
      </div>
    </div>
  );
}
