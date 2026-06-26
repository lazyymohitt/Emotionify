import "../style/login.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormGroup from "../components/Formgroup";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            email,
            password,
        });
    };

    return (
        <section className="login">

            <div className="circle one"></div>
            <div className="circle two"></div>

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