import React, { useState, useEffect } from "react";
import type { Usuario, Cliente, Tecnico } from "../../../../models/entity";
import EditarCliente from "../../components/EditarCliente";
import EditarTecnico from "../../components/EditarTecnico";
import {
	UsuarioApi,
	ClienteApi,
	tecnicoApi,
} from "../../../../service/ApiClient";

type EditarUsuarioProps = {
	usuario: Usuario;
	onGuardar: (usuarioActualizado: Usuario) => void;
	onCancelar: () => void;
};

const EditarUsuario: React.FC<EditarUsuarioProps> = ({
	usuario,
	onGuardar,
	onCancelar,
}) => {
	const [cliente, setCliente] = useState<Cliente | null>(null);
	const [tecnico, setTecnico] = useState<Tecnico | null>(null);
	const [form, setForm] = useState<Usuario>(usuario);

	useEffect(() => {
		setForm(usuario);
		if (usuario.rol === "cliente" && usuario.idCliente) {
			console.log("Recuperando cliente con ID:", usuario.idCliente);
			const recuperarCliente = async () => {
				try {
					if (usuario.idCliente !== undefined && usuario.idCliente !== null) {
						const response = await ClienteApi.obtenerCliente(usuario.idCliente);
						setCliente(response.data);
					}
				} catch (error) {
					console.error("Error al obtener cliente:", error);
				}
			};
			recuperarCliente();
		} else {
			setCliente(null);
		}
		if (usuario.rol === "tecnico" && usuario.idTecnico) {
			const recuperarTecnico = async () => {
				try {
					if (usuario.idTecnico !== undefined && usuario.idTecnico !== null) {
						const response = await tecnicoApi.obtenerTecnico(usuario.idTecnico);
						setTecnico(response.data);
					}
				} catch (error) {
					console.error("Error al obtener técnico:", error);
				}
			};
			recuperarTecnico();
		} else {
			setTecnico(null);
		}
	}, [usuario]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onGuardar(form);
		try {
			if (form.id == null) {
				console.error("ID de usuario inválido para actualizar.");
				return;
			}
			UsuarioApi.actualizarUsuario(form.id, form);
			alert("Usuario actualizado con éxito");
		} catch (error) {
			console.error("Error al actualizar el usuario:", error);
		}
	};

	const handleGuardarCliente = (clienteActualizado: Cliente) => {
		const id = clienteActualizado.id;
		if (id == null) {
			console.error("ID de cliente inválido para actualizar.");
			return;
		}
		const actualizarCliente = async () => {
			try {
				await ClienteApi.actualizarCliente(id, clienteActualizado);
				setCliente(clienteActualizado); // Actualiza el estado local del cliente
				setForm((prev) => ({
					...prev,
					idCliente: clienteActualizado.id,
				}));
			} catch (error) {
				console.error("Error al guardar el cliente:", error);
			}
		};
		actualizarCliente();
	};

	const handleCancelarCliente = () => {
		setCliente(null);
		setForm((prev) => ({
			...prev,
			idCliente: undefined,
			rol: "tecnico", // Cambiar el rol si se elimina el cliente
		}));
	};

	const handleGuardarTecnico = (tecnicoActualizado: Tecnico) => {
		setTecnico(tecnicoActualizado);
		setForm((prev) => ({
			...prev,
			idTecnico: tecnicoActualizado.id,
		}));
	};

	const handleCancelarTecnico = () => {
		setTecnico(null);
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Nombre:</label>
				<input
					name="nombreUsuario"
					value={form.nombreUsuario}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Contraseña:</label>
				<input
					name="contrasena"
					type="password"
					value={form.contrasena}
					onChange={handleChange}
					required
				/>
			</div>

			<div>
				<label>Rol:</label>
				<div>
					<label>
						<input
							type="radio"
							name="rol"
							value="administrador"
							checked={form.rol === "administrador"}
							onChange={handleChange}
							required
						/>
						Administrador
					</label>
					<label>
						<input
							type="radio"
							name="rol"
							value="tecnico"
							checked={form.rol === "tecnico"}
							onChange={handleChange}
						/>
						Técnico
					</label>
					<label>
						<input
							type="radio"
							name="rol"
							value="cliente"
							checked={form.rol === "cliente"}
							onChange={handleChange}
						/>
						Cliente
					</label>
				</div>

				{form.rol === "tecnico" && tecnico && (
					<EditarTecnico
						tecnico={tecnico}
						onGuardar={handleGuardarTecnico}
						onCancelar={handleCancelarTecnico}
					/>
				)}
			</div>
			<div>
				{form.rol === "cliente" && cliente && (
					<EditarCliente
						cliente={cliente}
						onGuardar={handleGuardarCliente}
						onCancelar={handleCancelarCliente}
					/>
				)}
			</div>
			<button type="submit" onClick={handleSubmit}>
				Guardar
			</button>
			<button type="button" onClick={onCancelar}>
				Cancelar
			</button>
		</form>
	);
};

export default EditarUsuario;
