"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "./client";
import { useSelector } from "react-redux";

export default function Post({ onDelete, ...post }: any) {
    const { currentUser } = useSelector((state: any) => state.account);
    console.log(post.place_name);


    const handleDelete = async () => {
        await client.deletePost(post._id);
        if (onDelete) onDelete(post._id);
    };
    return (
        <div className="card mx-auto mb-3" style={{ maxWidth: "75rem" }}>
            <div className="card-header fw-bold d-flex justify-content-between align-items-center">
                <div>
                    <Link href={`/profile/${post.user_id?._id}`}>
                        {post.user_id?.username}
                    </Link>
                    <a> @ </a>
                    <Link href={`/details/${post.place_id}`}>
                        {post.place_name}
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
