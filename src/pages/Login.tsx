// codigo del login
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Usuario } from "../models/entity";
import { UsuarioApi } from "../service/ApiClient";
import { useAuth } from "../context/AuthContext";
import type { UsuarioLoginContext } from "../context/AuthContext";
const Login: React.FC = () => {
    const { register, handleSubmit } = useForm<Usuario>();
    const auth = useAuth();



    const onSubmit: SubmitHandler<Usuario> = async (data) => {
        let attempts = 0;
        const maxAttempts = 3;
        while (attempts < maxAttempts) {
            try {
                const response = await UsuarioApi.login(data); 
                console.log("Login successful:", response.data);
                localStorage.setItem("token", response.data.token);
                const userData: UsuarioLoginContext = {
                    idUsuario: response.data.userId,
                    nombreUsuario: data.nombreUsuario,
                    rol: response.data.rol_cargado,
                    idTecnico: response.data.tecnico?.id,
                    idCliente: response.data.cliente?.id,
                    nombre_completo: response.data.tecnico?.nombreCompleto || response.data.cliente?.nombreCompleto || "",
                    correo: response.data.cliente?.correo,
                    telefono: response.data.cliente?.telefono,
                    especialidad: response.data.tecnico?.especialidad
                };
                auth.login(userData);
                break;
            } catch (error) {
                attempts++;
                console.error(`Login failed (attempt ${attempts}):`, error);
                if (attempts >= maxAttempts) {
                    console.error("Max login attempts reached.");
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
