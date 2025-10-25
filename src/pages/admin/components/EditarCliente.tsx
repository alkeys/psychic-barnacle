import React, { useState } from "react";
import type { Cliente } from "../../../models/entity";
import { ClienteApi } from "../../../service/ApiClient";

interface EditarClienteProps {
	cliente: Cliente;
}

const EditarCliente: React.FC<EditarClienteProps> = ({ cliente }) => {
	const [nombreCompleto, setNombreCompleto] = useState(cliente.nombreCompleto);
	const [correo, setCorreo] = useState(cliente.correo);
	const [telefono, setTelefono] = useState(cliente.telefono);

	const handleGuardar = async () => {
		try {
			const clienteActualizado: Cliente = {
				...cliente,
				nombreCompleto,
				correo,
				telefono,
			};
			if (
				clienteActualizado.id === undefined ||
				clienteActualizado.id === null
			) {
				alert("No se puede actualizar: el cliente no tiene id");
				return;
			}
			await ClienteApi.actualizarCliente(
				clienteActualizado.id,
				clienteActualizado,
			);
			alert("Cliente actualizado con éxito");
		} catch (error) {
			console.error("Error al actualizar el cliente:", error);
			alert("Hubo un error al actualizar el cliente");
		}
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
		</div>
	);
};

export default EditarCliente;
