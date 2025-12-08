"use client";
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../accountReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";
export default function Signup() {
    const [user, setUser] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        redirect("/profile");
    };
    const signupAdmin = async () => {
        const currentUser = await client.signupAdmin(user);
        dispatch(setCurrentUser(currentUser));
        redirect("/profile");
    }
    return (
        <div className="signup-screen">
            <h1>Sign up</h1>
            <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="username b-2" placeholder="username" />
            <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="password mb-2" placeholder="password" type="password" />
            <button onClick={signup} className="signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
            <button onClick={signupAdmin} className="signup-btn btn btn-primary mb-2 w-100"> Sign up as admin</button><br />
            <Link href="/login" className="signin-link">Sign in</Link>
        </div>
    );
}