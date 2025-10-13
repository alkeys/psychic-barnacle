import React, { useState, useEffect } from "react";
import type { Usuario, Cliente, Tecnico } from "../../../../models/entity";
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
	const [idcliente, setIdcliente] = useState<number | null>(
		usuario.idcliente ?? null,
	);
	const [idtecnico, setIdtecnico] = useState<number | null>(
		usuario.idtecnico ?? null,
	);

	useEffect(() => {
		setForm(usuario);
		setIdcliente(usuario.idCliente ?? null);
		setIdtecnico(usuario.idTecnico ?? null);
		if (usuario.rol === "cliente" && idcliente) {
			console.log("Recuperando cliente con ID:", idcliente);
			const recuperarCliente = async () => {
				try {
					if (idcliente !== undefined && idcliente !== null) {
						const response = await ClienteApi.obtenerCliente(idcliente);
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
		if (usuario.rol === "tecnico" && idtecnico) {
			const recuperarTecnico = async () => {
				try {
					if (idtecnico !== undefined && idtecnico !== null) {
						const response = await tecnicoApi.obtenerTecnico(idtecnico);
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
			</div>
			<button type="submit">Guardar</button>
			<button type="button" onClick={onCancelar}>
				Cancelar
			</button>
		</form>
	);
};

export default EditarUsuario;
