import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.scss"
import FormGroup from "../components/Formgroup";
import { useAuth } from "../hooks/useAuth";


const Register = () => {


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading , handleRegister} = useAuth()

    const navigate  = useNavigate()

    async function  handleSubmit(e) {

        e.preventDefault()

        await handleRegister({username,email,password})

        navigate("/login")
        
    }

  

    return (
        <section className="login">

            <div className="glass">

                <h1>Create Account</h1>

                <p>Create your account to get started.</p>

                <form onSubmit={handleSubmit}>

                    <FormGroup
                        label="Username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <FormGroup
                        label="Email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <FormGroup
                        label="Password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button className="btn-red" type="submit">
                        Create Account
                    </button>

                </form>

                <div className="bottomText">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </div>

            </div>

        </section>
    );
};

export default Register;