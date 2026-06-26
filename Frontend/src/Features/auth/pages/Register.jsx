import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/login.scss"
import FormGroup from "../components/Formgroup";


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name.toLowerCase()]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <section className="login">

            <div className="circle one"></div>
            <div className="circle two"></div>

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