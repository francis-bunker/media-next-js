"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "./client";
import { useSelector } from "react-redux";

export default function Post({ onDelete, ...post }: any) {
    const [placeTitle, setPlaceTitle] = useState<string>("Loading...");
    const { currentUser } = useSelector((state: any) => state.account);

    useEffect(() => {
        async function loadTitle() {
            try {
                const title = await client.getPlaceTitle(post.place_id);
                setPlaceTitle(title || "Unknown Place");
            } catch (err) {
                console.error("Place title load error:", err);
                setPlaceTitle("Unknown Place");
            }
        }

        loadTitle();
    }, [post.place_id]);

    const handleDelete = async () => {
        await client.deletePost(post._id);
        if (onDelete) onDelete(post._id);

    };

    return (

        <div className="card mx-auto mb-3" style={{ maxWidth: "24rem" }}>
            <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                <div>
                    <Link href={`/profile/${post.user_id?._id}`}>
                        {post.user_id?.username}
                    </Link>
                    <span> @ </span>
                    <Link href={`/details/${post.place_id}`}>
                        {placeTitle}
                    </Link>
                </div>
                {(currentUser?._id === post.user_id?._id || currentUser?.user_type === "admin") && (
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                        Delete
                    </button>
                )}
            </div>

            <div className="card-body">
                <p className="card-text">{post.text}</p>
            </div>
        </div>
    );

}
