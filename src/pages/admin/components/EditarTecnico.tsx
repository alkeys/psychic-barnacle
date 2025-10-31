import React, { useState } from "react";
import type { Tecnico } from "../../../models/entity";
import { tecnicoApi } from "../../../service/ApiClient";

interface EditarTecnicoProps {
	tecnico: Tecnico;
	onCancel: () => void; // Función para manejar la cancelación (ocultar el formulario)
	onSave: () => void; // Función para manejar el guardado exitoso (recargar lista)
}

const EditarTecnico: React.FC<EditarTecnicoProps> = ({
	tecnico,
	onCancel,
	onSave,
}) => {
	const [nombreCompleto, setNombreCompleto] = useState(tecnico.nombreCompleto);
	const [especialidad, setEspecialidad] = useState(tecnico.especialidad);
	const [isSaving, setIsSaving] = useState(false); // Estado para deshabilitar botón mientras se guarda

	const handleGuardar = async () => {
		if (isSaving) return; // Evita múltiples clics

		setIsSaving(true);
		console.log("Guardando técnico con ID:", tecnico.id);

		try {
			const tecnicoActualizado: Tecnico = {
				...tecnico,
				nombreCompleto,
				especialidad,
			};

			if (!tecnico.id) {
				throw new Error("El técnico no tiene un ID válido.");
			}

			await tecnicoApi.actualizarTecnico(tecnico.id, tecnicoActualizado);
			alert("Técnico actualizado correctamente");
			onSave(); // Llama a la función de guardado exitoso (para recargar la lista y cerrar el formulario)
		} catch (error) {
			console.error("Error al actualizar el técnico:", error);
			alert("Error al actualizar el técnico");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className="space-y-4">
			{/* El h2 estaba aquí, pero se movió a ListarTecnicos para evitar repetición */}
			<div className="mb-4">
				<label className="block mb-1 font-medium text-gray-700">
					Nombre Completo:
				</label>
				<input
					type="text"
					value={nombreCompleto}
					onChange={(e) => setNombreCompleto(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					disabled={isSaving}
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-medium text-gray-700">
					Especialidad:
				</label>
				<input
					type="text"
					value={especialidad}
					onChange={(e) => setEspecialidad(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					disabled={isSaving}
				/>
			</div>
			<div className="flex justify-end space-x-3 pt-2">
				<button
					type="button"
					onClick={onCancel}
					className="py-2 px-4 bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150"
					disabled={isSaving}
				>
					Cancelar
				</button>
				<button
					type="button"
					onClick={handleGuardar}
					className={`py-2 px-4 text-white font-medium rounded-lg shadow-md transition duration-150 ${
						isSaving
							? "bg-indigo-400 cursor-not-allowed"
							: "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
					}`}
					disabled={isSaving}
				>
					{isSaving ? "Guardando..." : "Guardar Cambios"}
				</button>
			</div>
		</div>
	);
};

export default EditarTecnico;
