"use client"; // Asumo que este también es un Client Component

import React, { useEffect, useState } from "react";
import type { Usuario } from "../../../models/entity";
import { UsuarioApi } from "../../../service/ApiClient";
import EditarUsuario from "./components/EditarUsuario";

const ListarUsuarios: React.FC = () => {
	// --- INICIO DE LÓGICA ORIGINAL (SIN CAMBIOS) ---
	const [usuarios, setUsuarios] = useState<Usuario[]>([]);
	const [usuarioSeleccionado, setUsuarioSeleccionado] =
		useState<Usuario | null>(null);
	const [idSeleccionado, setIdSeleccionado] = useState<number | null>(null);

	useEffect(() => {
		// Simulación de carga de datos
		const fetchUsuarios = async () => {
			const response = await UsuarioApi.listarUsuarios();
			setUsuarios(response.data);
		};
		fetchUsuarios();
	}, []);

	const handleSeleccionar = (usuario: Usuario, id: number | undefined) => {
		setUsuarioSeleccionado(usuario);

		if (id !== undefined) {
			setIdSeleccionado(id);
		}
	};

	const handleCancelar = () => {
		setUsuarioSeleccionado(null);
	};

	const handleGuardar = async (usuarioActualizado: Usuario) => {
		// Intentar actualizar en API si existe el método
	};

	const handleEliminar = async (id: number) => {
		// Intentar eliminar en API si existe el métod
		try {
			await UsuarioApi.eliminarUsuario(id);
			// Actualizar la lista localmente
			setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
		} catch (error) {
			console.error("Error al eliminar usuario:", error);
		}
	};
	// --- FIN DE LÓGICA ORIGINAL ---

	return (
		// Fondo principal: Rosa Muy Claro (#fdf2f8)
		<div className="min-h-screen bg-[#fdf2f8] p-6 sm:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Título: Acento principal (#be185d) */}
				<h1 className="text-3xl font-bold text-[#be185d] mb-6">
					Lista de Usuarios
				</h1>

				{/* Contenedor de lista: Fondo blanco, borde y división Rosa Claro (#f472b6) */}
				<ul className="bg-white rounded-lg shadow-md border border-[#f472b6] divide-y divide-[#f472b6]">
					{usuarios.map((usuario) => (
						<li
							key={usuario.id}
							// Hover: Rosa Pálido (#fbcfe8)
							className="p-4 hover:bg-[#fbcfe8] transition-colors duration-200 flex flex-wrap items-center justify-between gap-3"
						>
							{/* Información del usuario */}
							<div className="flex-1 min-w-[250px]">
								{/* Texto principal: Acento principal (#be185d) */}
								<span className="font-semibold text-[#be185d]">
									{usuario.nombreUsuario}
								</span>
								{/* Texto secundario: Rosa Medio/Púrpura (#a21caf) */}
								<span className="text-[#a21caf] ml-2">({usuario.rol})</span>
								{/* IDs en texto más pequeño */}
								<div className="text-sm text-gray-500 mt-1">
									<span className="mr-3">ID: {usuario.id}</span>
									{usuario.idtecnico != null && (
										<span className="mr-3">
											Técnico ID: {usuario.idtecnico}
										</span>
									)}
									{usuario.idcliente != null && (
										<span>Cliente ID: {usuario.idcliente}</span>
									)}
								</div>
							</div>

							{/* Contenedor de botones */}
							<div className="flex gap-2">
								{/* Botón Editar: Acento principal (#be185d) */}
								<button
									type="button"
									onClick={() => handleSeleccionar(usuario, usuario.id)}
									className="px-3 py-1 bg-[#be185d] text-white rounded-md hover:bg-[#a21caf] transition-colors duration-200 text-sm font-medium"
								>
									Editar
								</button>
								{/* Botón Eliminar: Rojo estándar para acciones destructivas */}
								<button
									type="button"
									onClick={() =>
										usuario.id !== undefined && handleEliminar(usuario.id)
									}
									className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
								>
									Eliminar
								</button>
							</div>
						</li>
					))}
				</ul>

				{/* Contenedor del formulario de edición */}
				{usuarioSeleccionado && (
					// Borde más fuerte con el acento principal (#be185d) para destacarlo
					<div className="mt-6 bg-white rounded-lg shadow-lg border-2 border-[#be185d] p-6">
						<h2 className="text-2xl font-bold text-[#be185d] mb-4">
							Editar Usuario
						</h2>
						{/* Lógica original: se pasan las props a EditarUsuario */}
						<EditarUsuario
							usuario={usuarioSeleccionado}
							onCancelar={handleCancelar}
							onGuardar={handleGuardar}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListarUsuarios;
