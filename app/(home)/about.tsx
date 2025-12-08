"use client"
import Link from "next/link";

export default function aboutPage() {
    return (
        <div className="container mb-3">
            <h1>Map Posts</h1>
            <p>Created by Francis Bunker.  This webpage allows users to creat posts about any place on Google Maps.  Just create a profile and search for a place, or look at notes from other poeple.</p>
            <Link href="https://github.com/francis-bunker/media-next-js"> app github</Link>
            <br></br>
            <Link href="https://github.com/francis-bunker/media-node-app"> backend github</Link>
        </div>
    );

}