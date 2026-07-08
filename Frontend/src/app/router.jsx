import {createBrowserRouter} from "react-router-dom"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import Protected from "../features/auth/components/Protected" 
import MainLayout from "../layouts/MainLayout"

import Home from "../features/music/pages/Home"
 const router  = createBrowserRouter([
     {
        path:"/",
        element:
        (
            <Protected>  <MainLayout/>  </Protected>
        ) ,
        children:[
         {
            index:true ,
            element:<Home/>
         }
        ]
     }
     ,
     {path:"/login",
        element:<Login/>
     }
     ,
     {
        path:"/register",
        element:<Register/>
     }


]



)

export default router