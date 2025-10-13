import React, { useState } from "react";
import type { Cliente } from "../../../models/entity";

interface EditarClienteProps {
	cliente: Cliente;
	onGuardar: (cliente: Cliente) => void;
	onCancelar: () => void;
}

const EditarCliente: React.FC<EditarClienteProps> = ({
	cliente,
	onGuardar,
	onCancelar,
}) => {
	const [nombreCompleto, setNombreCompleto] = useState(cliente.nombreCompleto);
	const [correo, setCorreo] = useState(cliente.correo);
	const [telefono, setTelefono] = useState(cliente.telefono);

	const handleGuardar = () => {
		onGuardar({ ...cliente, nombreCompleto, correo, telefono });
	};

	return (
		<div>
			<input
				type="text"
				value={nombreCompleto}
				onChange={(e) => setNombreCompleto(e.target.value)}
			/>
			<input
				type="text"
				value={correo}
				onChange={(e) => setCorreo(e.target.value)}
			/>
			<input
				type="text"
				value={telefono}
				onChange={(e) => setTelefono(e.target.value)}
			/>
			<button type="button" onClick={handleGuardar}>
				Guardar
			</button>
			<button type="button" onClick={onCancelar}>
				Cancelar
			</button>
		</div>
	);
};

export default EditarCliente;
