import { login, register, logout, getMe } from "../services/auth.api";

import { use, useContext, useEffect } from "react";

import { AuthContext } from "../../../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  async function handleRegister(userData) {
    setLoading(true);

    const data = await register(userData);
    setUser(data.user);

    setLoading(false);
  }

  async function handleLogin(userData) {
    setLoading(true);

    const data = await login(userData);
    setUser(data.user);

    setLoading(false);
  }

//  async function handleGetMe() {

//     console.log("GetMe Called");

//     setLoading(true);

//     const data = await getMe();

//     console.log(data);

//     setUser(data.user);

//     setLoading(false);
// }

async function handleGetMe() {

   setLoading(true);

   try {
        const data = await getMe
//         setUser(data.user);
    }
    catch (error) {
    if (error.response?.status === 401) {
        setUser(null);
    } else {
        console.error(error);
    }
}

   finally{
         setLoading(false);

    }
 }


  async function handleLogOut() {
    setLoading(true)
    const data  = await logout()

    setLoading(false)
  }


  // now whenEver we Goin ot repload the Page It logOut teh use So that here using UseEffect I m Hydrating the User

  useEffect(()=>{
    handleGetMe()
  },[])

  return({
    user,loading,handleGetMe,handleLogOut,handleRegister,handleLogin
  })
};
