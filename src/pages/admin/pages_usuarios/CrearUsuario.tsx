"use client";

import type React from "react";
import { useState } from "react";
import type { Usuario, Tecnico, Cliente } from "../../../models/entity";
import { UsuarioApi, ClienteApi, tecnicoApi } from "../../../service/ApiClient";

const CrearUsuario: React.FC = () => {
	const [usuario, setUsuario] = useState<Usuario>({
		nombreUsuario: "",
		contrasena: "",
		rol: "cliente",
	});
	const [tecnico, setTecnico] = useState<Tecnico>({
		activo: true,
		nombreCompleto: "",
		especialidad: "",
		idUsuario: 0,
	});
	const [cliente, setCliente] = useState<Cliente>({
		nombreCompleto: "",
		correo: "",
		telefono: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setUsuario((prev) => ({ ...prev, [name]: value }));
	};

	const handlerCrearTecnico = async (idUsuario: number, tecnico: Tecnico) => {
		try {
			const response = await tecnicoApi.crearTecnico({
				...tecnico,
				idUsuario: idUsuario,
			});
			if (response.status === 201) {
				console.log("✅ Técnico creado:", response.data);
				alert("Técnico creado exitosamente");
			} else {
				console.error("❌ Error: respuesta inesperada", response);
				alert("Error al crear técnico");
			}
		} catch (error) {
			console.error("❌ Error al crear técnico:", error);
			alert("Error al crear técnico");
		}
	};

	const handlerCrearCliente = async (usuarioId: number, cliente: Cliente) => {
		let intentos = 0;
		let exito = false;
		let response = null;

		while (intentos < 2 && !exito) {
			try {
				console.log(`🔄 Intento ${intentos + 1}: Creando cliente...`, cliente);

				response = await ClienteApi.crearCliente({
					...cliente,
					usuarioId,
				});

				if (response.status === 201) {
					exito = true;
					console.log("✅ Cliente creado:", response.data);
				} else {
					console.warn("⚠️ Respuesta inesperada:", response);
				}
			} catch (error) {
				console.error(
					`❌ Error al crear cliente (intento ${intentos + 1}):`,
					error,
				);
			}

			if (!exito) {
				await new Promise((res) => setTimeout(res, 1000));
			}
			intentos++;
		}

		if (exito && response) {
			alert("✅ Cliente creado exitosamente");
		} else {
			alert("❌ No se pudo crear el cliente después de 2 intentos");
		}
	};

	const handlerCrear = async () => {
		let intentos = 0;
		let exito = false;
		let response = null;

		while (intentos < 2 && !exito) {
			try {
				console.log(`🔄 Intento ${intentos + 1}: Creando usuario...`, usuario);
				response = await UsuarioApi.crearUsuario(usuario);

				if (response.status === 201) {
					exito = true;
					console.log("✅ Usuario creado:", response.data);
				} else {
					console.warn("⚠️ Respuesta inesperada:", response);
				}
			} catch (error) {
				console.error(`❌ Error en intento ${intentos + 1}:`, error);
			}

			if (!exito) {
				await new Promise((res) => setTimeout(res, 1000));
			}
			intentos++;
		}

		if (!exito || !response) {
			alert("❌ No se pudo crear el usuario después de 2 intentos");
			return;
		}

		const idUsuarioCreado = response.data.id;
		const rolSeleccionado = usuario.rol;

		console.log("🔹 Rol seleccionado:", rolSeleccionado);
		console.log("🔹 ID de usuario creado:", idUsuarioCreado);
		console.log("🔹 Datos de técnico:", tecnico);
		console.log("🔹 Datos de cliente:", cliente);

		if (rolSeleccionado === "tecnico" && idUsuarioCreado) {
			await handlerCrearTecnico(idUsuarioCreado, tecnico);
		} else if (rolSeleccionado === "cliente" && idUsuarioCreado) {
			await handlerCrearCliente(idUsuarioCreado, cliente);
		}

		alert("✅ Usuario creado exitosamente");

		setUsuario({
			nombreUsuario: "",
			contrasena: "",
			rol: "cliente",
		});
	};

	const handleChangeTecnico = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setTecnico((prev) => ({ ...prev, [name]: value }));
	};

	const handleChangeCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCliente((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fbcfe8] to-[#fdf2f8] p-6">
			<div className="max-w-3xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8 animate-[fadeIn_0.6s_ease-out]">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#be185d] to-[#a21caf] mb-4 shadow-lg">
						<svg
							className="w-8 h-8 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Crear Nuevo Usuario</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
						Crear Nuevo Usuario
					</h1>
					<p className="text-[#a21caf] mt-2">
						Complete el formulario para registrar un nuevo usuario en el sistema
					</p>
				</div>

				{/* Main Form Card */}
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#f472b6]/20 animate-[slideUp_0.6s_ease-out_0.1s_both]">
					{/* Información de Usuario */}
					<div className="mb-8">
						<h2 className="text-xl font-semibold text-[#be185d] mb-6 flex items-center gap-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Información de Usuario</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							Información de Usuario
						</h2>

						<div className="space-y-5">
							{/* Nombre de Usuario */}
							<div className="group">
								<label className="block text-sm font-medium text-[#be185d] mb-2">
									Nombre de Usuario
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg
											className="w-5 h-5 text-[#a21caf]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>Nombre de Usuario</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									</div>
									<input
										type="text"
										name="nombreUsuario"
										value={usuario.nombreUsuario}
										onChange={handleChange}
										placeholder="Ingrese el nombre de usuario"
										className="w-full pl-10 pr-4 py-3 border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 bg-white/50"
									/>
								</div>
							</div>

							{/* Contraseña */}
							<div className="group">
								<label className="block text-sm font-medium text-[#be185d] mb-2">
									Contraseña
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg
											className="w-5 h-5 text-[#a21caf]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>Contraseña</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
											/>
										</svg>
									</div>
									<input
										type="password"
										name="contrasena"
										value={usuario.contrasena}
										onChange={handleChange}
										placeholder="Ingrese la contraseña"
										className="w-full pl-10 pr-4 py-3 border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 bg-white/50"
									/>
								</div>
							</div>

							{/* Rol */}
							<div className="group">
								<label className="block text-sm font-medium text-[#be185d] mb-2">
									Rol del Usuario
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg
											className="w-5 h-5 text-[#a21caf]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>Rol del Usuario</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
											/>
										</svg>
									</div>
									<select
										name="rol"
										value={usuario.rol}
										onChange={handleChange}
										className="w-full pl-10 pr-10 py-3 border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 bg-white/50 appearance-none cursor-pointer"
									>
										<option value="administrador">Administrador</option>
										<option value="tecnico">Técnico</option>
										<option value="cliente">Cliente</option>
									</select>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
										<svg
											className="w-5 h-5 text-[#a21caf]"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>Seleccionar Rol</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Información Adicional según Rol */}
					{usuario.rol === "tecnico" && (
						<div className="mb-8 p-6 bg-gradient-to-br from-[#fbcfe8]/50 to-[#fdf2f8] rounded-xl border-2 border-[#f472b6]/30 animate-[fadeIn_0.4s_ease-out]">
							<h2 className="text-xl font-semibold text-[#be185d] mb-6 flex items-center gap-2">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Información del Técnico</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								Información del Técnico
							</h2>

							<div className="space-y-5">
								<div className="group">
									<label className="block text-sm font-medium text-[#be185d] mb-2">
										Nombre Completo
									</label>
									<input
										type="text"
										name="nombreCompleto"
										value={tecnico.nombreCompleto || ""}
										onChange={handleChangeTecnico}
										placeholder="Ingrese el nombre completo del técnico"
										className="w-full px-4 py-3 border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 bg-white"
									/>
								</div>

								<div className="group">
									<label className="block text-sm font-medium text-[#be185d] mb-2">
										Especialidad
									</label>
									<div className="relative">
										<select
											name="especialidad"
											value={tecnico.especialidad || ""}
											onChange={handleChangeTecnico}
											className="w-full px-4 py-3 border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 bg-white appearance-none cursor-pointer"
										>
											<option value="">Seleccione una especialidad</option>
											<option value="Hardware">Hardware</option>
											<option value="Software">Software</option>
											<option value="Redes">Redes</option>
											<option value="Periféricos">Periféricos</option>
										</select>
										<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
											<svg
												className="w-5 h-5 text-[#a21caf]"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<title>Seleccionar Especialidad</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{usuario.rol === "cliente" && (
						<div className="mb-8 p-6 bg-gradient-to-br from-[#fbcfe8]/50 to-[#fdf2f8] rounded-xl border-2 border-[#f472b6]/30 animate-[fadeIn_0.4s_ease-out]">
							<h2 className="text-xl font-semibold text-[#be185d] mb-6 flex items-center gap-2">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Información del Cliente</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								Información del Cliente
							</h2>

							<div className="space-y-5">
								<div className="group">
									<label className="block text-sm font-medium text-[#be185d] mb-2">
										Nombre Completo
									</label>
									<input
										type="text"
										name="nombreCompleto"
										value={cliente.nombreCompleto || ""}
										onChange={handleChangeCliente}
										placeholder="Ingrese el nombre completo del cliente"
										className="w-full px-4 py-3 border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 bg-white"
									/>
								</div>

								<div className="group">
									<label className="block text-sm font-medium text-[#be185d] mb-2">
										Correo Electrónico
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg
												className="w-5 h-5 text-[#a21caf]"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<title>Correo Electrónico</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
										<input
											type="email"
											name="correo"
											value={cliente.correo || ""}
											onChange={handleChangeCliente}
											placeholder="correo@ejemplo.com"
											className="w-full pl-10 pr-4 py-3 border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 bg-white"
										/>
									</div>
								</div>

								<div className="group">
									<label className="block text-sm font-medium text-[#be185d] mb-2">
										Teléfono
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg
												className="w-5 h-5 text-[#a21caf]"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<title>Teléfono</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
												/>
											</svg>
										</div>
										<input
											type="tel"
											name="telefono"
											value={cliente.telefono || ""}
											onChange={handleChangeCliente}
											placeholder="+1 (555) 000-0000"
											className="w-full pl-10 pr-4 py-3 border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 bg-white"
										/>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Botón de Crear */}
					<button
						type="button"
						onClick={handlerCrear}
						className="w-full py-4 px-6 bg-gradient-to-r from-[#be185d] to-[#a21caf] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Agregar Usuario</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
						<title>Agregar Usuario</title>
						Crear Usuario
					</button>
				</div>
			</div>

			<style>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
};

export default CrearUsuario;
