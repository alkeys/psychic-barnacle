// Archivo: ../components/EditarCliente.tsx
import React, { useState } from "react";
import type { Cliente } from "../../../models/entity";

interface EditarClienteProps {
	cliente: Cliente;
	onGuardar: (clienteActualizado: Cliente) => void;
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
	const [isSaving, setIsSaving] = useState(false); // Nuevo estado para manejo de carga

	// Esta función ahora solo prepara los datos y llama a la prop onGuardar
	const handleGuardarClick = () => {
		if (isSaving) return;

		setIsSaving(true);
		const clienteActualizado: Cliente = {
			...cliente,
			nombreCompleto,
			correo,
			telefono,
		};
		// Llama a la función del padre (ListarClientes.handleGuardar)
		onGuardar(clienteActualizado);
		// Simulación de fin de guardado
		setTimeout(() => setIsSaving(false), 500);
	};

	return (
		<div className="space-y-4">
			{/* Input: Nombre Completo */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Nombre Completo
				</label>
				<input
					type="text"
					value={nombreCompleto}
					onChange={(e) => setNombreCompleto(e.target.value)}
					className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be185d] transition-colors duration-200"
					placeholder="Nombre Completo del Cliente"
					disabled={isSaving}
				/>
			</div>

			{/* Input: Correo */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Correo Electrónico
				</label>
				<input
					type="email"
					value={correo}
					onChange={(e) => setCorreo(e.target.value)}
					className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be185d] transition-colors duration-200"
					placeholder="ejemplo@correo.com"
					disabled={isSaving}
				/>
			</div>

			{/* Input: Teléfono */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Teléfono
				</label>
				<input
					type="tel"
					value={telefono}
					onChange={(e) => setTelefono(e.target.value)}
					className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be185d] transition-colors duration-200"
					placeholder="Número de Teléfono"
					disabled={isSaving}
				/>
			</div>

			{/* Contenedor de botones */}
			<div className="flex justify-end gap-3 pt-4">
				{/* Botón de Cancelar (Ajustado a la paleta) */}
				<button
					type="button"
					onClick={onCancelar}
					className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50"
					disabled={isSaving}
				>
					Cancelar
				</button>
				{/* Botón de Guardar (Ajustado a la paleta) */}
				<button
					type="button"
					onClick={handleGuardarClick}
					className={`px-4 py-2 text-white rounded-lg font-semibold transition-colors duration-200 shadow-md ${
						isSaving
							? "bg-[#a21caf] opacity-70 cursor-not-allowed"
							: "bg-[#be185d] hover:bg-[#a21caf] focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:ring-offset-2"
					}`}
					disabled={isSaving}
				>
					{isSaving ? "Guardando..." : "Guardar Cambios"}
				</button>
			</div>
		</div>
	);
};

export default EditarCliente;
