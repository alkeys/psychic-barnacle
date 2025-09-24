// codigo del login
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Usuario } from "../models/entity";

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<Usuario>();


    const onSubmit: SubmitHandler<Usuario> = (data) => {
        console.log(data);
    };


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username:</label>
                <input id="username" {...register("nombreUsuario")} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" {...register("contrasena")} />
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
