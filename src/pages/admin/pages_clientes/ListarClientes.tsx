import React, { useEffect, useState } from "react";
import type { Cliente } from "../../../models/entity";
import { ClienteApi } from "../../../service/ApiClient";
import EditarCliente from "../components/EditarCliente";

const ListarClientes: React.FC = () => {
	const [clientes, setClientes] = useState<Cliente[]>([]);
	const [clienteSeleccionado, setClienteSeleccionado] =
		useState<Cliente | null>(null);

	const fetchClientes = async () => {
		try {
			const response = await ClienteApi.listarClientes();
			if (response?.data) {
				setClientes(response.data);
			}
		} catch (error) {
			console.error("Error al obtener clientes:", error);
		}
	};

	useEffect(() => {
		fetchClientes();
	}, []);

	const handleEditar = (cliente: Cliente) => {
		setClienteSeleccionado(cliente);
	};

	const handleEliminar = async (id?: number) => {
		if (id == null) {
			console.error("ID de cliente inválido para eliminar.");
			return;
		}
		const confirmation = window.confirm(
			"¿Estás seguro de que deseas eliminar este cliente?",
		);
		if (confirmation) {
			try {
				await ClienteApi.eliminarCliente(id);
				fetchClientes(); // Recargar la lista de clientes
			} catch (error) {
				console.error("Error al eliminar el cliente:", error);
			}
		}
	};

	const handleGuardar = async (clienteActualizado: Cliente) => {
		const id = clienteActualizado.id;
		if (id == null) {
			console.error("ID de cliente inválido para actualizar.");
			return;
		}
		try {
			await ClienteApi.actualizarCliente(id, clienteActualizado);
			setClienteSeleccionado(null); // Ocultar el formulario de edición
			fetchClientes(); // Recargar la lista de clientes
		} catch (error) {
			console.error("Error al guardar el cliente:", error);
		}
	};

	const handleCancelar = () => {
		setClienteSeleccionado(null);
	};

	return (
		<div>
			<h1>Lista de Clientes</h1>
			<ul>
				{clientes.map((cliente) => (
					<li key={cliente.id}>
						{cliente.nombreCompleto} - {cliente.correo} - {cliente.telefono}
						<button type="button" onClick={() => handleEditar(cliente)}>
							Editar
						</button>
						<button type="button" onClick={() => handleEliminar(cliente.id)}>
							Eliminar
						</button>
					</li>
				))}
			</ul>

			{clienteSeleccionado && (
				<div>
					<h2>Editar Cliente</h2>
					<EditarCliente
						cliente={clienteSeleccionado}
						onGuardar={handleGuardar}
						onCancelar={handleCancelar}
					/>
				</div>
			)}
		</div>
	);
};

export default ListarClientes;
