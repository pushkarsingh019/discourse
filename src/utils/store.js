import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "./config";
import {toast} from "react-hot-toast"
import { sortPostByTime } from "./compareTime";
import { sortPostsByTrending } from "./compareTrending";

export const storeContext = createContext();

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") ? localStorage.getItem("access_token") : undefined);
    const [posts, setPosts] = useState([]);
    const [postToShow, setPost] = useState({});
    const [feed, setFeed] = useState([]);
    const [sortCondition, setSortCondition] = useState("Latest");

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
        sortCondition : sortCondition,
        authReducer : async (action) => {
            switch (action.type){
                case 'login':
                    toast.loading("logging in", toastOptions)
                    try {
                        const {data} = await axios.post(`${backendUrl}/api/login`, {email : action.data.email, password : action.data.password});
                        const {user, accessToken, message} = data;
                        setUser(user);
                        setAccessToken(accessToken);
                        toast.dismiss();
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
                    toast.loading("Creating your account", toastOptions);
                    try {
                        const {data} = await axios.post(`${backendUrl}/api/signup`, {username : action.data.username, email : action.data.email, password  : action.data.password, name : action.data.name});
                        const {user, accessToken, message} = data;
                        setUser(user);
                        setAccessToken(accessToken);
                        toast.dismiss();
                        toast.success("Welcome to discourse!")
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
                        setPosts(data);
                        toast.dismiss();
                        toast.success("posted", toastOptions);
                    } catch (error) {
                        console.log(error.message)
                        toast.error("could not create your post :(")
                    }
                    break;
                case 'get_feed': 
                    try {
                        let {data} = await axios.get(`${backendUrl}/api/feed` , {headers : {authorization : accessToken}});
                        let sortedFeed = [];
                        if(sortCondition === "Latest"){
                            sortedFeed = sortPostByTime(data);
                        }
                        else{
                            sortedFeed = sortPostsByTrending(data);
                        }
                        setFeed(sortedFeed);
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
                        setPosts(data);
                        toast.dismiss();
                    } catch (error) {
                        toast.error("error fetching posts", toastOptions);
                        console.log(error);
                    }
                    break;
                case 'get_post':
                    toast.loading("beep beep boop" , {
                        id : "post"
                    })
                    try {
                        const {data} = await axios.get(`${backendUrl}/api/post/${action.id}`);
                        setPost(data);
                        toast.dismiss();
                        toast.success("Enjoy the discourse", toastOptions);
                    } catch (error) {
                        console.log(error);
                        toast.error("error fetching post")
                    }
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
                        setPosts(data)
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
                        toast.success("removed from bookmarks", toastOptions)
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
                    toast("Logged out", toastOptions);
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
                            store.postReducer({
                                type : 'get_feed'
                            });
                            store.postReducer({
                                type : 'fetch_posts'
                            });
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
                                store.postReducer({
                                    type : 'get_feed'
                                });
                                store.postReducer({
                                    type : 'fetch_posts'
                                });
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
                        toast.success("comment added", toastOptions);
                    } catch (error) {
                        console.log(error.message)
                        return
                    }
                    break;
            
                default:
                    break;
            }
        },
        filterReducer: (action) => {
            switch (action.type) {
              case "Latest":
                const sortedFeed = sortPostByTime(feed);
                const sortedPosts = sortPostByTime(posts);
                setFeed(sortedFeed);
                setPosts(sortedPosts);
                setSortCondition(action.type);
                break;
              case "Trending":
                const trendingPosts = sortPostsByTrending(posts);
                const trendingFeed = sortPostsByTrending(feed);
                setFeed(trendingFeed);
                setPosts(trendingPosts);
                setSortCondition(action.type)
                break;
              default:
                console.error("no matching cases found -> filter Reducer");
            }
          }
          
    };



    return(
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
};


