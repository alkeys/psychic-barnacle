"use client";

import type React from "react";
import { useEffect, useState } from "react";
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

	// Lógica original mantenida (sin botón de eliminar en la UI)
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

	// Lógica original mantenida
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

	// Lógica original mantenida
	const handleCancelar = () => {
		setClienteSeleccionado(null);
	};

	return (
		// Fondo principal: Rosa Muy Claro (#fdf2f8)
		<div className="min-h-screen bg-[#fdf2f8] p-6 sm:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Título: Acento principal (#be185d) */}
				<h1 className="text-3xl font-bold text-[#be185d] mb-6">
					Lista de Clientes
				</h1>

				{/* Contenedor de lista: Fondo blanco, borde y división Rosa Claro (#f472b6) */}
				<ul className="bg-white rounded-lg shadow-md border border-[#f472b6] divide-y divide-[#f472b6]">
					{clientes.map((cliente) => (
						<li
							key={cliente.id}
							// Hover: Rosa Pálido (#fbcfe8)
							className="p-4 hover:bg-[#fbcfe8] transition-colors duration-200 flex items-center justify-between"
						>
							<div className="flex-1">
								{/* Texto principal: Acento principal (#be185d) */}
								<span className="font-semibold text-[#be185d]">
									{cliente.nombreCompleto}
								</span>
								{/* Texto secundario: Rosa Medio/Púrpura (#a21caf) */}
								<span className="text-[#a21caf] ml-2">- {cliente.correo}</span>
								<span className="text-[#a21caf] ml-2">
									- {cliente.telefono}
								</span>
							</div>

							{/* Botón: Acento principal (#be185d) y texto Blanco (#fff) */}
							{/* Hover del botón: Usamos el color secundario (#a21caf) para el hover */}
							<button
								type="button"
								onClick={() => handleEditar(cliente)}
								className="ml-4 px-4 py-2 bg-[#be185d] text-white rounded-md hover:bg-[#a21caf] transition-colors duration-200 font-medium"
							>
								Editar
							</button>
						</li>
					))}
				</ul>

				{/* Contenedor del formulario de edición */}
				{clienteSeleccionado && (
					// Borde más fuerte con el acento principal (#be185d) para destacarlo
					<div className="mt-6 bg-white rounded-lg shadow-lg border-2 border-[#be185d] p-6">
						<h2 className="text-2xl font-bold text-[#be185d] mb-4">
							Editar Cliente
						</h2>
						{/* Lógica original: no se pasan props onGuardar/onCancelar */}
						<EditarCliente
							cliente={clienteSeleccionado}
							onGuardar={handleGuardar}
							onCancelar={handleCancelar}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListarClientes;
