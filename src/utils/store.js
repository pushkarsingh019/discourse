import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "./config";
import {toast} from "react-hot-toast"

export const storeContext = createContext();

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") ? localStorage.getItem("access_token") : undefined);
    const [posts, setPosts] = useState([]);
    const [postToShow, setPost] = useState({});
    const [feed, setFeed] = useState([]);

    const toastOptions = {
        duration : 2000,
        position : 'top-center',
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", accessToken);
    }, [user, accessToken])

    useEffect(() => {
        store.postReducer({
            type : 'get_feed'
        })
        // eslint-disable-next-line
    }, [posts]);


    const store = {
        user : user,
        accessToken : accessToken,
        posts : posts, 
        feed : feed,
        postToShow : postToShow,
        authReducer : async (action) => {
            switch (action.type){
                case 'login':
                    toast.loading("logging in", toastOptions)
                    try {
                        const {data} = await axios.post(`${backendUrl}/api/login`, {email : action.data.email, password : action.data.password});
                        const {user, accessToken, message} = data;
                        setUser(user);
                        setAccessToken(accessToken);
                        toast.success("Logged in", toastOptions)
                        return {status : "success" , message}
                    } catch (error) {
                        if(error.response.data.message){
                            return {status : "fail", message : error.response.data.message}
                        }
                        toast.error("Login Failed")
                    }
                    break;
                case 'signup':
                    toast.loading("Creating your account");
                    try {
                        const {data} = await axios.post(`${backendUrl}/api/signup`, {username : action.data.username, email : action.data.email, password  : action.data.password, name : action.data.name});
                        const {user, accessToken, message} = data;
                        setUser(user);
                        setAccessToken(accessToken);
                        toast.success("Account created")
                        return {status : "success" , message : message}
                    } catch (error) {
                        toast.dismiss();
                        toast.error("signup failed");
                        return {status : "fail" , message : "user already exists, log in"}
                    }
                    break;
                default:
                    throw new Error("wrong action");
            }
        },
        postReducer :  async (action) => {
            switch (action.type) {
                case 'create_post':
                    toast.loading("posting", toastOptions);
                    try {
                        let {data} = await axios.post(`${backendUrl}/api/post` , {post : action.data.post} , {
                            headers : {
                            authorization : accessToken
                            }
                        }, )
                        setPosts(data.reverse());
                        toast.dismiss();
                    } catch (error) {
                        console.log(error.message)
                        toast.error("could not create your post :(")
                    }
                    break;
                case 'get_feed': 
                    try {
                        let {data} = await axios.get(`${backendUrl}/api/feed` , {headers : {authorization : accessToken}});
                        setFeed(data);
                        toast.dismiss();
                    } catch (error) {
                        console.log(error.message);
                    }
                    break;
                case 'fetch_posts':
                    toast.loading('loading', {
                        id : "fetching_posts",
                        position : "top-center",
                        duration : 2000,
                    });
                    try {
                        const {data} = await axios.get(`${backendUrl}/api/post`);
                        setPosts(data.reverse());
                        toast.dismiss();
                    } catch (error) {
                        toast.error("error fetching posts");
                        console.log(error);
                    }
                    break;
                case 'get_post':
                    toast.loading("fetching post" , {
                        id : "post"
                    })
                    try {
                        const {data} = await axios.get(`${backendUrl}/api/post/${action.id}`);
                        setPost(data);
                        toast.dismiss();
                    } catch (error) {
                        console.log(error);
                        toast.error("error fetching post")
                    }
                    break;
                case "comment":
                    break;
                case 'delete':
                    try {
                        let {data} = await axios.delete(`${backendUrl}/api/post/${action.id}`, {
                            headers : {
                                authorization : accessToken
                            }
                        });
                        setPosts(data)
                        toast.success("post deleted", toastOptions);
                    } catch (error) {
                        console.log(error.message)
                    }
                    break;
                case 'edit':
                    toast.loading("editing post")
                    try {
                        await axios.put(`${backendUrl}/api/post/${action.id}`, {post : action.post}, {
                            headers : {
                                authorization : accessToken
                            }
                        });
                        toast.dismiss();
                        toast.success("post edited");
                    } catch (error) {
                        console.log(error.message)
                        toast.error("error..")
                    }
                    break;
                default:
                    break;
            }
        },
        postsInteractionReducer  : async (action) => {
            switch (action.type) {
                case "like":
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
                        toast.success("post bookmarked", toastOptions)
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
                        toast.success("removed bookmark", toastOptions)
                    } catch (error) {
                        console.log(error.message)
                    }
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
                case 'get_profile':
                    try {
                        const {data} = await axios.get(`${backendUrl}/api/user/${action.userId}`);
                        setUser(data);
                    } catch (error) {
                        console.log(error.message)
                    }
                    break; 
                case 'update_profile':
                    toast.loading(`loading ${user.username} 2.0`)
                    try {
                        const {data} = await axios.put(`${backendUrl}/api/user/${action.id}` , {
                            name : action.data.name,
                            username : action.data.username,
                            bio : action.data.bio
                        }, {
                            headers : {
                                authorization : accessToken
                            }
                        });
                        setUser(data)
                        toast.dismiss();
                        toast.success("profile updated", toastOptions);
                    } catch (error) {
                        console.log(error.message)
                    }
                    break;
                case 'follow':
                    if(Object.keys(user).length === 0){
                        console.log("log in first...")
                        toast.error("you are not logged in", toastOptions)
                    }
                    else{
                        try {
                            const {data} = await axios.get(`${backendUrl}/api/user/follow/${action.id}`, {
                                headers : {
                                    authorization : accessToken
                                }
                            });
                            setUser(data);
                        } catch (error) {
                            console.log(error.message)
                        }
                    }
                    break;
                    case 'unfollow':
                        if(Object.keys(user).length === 0){
                            console.log("log in first...")
                            toast.error("you are not logged in", toastOptions)
                        }
                        else{
                            try {
                                const {data} = await axios.delete(`${backendUrl}/api/user/follow/${action.id}`, {
                                    headers : {
                                        authorization : accessToken
                                    }
                                });
                                setUser(data);
                            } catch (error) {
                                console.log(error.message)
                            }
                        }
                        break;
                default:
                    console.log('default profile reducer...')
            }
        },
        commentsReducer : async (action) => {
            switch (action.type) {
                case 'new_comment':
                    toast.loading("commenting...")
                    try {
                        let {data} = await axios.post(`${backendUrl}/api/post/comment` , {
                            comment : action.comment,
                            postId : action.id
                        }, {
                            headers : {
                                authorization : accessToken
                            }
                        });
                        setPost(data);
                        toast.dismiss();
                    } catch (error) {
                        console.log(error.message)
                        return
                    }
                    break;
            
                default:
                    break;
            }
        }
    };



    return(
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
};


