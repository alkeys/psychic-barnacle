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
	const [form, setForm] = useState<Usuario>({ ...usuario }); // copia inicial

	// 🔁 Efecto: actualiza cuando cambia el usuario
	useEffect(() => {
		const u = { ...usuario }; // clona para evitar referencia compartida
		setForm(u);
		setCliente(null);
		setTecnico(null);

		const cargarDatos = async () => {
			try {
				if (u.rol === "cliente" && u.idCliente) {
					console.log("Recuperando cliente con ID:", u.idCliente);
					const response = await ClienteApi.obtenerCliente(u.idCliente);
					setCliente(response.data);
				}
				if (u.rol === "tecnico" && u.idTecnico) {
					console.log("Recuperando técnico con ID:", u.idTecnico);
					const response = await tecnicoApi.obtenerTecnico(u.idTecnico);
					setTecnico(response.data);
				}
			} catch (error) {
				console.error("Error al cargar datos del usuario:", error);
			}
		};

		cargarDatos();

		// cleanup: evita que setState afecte cuando se cambia de usuario
		return () => {
			setCliente(null);
			setTecnico(null);
		};
	}, [usuario]);

	// 🧩 Manejo de cambios en inputs
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// 💾 Guardar usuario
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (form.id == null) {
			console.error("ID de usuario inválido para actualizar.");
			return;
		}

		try {
			await UsuarioApi.actualizarUsuario(form.id, form);
			onGuardar(form);
			alert("✅ Usuario actualizado con éxito");
		} catch (error) {
			console.error("Error al actualizar el usuario:", error);
			alert("❌ Error al actualizar el usuario");
		}
	};

	// 🧍 Guardar cliente
	const handleGuardarCliente = (clienteActualizado: Cliente) => {
		if (clienteActualizado.id == null) {
			console.error("ID de cliente inválido para actualizar.");
			return;
		}
		const actualizarCliente = async () => {
			try {
				if (form.id == null || clienteActualizado.id == null) {
					console.error("ID de usuario inválido para actualizar.");
					return;
				}
				await ClienteApi.actualizarCliente(
					clienteActualizado.id,
					clienteActualizado,
				);
				setCliente(clienteActualizado);
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
			rol: "tecnico", // cambia a técnico si se borra cliente
		}));
	};

	// 🔧 Guardar técnico
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
					value={form.nombreUsuario || ""}
					onChange={handleChange}
					required
				/>
			</div>

			<div>
				<label>Contraseña:</label>
				<input
					name="contrasena"
					type="password"
					value={form.contrasena || ""}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label>Rol:</label>
				<div>
					{form.rol === "administrador" && (
						<label>
							<input
								type="radio"
								name="rol"
								value="administrador"
								checked={form.rol === "administrador"}
								onChange={handleChange}
							/>
							Administrador
						</label>
					)}
					{form.rol === "tecnico" && tecnico && (
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
					)}
					{form.rol === "cliente" && cliente && (
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
					)}
				</div>
			</div>

			{/* 🔹 Si es técnico, muestra su editor */}
			{form.rol === "tecnico" && tecnico && (
				<EditarTecnico
					tecnico={tecnico}
					onGuardar={handleGuardarTecnico}
					onCancelar={handleCancelarTecnico}
				/>
			)}

			{/* 🔹 Si es cliente, muestra su editor */}
			{form.rol === "cliente" && cliente && (
				<EditarCliente
					cliente={cliente}
					onGuardar={handleGuardarCliente}
					onCancelar={handleCancelarCliente}
				/>
			)}

			<div style={{ marginTop: "1rem" }}>
				<button type="submit">Guardar</button>
				<button
					type="button"
					onClick={onCancelar}
					style={{ marginLeft: "0.5rem" }}
				>
					Cancelar
				</button>
			</div>
		</form>
	);
};

export default EditarUsuario;
