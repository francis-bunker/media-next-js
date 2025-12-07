import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const getAllPosts = async () => {
    const response = await axios.get(`${HTTP_SERVER}/api/posts`);
    return response.data;
}
export const getPostsByUserId = async (userId: string) => {
    const response = await axios.get(`${HTTP_SERVER}/api/posts/user/${userId}`);
    return response.data;
}
export const getPostsByPlaceId = async (placeId: string) => {
    const response = await axios.get(`${HTTP_SERVER}/api/posts/place/${placeId}`);
    return response.data;
}
export const createPost = async (postData: any) => {
    const response = await axiosWithCredentials.post(`${HTTP_SERVER}/api/posts`, postData);
    return response.data;
}
export const signup = async (userData: any) => {
    console.log(userData);
    const response = await axiosWithCredentials.post(`${HTTP_SERVER}/api/users/signup`, userData);
    return response.data;
}
export const signupAdmin = async (userData: any) => {
    console.log(userData);
    const response = await axiosWithCredentials.post(`${HTTP_SERVER}/api/users/signup-admin`, userData);
    return response.data;
}
export const signin = async (userData: any) => {
    console.log(userData);
    const response = await axiosWithCredentials.post(`${HTTP_SERVER}/api/users/signin`, userData);
    return response.data;
}
export const signout = async () => {
    const response = await axiosWithCredentials.post(`${HTTP_SERVER}/api/users/signout`);
    return response.data;
}
export const profile = async () => {
    const response = await axiosWithCredentials.get(`${HTTP_SERVER}/api/users/profile`);
    return response.data;
}
export const findUserById = async (userId: string) => {
    const response = await axios.get(`${HTTP_SERVER}/api/users/${userId}`);
    return response.data;
}
export const searchPlaces = async (query: string) => {
    const response = await axios.post(`${HTTP_SERVER}/api/map/search`, {
        query
    });
    return response.data;
};
export const getPlaceDetails = async (placeId: string) => {
    const response = await axios.get(`${HTTP_SERVER}/api/map/place/${placeId}`);
    return response.data;
}
export const getPlaceTitle = async (placeId: string) => {
    const response = await axios.get(`${HTTP_SERVER}/api/map/place/${placeId}/title`);
    return response.data;
}
export const deletePost = async (postId: string) => {
    const response = await axiosWithCredentials.delete(`${HTTP_SERVER}/api/posts/${postId}`);
    return response.data;
}