// Archivo: ../components/EditarCliente.tsx

import React, { useState } from "react";
import type { Cliente } from "../../../models/entity";
// Ya no necesitamos ClienteApi aquí, el padre se encargará.
// import { ClienteApi } from "../../../service/ApiClient";

interface EditarClienteProps {
	cliente: Cliente;
	onGuardar: (clienteActualizado: Cliente) => void; // Prop para notificar al padre que guarde
	onCancelar: () => void; // Prop para notificar al padre que cancele
}

const EditarCliente: React.FC<EditarClienteProps> = ({
	cliente,
	onGuardar, // Recibimos la función del padre
	onCancelar, // Recibimos la función del padre
}) => {
	const [nombreCompleto, setNombreCompleto] = useState(cliente.nombreCompleto);
	const [correo, setCorreo] = useState(cliente.correo);
	const [telefono, setTelefono] = useState(cliente.telefono);

	// Esta función ahora solo prepara los datos y llama a la prop onGuardar
	const handleGuardarClick = () => {
		const clienteActualizado: Cliente = {
			...cliente,
			nombreCompleto,
			correo,
			telefono,
		};
		// Llama a la función del padre (ListarClientes.handleGuardar)
		onGuardar(clienteActualizado);
	};

	return (
		<div>
			{/* Inputs sin cambios */}
			<input
				type="text"
				value={nombreCompleto}
				onChange={(e) => setNombreCompleto(e.target.value)}
				className="block w-full p-2 border border-gray-300 rounded-md mb-2"
				placeholder="Nombre Completo"
			/>
			<input
				type="text"
				value={correo}
				onChange={(e) => setCorreo(e.target.value)}
				className="block w-full p-2 border border-gray-300 rounded-md mb-2"
				placeholder="Correo"
			/>
			<input
				type="text"
				value={telefono}
				onChange={(e) => setTelefono(e.target.value)}
				className="block w-full p-2 border border-gray-300 rounded-md mb-4"
				placeholder="Teléfono"
			/>

			{/* Contenedor de botones */}
			<div className="flex justify-end gap-3">
				{/* Botón de Cancelar (nuevo) */}
				<button
					type="button"
					onClick={onCancelar} // Llama a la prop del padre
					className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
				>
					Cancelar
				</button>
				{/* Botón de Guardar (actualizado) */}
				<button
					type="button"
					onClick={handleGuardarClick} // Llama a nuestra función interna
					className="px-4 py-2 bg-[#be185d] text-white rounded-md hover:bg-[#a21caf] transition-colors duration-200"
				>
					Guardar
				</button>
			</div>
		</div>
	);
};

export default EditarCliente;
