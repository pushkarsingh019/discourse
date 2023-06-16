import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "./config";

export const storeContext = createContext();

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") ? localStorage.getItem("access_token") : undefined);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", accessToken);
    }, [user, accessToken])


    const store = {
        user : user,
        accessToken : accessToken,
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
        }
    };



    return(
        <storeContext.Provider value={store}>
            {children}
        </storeContext.Provider>
    )
};


