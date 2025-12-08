"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { redirect } from "next/dist/client/components/navigation";
import { setCurrentUser } from "../accountReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function loginPage() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/profile");
  };
  return (
    <div >
      <h1>Sign in</h1>
      <FormControl defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2" placeholder="username" id="wd-username" />
      <FormControl defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2" placeholder="password" type="password" id="wd-password" />
      <Button onClick={signin}  className="w-100" > Sign in </Button>
      <Link  href="/signup"> Sign up </Link>
    </div>
  );
}