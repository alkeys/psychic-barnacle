"use client";

import type React from "react";
import { useEffect, useState } from "react";
import type { Cliente } from "../../../models/entity";
import { ClienteApi } from "../../../service/ApiClient";
// Asegúrate de que este componente use los estilos que definimos antes
import EditarCliente from "../components/EditarCliente";

const ListarClientes: React.FC = () => {
	const [clientes, setClientes] = useState<Cliente[]>([]);
	const [clienteSeleccionado, setClienteSeleccionado] =
		useState<Cliente | null>(null);
	const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejo de carga

	const fetchClientes = async () => {
		setIsLoading(true);
		try {
			const response = await ClienteApi.listarClientes();
			if (response?.data) {
				setClientes(response.data);
			}
		} catch (error) {
			console.error("Error al obtener clientes:", error);
			// Opcional: mostrar un mensaje de error al usuario
		} finally {
			setIsLoading(false);
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
				alert("Cliente eliminado exitosamente.");
			} catch (error) {
				console.error("Error al eliminar el cliente:", error);
				alert("Error al eliminar el cliente.");
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
			alert("Cliente actualizado exitosamente.");
		} catch (error) {
			console.error("Error al guardar el cliente:", error);
			alert("Error al actualizar el cliente.");
		}
	};

	const handleCancelar = () => {
		setClienteSeleccionado(null);
	};

	return (
		// Fondo principal: Rosa Muy Claro (#fdf2f8)
		<div className="min-h-screen bg-[#fdf2f8] p-6 sm:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Título: Acento principal (#be185d) */}
				<h1 className="text-3xl font-extrabold text-[#be185d] mb-6 border-b-2 border-[#f472b6] pb-2">
					Lista de Clientes
				</h1>

				{/* --- SECCIÓN DE LISTADO --- */}
				{!clienteSeleccionado && (
					<div className="bg-white rounded-xl shadow-xl overflow-hidden">
						{isLoading ? (
							// Indicador de Carga
							<div className="p-8 text-center text-gray-500">
								Cargando clientes...
								<span className="animate-pulse ml-2">...</span>
							</div>
						) : clientes.length === 0 ? (
							// Indicador de Lista Vacía
							<div className="p-8 text-center text-gray-500 border border-[#f472b6]">
								<p className="text-xl font-medium mb-2">
									No hay clientes registrados 😔
								</p>
								<p>Agrega un nuevo cliente para verlo aquí.</p>
							</div>
						) : (
							// Lista de Clientes
							<ul className="divide-y divide-[#fbcfe8]">
								{clientes.map((cliente) => (
									<li
										key={cliente.id}
										// Hover: Rosa Pálido (#fbcfe8)
										className="p-4 hover:bg-[#fbcfe8] transition-colors duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
									>
										{/* Información del Cliente */}
										<div className="flex-1 min-w-0">
											<p className="font-semibold text-lg text-[#be185d] truncate">
												{cliente.nombreCompleto}
											</p>
											<div className="text-sm text-[#a21caf] space-x-3 mt-1">
												<span title="Correo Electrónico">
													📧 {cliente.correo}
												</span>
												<span title="Número de Teléfono">
													📞 {cliente.telefono}
												</span>
											</div>
										</div>

										{/* Contenedor de Botones */}
										<div className="flex gap-3">
											{/* Botón Editar */}
											<button
												type="button"
												onClick={() => handleEditar(cliente)}
												className="px-4 py-2 bg-[#be185d] text-white rounded-lg hover:bg-[#a21caf] transition-colors duration-200 font-medium shadow-md"
											>
												Editar
											</button>
											{/* Botón Eliminar (Rojo Destructivo) */}
											<button
												type="button"
												onClick={() => handleEliminar(cliente.id)}
												className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-md"
											>
												Eliminar
											</button>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				)}

				{/* --- SECCIÓN DEL FORMULARIO DE EDICIÓN --- */}
				{clienteSeleccionado && (
					// Borde más fuerte con el acento principal (#be185d) para destacarlo
					<div className="mt-8 bg-white rounded-xl shadow-2xl border-2 border-[#be185d] p-6 sm:p-8">
						<h2 className="text-2xl font-bold text-[#be185d] mb-6">
							Editar Cliente: {clienteSeleccionado.nombreCompleto}
						</h2>
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
