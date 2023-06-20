import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "./config";

export const storeContext = createContext();

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") ? localStorage.getItem("access_token") : undefined);
    const [posts, setPosts] = useState([]);
    const [postToShow, setPost] = useState({});

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", accessToken);
    }, [user, accessToken])


    const store = {
        user : user,
        accessToken : accessToken,
        posts : posts, 
        postToShow : postToShow,
        authReducer : async (action) => {
            switch (action.type){
                case 'login':
                    try {
                        const {data} = await axios.post(`${backendUrl}/api/login`, {email : action.data.email, password : action.data.password});
                        const {user, accessToken, message} = data;
                        setUser(user);
                        setAccessToken(accessToken);
                        return {status : "success" , message}
                    } catch (error) {
                        if(error.response.data.message){
                            return {status : "fail", message : error.response.data.message}
                        }
                    }
                    break;
                case 'signup':
                    try {
                        const {data} = await axios.post(`${backendUrl}/api/signup`, {username : action.data.username, email : action.data.email, password  : action.data.password});
                        const {user, accessToken, message} = data;
                        setUser(user);
                        setAccessToken(accessToken);
                        return {status : "success" , message : message}
                    } catch (error) {
                        if(error.response.data.message){
                            return {status : "fail", message : error.response.data.message}
                        }
                    }
                    break;
                default:
                    throw new Error("wrong action");
            }
        },
        postReducer :  async (action) => {
            switch (action.type) {
                case 'create_post':
                    try {
                        let {data} = await axios.post(`${backendUrl}/api/post` , {post : action.data.post} , {
                            headers : {
                            authorization : accessToken
                            }
                        }, )
                        setPosts(data.reverse());
                    } catch (error) {
                        console.log(error.message)
                    }
                    break;
                case 'fetch_posts':
                    try {
                        const {data} = await axios.get(`${backendUrl}/api/post`);
                        setPosts(data.reverse());
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case 'get_post':
                    console.log("getting posts...")
                    try {
                        const {data} = await axios.get(`${backendUrl}/api/post/${action.id}`);
                        setPost(data);
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                default:
                    break;
            }
        },
        postsInteractionReducer  : async (action) => {
            switch (action.type) {
                case "like":
                    console.log("like????")
                    try {
                        let {data} = await axios.get(`${backendUrl}/api/post/like/${action.id}`, {
                            headers : {
                                authorization : accessToken
                            }
                        });
                        setPosts(data.reverse())
                    } catch (error) {
                        console.log(error.message)
                    }
                    break;
                case "bookmark":
                    try {
                        let {data} = await axios.get(`${backendUrl}/api/post/bookmark/${action.id}`, {
                            headers : {
                                authorization : accessToken
                            }
                        });
                        setUser(data)
                    } catch (error) {
                        console.log(error.message)
                    }
                    break;
                case "remove_bookmark":
                    try {
                        let {data} = await axios.delete(`${backendUrl}/api/post/bookmark/${action.id}`, {
                            headers : {
                                authorization : accessToken
                            }
                        });
                        setUser(data);
                    } catch (error) {
                        console.log(error.message)
                    }
                    break;
                case "comment":
                    break;
                default:
                    break;
            }
        },
        profileReducer : async (action) => {
            switch (action.type){
                case 'logout':
                    setUser({});
                    setAccessToken();
                    break;
                default:
                    console.log('default profile reducer...')
            }
        }
    };



    return(
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
};


