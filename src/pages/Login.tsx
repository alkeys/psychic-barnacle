"use client";

import type React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Usuario } from "../models/entity";
import { LoginApi } from "../service/ApiClient";
import { useAuth } from "../context/AuthContext";
import { UserData } from "@/utils/Data";
import { useNavigate } from "react-router-dom";

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
					Intento de inicio de sesión fallido (${attempts}):,
					error,
				);
				if (attempts >= maxAttempts) {
					alert("Se alcanzaron los máximos intentos de inicio de sesión.");
				}
			}
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fbcfe8] to-[#f472b6] flex items-center justify-center p-4">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-[#be185d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
				<div className="absolute bottom-20 right-10 w-72 h-72 bg-[#a21caf] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
			</div>

			{/* Login Card */}
			<div className="relative w-full max-w-md">
				<div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#f472b6]/20 animate-[fadeIn_0.6s_ease-out]">
					{/* Logo/Header */}
					<div className="text-center mb-8 animate-[slideDown_0.6s_ease-out]">
						<div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#be185d] to-[#a21caf] mb-4 shadow-lg">
							<svg
								className="w-10 h-10 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Lock Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
							Bienvenido
						</h1>
						<p className="text-[#a21caf] mt-2">Inicia sesión en tu cuenta</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Username Input */}
						<div className="animate-[slideUp_0.6s_ease-out_0.1s_both]">
							<label
								htmlFor="username"
								className="block text-sm font-semibold text-[#be185d] mb-2"
							>
								Usuario
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-[#a21caf]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<title>User Icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
								<input
									id="username"
									{...register("nombreUsuario")}
									className="w-full pl-12 pr-4 py-3 bg-[#fdf2f8] border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-[#a21caf]/50"
									placeholder="Ingresa tu usuario"
								/>
							</div>
						</div>

						{/* Password Input */}
						<div className="animate-[slideUp_0.6s_ease-out_0.2s_both]">
							<label
								htmlFor="password"
								className="block text-sm font-semibold text-[#be185d] mb-2"
							>
								Contraseña
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<svg
										className="w-5 h-5 text-[#a21caf]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<title>Lock Icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<input
									id="password"
									type="password"
									{...register("contrasena")}
									className="w-full pl-12 pr-4 py-3 bg-[#fdf2f8] border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-[#a21caf]/50"
									placeholder="Ingresa tu contraseña"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full py-3 px-6 bg-gradient-to-r from-[#be185d] to-[#a21caf] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 animate-[slideUp_0.6s_ease-out_0.3s_both]"
						>
							Iniciar Sesión
						</button>
					</form>

					{/* Footer */}
					<div className="mt-6 text-center text-sm text-[#a21caf] animate-[fadeIn_0.6s_ease-out_0.4s_both]">
						<p>¿Olvidaste tu contraseña?</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
