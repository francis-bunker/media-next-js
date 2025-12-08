import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const axiosWithCredentials = axios.create({ 
    withCredentials: true,
    baseURL: HTTP_SERVER,
});

const axiosPublic = axios.create({
    baseURL: HTTP_SERVER,
});

export const getAllPosts = async () => {
    const response = await axiosPublic.get(`/api/posts`);
    return response.data;
}

export const getPostsByUserId = async (userId: string) => {
    const response = await axiosPublic.get(`/api/posts/user/${userId}`);
    return response.data;
}

export const getPostsByPlaceId = async (placeId: string) => {
    const response = await axiosPublic.get(`/api/posts/place/${placeId}`);
    return response.data;
}

export const createPost = async (postData: any) => {
    const response = await axiosWithCredentials.post(`/api/posts`, postData);
    return response.data;
}

export const signup = async (userData: any) => {
    const response = await axiosWithCredentials.post(`/api/users/signup`, userData);
    return response.data;
}

export const signupAdmin = async (userData: any) => {
    const response = await axiosWithCredentials.post(`/api/users/signup-admin`, userData);
    return response.data;
}

export const signin = async (userData: any) => {
    const response = await axiosWithCredentials.post(`/api/users/signin`, userData);
    return response.data;
}

export const signout = async () => {
    const response = await axiosWithCredentials.post(`/api/users/signout`);
    return response.data;
}

export const profile = async () => {
    const response = await axiosWithCredentials.get(`/api/users/profile`);
    return response.data;
}


export const findUserById = async (userId: string) => {
    const response = await axiosPublic.get(`/api/users/${userId}`);
    return response.data;
}

export const searchPlaces = async (query: string) => {
    const response = await axiosPublic.post(`/api/map/search`, {
        query
    });
    return response.data;
};

export const getPlaceDetails = async (placeId: string) => {
    const response = await axiosPublic.get(`/api/map/place/${placeId}`);
    return response.data;
}

export const getPlaceTitle = async (placeId: string) => {
    const response = await axiosPublic.get(`/api/map/place/${placeId}/title`);
    return response.data;
}

export const deletePost = async (postId: string) => {
    const response = await axiosWithCredentials.delete(`/api/posts/${postId}`);
    return response.data;
}

export const updateEmail = async (email: string) => {
    const response = await axiosWithCredentials.post(`/api/users/profile/email`, {
        email
    });
    return response.data;
}