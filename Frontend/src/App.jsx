import { RouterProvider } from "react-router-dom";

import router from "./app/router";

import "./styles/global.scss";

function App() {
    return (
        
            <RouterProvider router={router} />

    );
}

export default App;
