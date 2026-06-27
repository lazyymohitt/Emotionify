import "../style/login.scss";
import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import FormGroup from "../components/Formgroup";
import { useAuth } from "../hooks/useAuth";





const Login = () => {

    const {loading , handleLogin} = useAuth()

    const navigate = useNavigate()

    const [email,setEmail]  = useState("")
    const [password, setPassword] = useState("")

   async function handleSubmit(e) {
        
        e.preventDefault()

        await handleLogin({email,password})

        navigate("/")

    }

    return (
        <section className="login">

            <div className="glass">

                <h1>Welcome Back</h1>

                <p>Sign in to continue.</p>

                <form onSubmit={handleSubmit}>

                    <FormGroup
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <FormGroup
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn-red">
                        Login
                    </button>

                </form>

                <div className="bottomText">

                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Create one
                        </Link>
                    </p>

                </div>

            </div>

        </section>
    );
};

export default Login;