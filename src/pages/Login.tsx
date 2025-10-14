// codigo del login
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Usuario } from "../models/entity";
import { LoginApi, UsuarioApi } from "../service/ApiClient";
import { useAuth } from "../context/AuthContext";
import { UserData } from "@/utils/Data";
import { useNavigate } from "react-router-dom";
import { log } from "console";
const Login: React.FC = () => {
	const { register, handleSubmit } = useForm<Usuario>();
	const navigate = useNavigate();
	const auth = useAuth();

	const onSubmit: SubmitHandler<Usuario> = async (data) => {
		let attempts = 0;
		const maxAttempts = 100;
		while (attempts < maxAttempts) {
			try {
				const response = await LoginApi.login(data);

				const userData = UserData(response.data, data.nombreUsuario);

				// Validar datos de usuario
				if (!userData || !userData.rol) {
					throw new Error("Datos de usuario inválidos.");
				}

				auth.login(userData);

				// Redirigir según el rol del usuario
				switch (userData.rol) {
					case "administrador":
						navigate("/admin");
						break;
					case "tecnico":
						navigate("/tecnico");
						break;
					case "cliente":
						navigate("/cliente");
						break;
					default:
						navigate("/");
						break;
				}
				break;
			} catch (error) {
				attempts++;
				console.error(
					`Intento de inicio de sesión fallido (${attempts}):`,
					error,
				);
				if (attempts >= maxAttempts) {
					alert("Se alcanzaron los máximos intentos de inicio de sesión.");
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
