// ...existing code...
import React, { useEffect, useState } from "react";
import type { Usuario } from "../../../models/entity";
import { UsuarioApi } from "../../../service/ApiClient";
import EditarUsuario from "./components/EditarUsuario";

const ListarUsuarios: React.FC = () => {
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

	return (
		<div>
			<h1>Lista de Usuarios</h1>
			<ul>
				{usuarios.map((usuario) => (
					<li key={usuario.id}>
						{usuario.id}, {usuario.nombreUsuario}, {usuario.rol} ,{" "}
						{usuario.idtecnico}, {usuario.idcliente}{" "}
						{/* Botón para seleccionar y editar */}
						<button
							type="button"
							onClick={() => handleSeleccionar(usuario, usuario.id)}
						>
							Editar
						</button>
						{/* Botón para eliminar */}
						<button
							type="button"
							onClick={() =>
								usuario.id !== undefined && handleEliminar(usuario.id)
							}
						>
							Eliminar
						</button>
					</li>
				))}
			</ul>
			{usuarioSeleccionado && (
				<div>
					<h2>Editar Usuario</h2>
					<EditarUsuario
						usuario={usuarioSeleccionado}
						onCancelar={handleCancelar}
						onGuardar={handleGuardar}
					/>
				</div>
			)}
		</div>
	);
};

export default ListarUsuarios;
