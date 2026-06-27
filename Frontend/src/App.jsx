import router from "./app.routes"
import {RouterProvider} from 'react-router-dom'

import { AuthProvider } from "./Features/auth/auth.context"

import "./Features/shared/styles/global.scss"

function App() {

  return (
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
