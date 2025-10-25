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
					<EditarTecnico tecnico={tecnicoSeleccionado} />
				</div>
			)}
		</div>
	);
};

export default ListarTecnicos;
