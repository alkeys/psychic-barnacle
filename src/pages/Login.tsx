// codigo del login
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Usuario } from "../models/entity";
import { UsuarioApi } from "../service/ApiClient";
import { useAuth } from "../context/AuthContext";
import { UserData } from "@/utils/Data";
const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<Usuario>();
    const auth = useAuth();



    const onSubmit: SubmitHandler<Usuario> = async (data) => {
        let attempts = 0;
        const maxAttempts = 3;
        while (attempts < maxAttempts) {
            try {
                const response = await UsuarioApi.login(data);
                console.log("Iniciando sesión:", response.data);
                localStorage.setItem("token", response.data.token);

                const userData = UserData(response.data, data.nombreUsuario);
                auth.login(userData);
            
                break; // Exit loop on success
            } catch (error) {
                attempts++;
                console.error(`Iniciando sesión fallida (intento ${attempts}):`, error);
                if (attempts >= maxAttempts) {
                    console.error("Se alcanzaron los máximos intentos de inicio de sesión.");
                }
            }
        }
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
