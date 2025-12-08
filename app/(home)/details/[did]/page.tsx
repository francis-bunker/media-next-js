"use client";

import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "../../client";
import Post from "../../post";

export default function Details({ params }: { params: Promise<{ did: string }> }) {
    const { did } = use(params);
    const { currentUser } = useSelector((state: any) => state.account);
    const [posts, setPosts] = useState<any[]>([]);
    const [placeDetails, setPlaceDetails] = useState<any>(null);
    const [text, setText] = useState("");

    const fetchPageData = async () => {
        const postsData = await client.getPostsByPlaceId(did);
        const placeDetailsData = await client.getPlaceDetails(did);
        setPosts(postsData);
        setPlaceDetails(placeDetailsData);
    };

    useEffect(() => {
        if (did) {
            fetchPageData();
        }
    }, [did]);

    if (!placeDetails) return <div>Loading...</div>;

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        const newPost = await client.createPost({
            text,
            user_id: currentUser._id,
            place_id: did,
        });

        if (newPost) {
            setPosts(prev => [newPost, ...prev]);
            setText("");
        }
    };

    const handlePostDeleted = (deletedId: string) => {
        setPosts(prev => prev.filter(p => p._id !== deletedId));
    };

    return (
        <div>
            <div className="container text-center p-4">
            <h1>Details Page for {placeDetails.displayName.text}</h1>
            <p>{placeDetails.formattedAddress}</p>
            </div>

            {currentUser ?
                <div className="container-fluid p-4">
                    <h4 className="mb-1">Create a New Post</h4>
                    <form onSubmit={handleCreatePost}>
                        <div className="mb-2">
                            <label htmlFor="postText" className="form-label">Enter your message...</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postText"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">
                            Submit
                        </button>
                    </form>
                </div>
                :
                <div className = "text-center">
                    <p>Please sign in to post!</p>
                </div>}

            <div id="post-list" className="container">
                <h2 className="text-center">Recent Posts</h2>
                {posts.map((post: any) => (
                    <div key={post._id}>
                        <Post {...post} onDelete={handlePostDeleted} />
                    </div>
                ))}
                {posts.length === 0 && <p className="text-center">No posts yet.</p>}
            </div>
        </div>
    );
}
