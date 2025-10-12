// ...existing code...
import React, { useEffect, useState } from "react";
import type { Cliente } from "../../../models/entity";
import { ClienteApi } from "../../../service/ApiClient";
import EditarCliente from "./components/EditarCliente";

const ListarClientes: React.FC = () => {
	const [clientes, setClientes] = useState<Cliente[]>([]);
	const [clienteSeleccionado, setClienteSeleccionado] =
		useState<Cliente | null>(null);
	const [idSeleccionado, setIdSeleccionado] = useState<number | null>(null);

	useEffect(() => {
		// Simulación de carga de datos
		const fetchClientes = async () => {
			const response = await ClienteApi.listarClientes();
			if (response?.data) {
				setClientes(response.data);
			}
		};
		fetchClientes();
		console.log(clientes);
	}, []);

	const handleSeleccionar = (cliente: Cliente, id: number | undefined) => {
		setClienteSeleccionado(cliente);
		if (id !== undefined) {
			setIdSeleccionado(id);
		}
	};

	const handleCancelar = () => {
		setClienteSeleccionado(null);
	};

	const handleGuardar = async (clienteActualizado: Cliente) => {
		// Intentar actualizar en API si existe el método
		try {
			let actualizado = clienteActualizado;
			if (typeof ClienteApi.actualizarCliente === "function") {
				if (idSeleccionado === null) {
					throw new Error("ID del cliente no seleccionado");
				}
				const resp = await ClienteApi.actualizarCliente(
					idSeleccionado,
					clienteActualizado,
				);
				if (resp?.data) {
					actualizado = resp.data;
				}
			}
			setClientes((prev) =>
				prev.map((c) => (c.id === actualizado.id ? actualizado : c)),
			);
		} catch (err) {
			console.error("Error al guardar cliente:", err);
		} finally {
			setClienteSeleccionado(null);
		}
	};

	return (
		<div>
			<h1>Lista de Clientes</h1>
			<ul>
				{clientes.map((cliente) => (
					<li key={cliente.id}>
						{cliente.id}, {cliente.nombreCompleto} - {cliente.correo} -{" "}
						{cliente.telefono}
						<button
							type="button"
							onClick={() => handleSeleccionar(cliente, cliente.id)}
						>
							Editar
						</button>
					</li>
				))}
			</ul>

			{clienteSeleccionado && (
				<div>
					<h2>Editar Cliente {clienteSeleccionado.id}</h2>
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
