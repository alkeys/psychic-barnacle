import React, { useState } from "react";
import type { Tecnico } from "../../../models/entity";

interface EditarTecnicoProps {
	tecnico: Tecnico;
	onGuardar: (tecnico: Tecnico) => void;
	onCancelar: () => void;
}

const EditarTecnico: React.FC<EditarTecnicoProps> = ({
	tecnico,
	onGuardar,
	onCancelar,
}) => {
	const [nombreCompleto, setNombreCompleto] = useState(tecnico.nombreCompleto);
	const [especialidad, setEspecialidad] = useState(tecnico.especialidad);

	const handleGuardar = () => {
		onGuardar({ ...tecnico, nombreCompleto, especialidad });
	};

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
			<button type="button" onClick={onCancelar}>
				Cancelar
			</button>
		</div>
	);
};

export default EditarTecnico;
