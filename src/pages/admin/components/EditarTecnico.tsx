import React, { useState } from "react";
import type { Tecnico } from "../../../models/entity";
import { tecnicoApi } from "../../../service/ApiClient";
interface EditarTecnicoProps {
	tecnico: Tecnico;
}

const EditarTecnico: React.FC<EditarTecnicoProps> = ({ tecnico }) => {
	const [nombreCompleto, setNombreCompleto] = useState(tecnico.nombreCompleto);
	const [especialidad, setEspecialidad] = useState(tecnico.especialidad);

	const handleGuardar = () => {
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
			tecnicoApi
				.actualizarTecnico(tecnico.id, tecnicoActualizado)
				.then(() => {
					alert("Técnico actualizado correctamente");
				})
				.catch((error) => {
					console.error("Error al actualizar el técnico:", error);
					alert("Error al actualizar el técnico");
				});
		} catch (error) {
			console.error("Error al actualizar el técnico:", error);
			alert("Error al actualizar el técnico");
		}
	};

	const onCancelar = () => {};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Editar Técnico</h2>
			<label className="block mb-2 font-semibold">Nombre Completo:</label>
			<input
				type="text"
				value={nombreCompleto}
				onChange={(e) => setNombreCompleto(e.target.value)}
			/>
			<label className="block mb-2 font-semibold">Especialidad:</label>
			<input
				type="text"
				value={especialidad}
				onChange={(e) => setEspecialidad(e.target.value)}
			/>
			<button type="button" onClick={handleGuardar}>
				Guardar
			</button>
		</div>
	);
};

export default EditarTecnico;
