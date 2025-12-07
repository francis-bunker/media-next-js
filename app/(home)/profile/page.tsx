"use client"
import { useSelector } from 'react-redux';
import LoginPage from '../login/page';
import * as client from "../client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../accountReducer";

import { redirect } from "next/dist/client/components/navigation";


export default function MyProfilePage() {
    const dispatch = useDispatch();
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
    }
    const { currentUser } = useSelector((state: any) => state.account);


    if (!currentUser) {
        return (
            <LoginPage />
        );
    }
    redirect(`/profile/${currentUser._id}`);

}

