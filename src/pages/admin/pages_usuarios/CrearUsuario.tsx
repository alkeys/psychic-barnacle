import React, { useState } from "react";
import type { Usuario, Tecnico, Cliente } from "../../../models/entity";
import { UsuarioApi, ClienteApi, tecnicoApi } from "../../../service/ApiClient";

const CrearUsuario: React.FC = () => {
	const [usuario, setUsuario] = useState<Usuario>({
		nombreUsuario: "",
		contrasena: "",
		rol: "cliente", // valor por defecto
	});
	const [tecnico, setTecnico] = useState<Tecnico>({
		activo: true,
		nombreCompleto: "",
		especialidad: "",
		usuarioId: 0,
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

	const handlerCrearTecnico = async (usuarioId: number, tecnico: Tecnico) => {
		let intentos = 0;
		let exito = false;
		let response = null;

		while (intentos < 2 && !exito) {
			try {
				console.log(`🔄 Intento ${intentos + 1}: Creando técnico...`);
				response = await tecnicoApi.crearTecnico({
					...tecnico,
					usuarioId,
				});

				if (response.status === 201) {
					exito = true;
					console.log("✅ Técnico creado:", response.data);
				} else {
					console.warn("⚠️ Respuesta inesperada:", response);
				}
			} catch (error) {
				console.error(
					`❌ Error al crear técnico (intento ${intentos + 1}):`,
					error,
				);
			}

			if (!exito) {
				await new Promise((res) => setTimeout(res, 1000)); // Espera antes del siguiente intento
			}
			intentos++;
		}

		if (exito && response) {
			alert("✅ Técnico creado exitosamente");
		} else {
			alert("❌ No se pudo crear el técnico después de 2 intentos");
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
				await new Promise((res) => setTimeout(res, 1000)); // espera 1 segundo antes de reintentar
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

			// Esperar 1 segundo entre intentos si falló
			if (!exito) {
				await new Promise((res) => setTimeout(res, 1000));
			}
			intentos++;
		}

		if (!exito || !response) {
			alert("❌ No se pudo crear el usuario después de 2 intentos");
			return;
		}

		// ✅ Si se creó correctamente
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

		// 🔹 Limpiar formulario
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
		<div>
			<h1>Crear Usuario</h1>

			<label>Nombre de Usuario:</label>
			<input
				type="text"
				name="nombreUsuario"
				value={usuario.nombreUsuario}
				onChange={handleChange}
			/>
			<br />

			<label>Contraseña:</label>
			<input
				type="password"
				name="contrasena"
				value={usuario.contrasena}
				onChange={handleChange}
			/>
			<br />

			<label>Rol:</label>
			<select name="rol" value={usuario.rol} onChange={handleChange}>
				<option value="administrador">Administrador</option>
				<option value="tecnico">Técnico</option>
				<option value="cliente">Cliente</option>
			</select>
			<br />

			{/* en esta parte mostrara la parte para crear un tecnico o cliente dependiento de que lo que seleciono */}
			{usuario.rol === "tecnico" && (
				<div>
					<h2>Crear Técnico</h2>
					<label>Nombre de Técnico:</label>
					<input
						type="text"
						name="nombreCompleto"
						value={tecnico.nombreCompleto || ""}
						onChange={handleChangeTecnico}
					/>
					<label>Especialidad:</label>
					<select
						name="especialidad"
						value={tecnico.especialidad || ""}
						onChange={handleChangeTecnico}
					>
						<option value="">Seleccione una especialidad</option>
						<option value="Hardware">Hardware</option>
						<option value="Software">Software</option>
						<option value="Redes">Redes</option>
						<option value="Periféricos">Periféricos</option>
					</select>
				</div>
			)}

			{usuario.rol === "cliente" && (
				<div>
					<h2>Crear Cliente</h2>
					<label>Nombre de Cliente:</label>
					<input
						type="text"
						name="nombreCompleto"
						value={cliente.nombreCompleto || ""}
						onChange={handleChangeCliente}
					/>
					<label>Correo:</label>
					<input
						type="email"
						name="correo"
						value={cliente.correo || ""}
						onChange={handleChangeCliente}
					/>
					<label>Teléfono:</label>
					<input
						type="tel"
						name="telefono"
						value={cliente.telefono || ""}
						onChange={handleChangeCliente}
					/>
				</div>
			)}

			<button type="button" onClick={handlerCrear}>
				Crear Usuario
			</button>
		</div>
	);
};

export default CrearUsuario;
