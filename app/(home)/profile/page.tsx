"use client"
import { useSelector } from 'react-redux';
import LoginPage from '../login/page';
import { redirect } from "next/dist/client/components/navigation";


export default function MyProfilePage() {

    const { currentUser } = useSelector((state: any) => state.account);

    if (!currentUser) {
        return (
            <LoginPage />
        );
    }
    redirect(`/profile/${currentUser._id}`);
}

