import { createContext, useEffect, useState } from "react";
import ProductApi from "./api/ProductApi";
import axios from "axios";
import UserApi from "./api/UserApi";

export const GlobalState=createContext()
export const DataProvider=({children})=>{

    const[token,setToken]=useState(false)
    const refreshToken=async()=>{
        const res=await axios.get('https://cinemate-g8ix.onrender.com/user/refresh_token')
        setToken(res.data.accessToken)
    }
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            refreshToken().catch((error) => {
                console.error("Error refreshing token:", error.response?.data || error.message);
            });
        }
    }, []);
    
    const state={
        token:[token,setToken],
        ProductApi:ProductApi(),
        UserApi:UserApi(token)
    }
    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
