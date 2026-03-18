import { createContext, useState, useEffect} from "react"
import api from "../api/api";

export const AuthContext = createContext()

export default function AuthProvider({children}){

 let [loggedIn,setLoggedIn] = useState(false);
 const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

 useEffect(()=>{
  let token = localStorage.getItem("token")

  if (token) {
    api.get("/users/userProfile")
      .then((res) => {
        console.log("USER:", res.data); 
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        setUser(null);
        setLoggedIn(false);
         console.log("ERROR:", err);
      })
      .finally(() => {
        setLoading(false); //  important
      });
  } else {
    setLoading(false);
  }
},[])

return(
<AuthContext.Provider value={{loggedIn,setLoggedIn,user,setUser, loading}}>
{children}
</AuthContext.Provider>
)

}
