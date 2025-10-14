import React, { useEffect, useState } from "react";
import type { Tecnico } from "../../../models/entity";
import { tecnicoApi } from "../../../service/ApiClient";
import EditarTecnico from "../components/EditarTecnico";

const ListarTecnicos: React.FC = () => {
	const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
	const [tecnicoSeleccionado, setTecnicoSeleccionado] =
		useState<Tecnico | null>(null);

	const fetchTecnicos = async () => {
		try {
			const response = await tecnicoApi.listarTecnicos();
			if (response?.data) {
				setTecnicos(response.data);
			}
		} catch (error) {
			console.error("Error al obtener tecnicos:", error);
		}
	};

	useEffect(() => {
		fetchTecnicos();
	}, []);

	const handleEditar = (tecnico: Tecnico) => {
		setTecnicoSeleccionado(tecnico);
	};

	const handleEliminar = async (id?: number) => {
		if (id === undefined || id === null) {
			console.error("El técnico no tiene un ID válido para eliminar.");
			return;
		}
		const confirmation = window.confirm(
			"¿Estás seguro de que deseas eliminar este tecnico?",
		);
		if (confirmation) {
			try {
				await tecnicoApi.eliminarTecnico(id);
				fetchTecnicos(); // Recargar la lista de tecnicos
			} catch (error) {
				console.error("Error al eliminar el tecnico:", error);
			}
		}
	};

	const handleGuardar = async (tecnicoActualizado: Tecnico) => {
		const { id } = tecnicoActualizado;
		if (id === undefined || id === null) {
			console.error("El técnico no tiene un ID válido para actualizar.");
			return;
		}

		try {
			await tecnicoApi.actualizarTecnico(id, tecnicoActualizado);
			setTecnicoSeleccionado(null); // Ocultar el formulario de edición
			fetchTecnicos(); // Recargar la lista de tecnicos
		} catch (error) {
			console.error("Error al guardar el tecnico:", error);
		}
	};

	const handleCancelar = () => {
		setTecnicoSeleccionado(null);
	};

	return (
		<div>
			<h1>Lista de Tecnicos</h1>
			<ul>
				{tecnicos.map((tecnico) => (
					<li key={tecnico.id}>
						{tecnico.nombreCompleto} - {tecnico.especialidad}
						<button type="button" onClick={() => handleEditar(tecnico)}>
							Editar
						</button>
					</li>
				))}
			</ul>

			{tecnicoSeleccionado && (
				<div>
					<h2>Editar Tecnico</h2>
					<EditarTecnico
						tecnico={tecnicoSeleccionado}
						onGuardar={handleGuardar}
						onCancelar={handleCancelar}
					/>
				</div>
			)}
		</div>
	);
};

export default ListarTecnicos;
