import React, { useState, useEffect } from "react";
import type { Cliente } from "../../../../models/entity";

type EditarClienteProps = {
	cliente: Cliente;
	onGuardar: (clienteActualizado: Cliente) => void;
	onCancelar: () => void;
};

const EditarCliente: React.FC<EditarClienteProps> = ({
	cliente,
	onGuardar,
	onCancelar,
}) => {
	const [form, setForm] = useState<Cliente>(cliente);

	useEffect(() => {
		setForm(cliente);
	}, [cliente]);

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
					name="nombreCompleto"
					value={form.nombreCompleto}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					name="correo"
					type="email"
					value={form.correo}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label>Teléfono:</label>
				<input
					name="telefono"
					value={form.telefono}
					onChange={handleChange}
					required
				/>
			</div>
			<button type="submit">Guardar</button>
			<button type="button" onClick={onCancelar}>
				Cancelar
			</button>
		</form>
	);
};

export default EditarCliente;
