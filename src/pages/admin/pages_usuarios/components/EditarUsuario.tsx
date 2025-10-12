import React, { useState, useEffect } from "react";
import type { Usuario } from "../../../../models/entity";
import EditarCliente from "./EditarCliente";
import EditarTecnico from "./EditarTecnico";

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
	const [form, setForm] = useState<Usuario>(usuario);

	useEffect(() => {
		setForm(usuario);
		console.log("Usuario en EditarUsuario:", usuario);
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
				<label>ID Técnico:</label>
				<EditarTecnico id={form.idtecnico ?? ""} />
			</div>
			<div>
				<label>ID Cliente:</label>
				<EditarCliente
					id={form.idcliente}
					onChange={(id) => setForm((prev) => ({ ...prev, idcliente: id }))}
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
