"use client";

import React, { useEffect, useState } from "react";
import type { Usuario } from "../../../models/entity";
import { UsuarioApi } from "../../../service/ApiClient";
import EditarUsuario from "./components/EditarUsuario";

const ListarUsuarios: React.FC = () => {
	// --- LÓGICA DE ESTADO ---
	const [usuarios, setUsuarios] = useState<Usuario[]>([]);
	const [usuarioSeleccionado, setUsuarioSeleccionado] =
		useState<Usuario | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	// Nuevo estado para la búsqueda
	const [searchTerm, setSearchTerm] = useState("");
	// --- FIN DE LÓGICA DE ESTADO ---

	const fetchUsuarios = async () => {
		setIsLoading(true);
		try {
			const response = await UsuarioApi.listarUsuarios();
			setUsuarios(response.data);
		} catch (error) {
			console.error("Error al obtener usuarios:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUsuarios();
	}, []);

	const handleGuardadoExitoso = () => {
		setUsuarioSeleccionado(null);
		fetchUsuarios();
	};

	const handleSeleccionar = (usuario: Usuario) => {
		setUsuarioSeleccionado(usuario);
	};

	const handleCancelar = () => {
		setUsuarioSeleccionado(null);
	};

	const handleEliminar = async (id: number) => {
		const confirmation = window.confirm(
			"¿Estás seguro de que deseas eliminar este usuario?",
		);
		if (confirmation) {
			try {
				await UsuarioApi.eliminarUsuario(id);
				fetchUsuarios();
				alert("Usuario eliminado exitosamente.");
			} catch (error) {
				console.error("Error al eliminar usuario:", error);
				alert("Error al eliminar el usuario.");
			}
		}
	};

	// 💡 Lógica de Filtrado
	const filteredUsuarios = usuarios.filter((usuario) =>
		usuario.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="min-h-screen bg-[#fdf2f8] p-6 sm:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Título */}
				<h1 className="text-3xl font-extrabold text-[#be185d] mb-6 border-b-2 border-[#f472b6] pb-2">
					Lista de Usuarios
				</h1>

				{/* --- CAMPO DE FILTRO (NUEVO) --- */}
				<div className="mb-6">
					<input
						type="text"
						placeholder="Buscar usuario por nombre..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full p-3 border-2 border-[#f472b6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] shadow-md transition duration-200"
					/>
				</div>
				{/* ---------------------------------- */}

				{/* --- SECCIÓN DE LISTADO --- */}
				{!usuarioSeleccionado && (
					<div className="bg-white rounded-xl shadow-xl overflow-hidden">
						{isLoading ? (
							<div className="p-8 text-center text-gray-500">
								Cargando usuarios...
								<span className="animate-pulse ml-2">...</span>
							</div>
						) : filteredUsuarios.length === 0 && usuarios.length > 0 ? (
							// Muestra si hay usuarios pero ninguno coincide con el filtro
							<div className="p-8 text-center text-gray-500 border border-[#f472b6]">
								<p className="text-xl font-medium mb-2">
									No se encontraron usuarios con "{searchTerm}" 🧐
								</p>
							</div>
						) : filteredUsuarios.length === 0 && usuarios.length === 0 ? (
							// Muestra si no hay usuarios en absoluto
							<div className="p-8 text-center text-gray-500 border border-[#f472b6]">
								<p className="text-xl font-medium mb-2">
									No hay usuarios registrados 😔
								</p>
								<p>Agrega un nuevo usuario para verlo aquí.</p>
							</div>
						) : (
							// Lista de Usuarios Filtrados
							<ul className="divide-y divide-[#fbcfe8]">
								{filteredUsuarios.map((usuario) => (
									<li
										key={usuario.id}
										className="p-4 hover:bg-[#fbcfe8] transition-colors duration-200 flex flex-wrap items-center justify-between gap-3"
									>
										<div className="flex-1 min-w-0">
											<span className="font-semibold text-lg text-[#be185d] truncate block">
												{usuario.nombreUsuario}
											</span>
											<span className="text-sm font-medium text-[#a21caf]">
												Rol: {usuario.rol}
											</span>
											<div className="text-xs text-gray-500 mt-1 space-x-2">
												<span className="mr-3">ID: {usuario.id}</span>
												{usuario.idTecnico != null && (
													<span className="mr-3">
														Técnico ID: {usuario.idTecnico}
													</span>
												)}
												{usuario.idCliente != null && (
													<span>Cliente ID: {usuario.idCliente}</span>
												)}
											</div>
										</div>

										<div className="flex gap-3">
											<button
												type="button"
												onClick={() => handleSeleccionar(usuario)}
												className="px-4 py-2 bg-[#be185d] text-white rounded-lg hover:bg-[#a21caf] transition-colors duration-200 font-medium shadow-md text-sm"
											>
												Editar
											</button>
											<button
												type="button"
												onClick={() =>
													usuario.id !== undefined && handleEliminar(usuario.id)
												}
												className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-md text-sm"
											>
												Eliminar
											</button>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				)}

				{/* Contenedor del formulario de edición */}
				{usuarioSeleccionado && (
					<div className="mt-8 bg-white rounded-xl shadow-2xl border-2 border-[#be185d] p-6 sm:p-8">
						<h2 className="text-2xl font-bold text-[#be185d] mb-6">
							Editar Usuario: {usuarioSeleccionado.nombreUsuario}
						</h2>
						<EditarUsuario
							usuario={usuarioSeleccionado}
							onCancelar={handleCancelar}
							onGuardar={handleGuardadoExitoso}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListarUsuarios;
