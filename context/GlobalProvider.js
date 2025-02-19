import { createContext,useContext,useState,useEffect } from "react";
import { GetCurrentUser } from "../lib/Appwrite";


const GlobalContext = createContext();

export function useGlobaContext(){
    return useContext(GlobalContext);
} 

export function GlobalProvider({children}) {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [User,setUser] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    
    console.log("IsLoggedIn",isLoggedIn);

    async function handleLogin() {
        try {
            const LoggedInUser = await GetCurrentUser();
            setUser(LoggedInUser);
            if(LoggedInUser)
            {
                 setIsLoggedIn(true);

            }

           
           // console.log("LoggedInUser",LoggedInUser);
           // console.log(isLoggedIn);
            
            
        } catch (error) {
            console.log(error.message);
            setIsLoggedIn(false);
        }
        finally{
            setIsLoading(false);
        }
    }
    useEffect(
        ()=> {
            handleLogin();
        }
    ,[]);
    
    return (
        <GlobalContext.Provider
        value = {{
            isLoggedIn,
            setIsLoggedIn,
            User,
            setUser,
            isLoading,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}











