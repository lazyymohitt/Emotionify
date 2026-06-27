import {createBrowserRouter} from "react-router-dom"
import Login from "./Features/auth/pages/Login"
import Register from "./Features/auth/pages/Register"
import Protected from "./Features/auth/components/Protected"
 const router  = createBrowserRouter([
     {
        path:"/",
        element: <Protected><h1>Home</h1></Protected>
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