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

	// 🔁 Recargar la lista luego de actualizar
	const handleActualizacionExitosa = () => {
		setTecnicoSeleccionado(null);
		fetchTecnicos();
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
		<div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
			<h1 className="text-3xl font-bold mb-8 text-indigo-700 border-b-2 border-indigo-200 pb-2">
				Lista de Técnicos
			</h1>

			{!tecnicoSeleccionado ? (
				<div className="space-y-4">
					{tecnicos.length === 0 ? (
						<p className="text-gray-500">No hay técnicos registrados.</p>
					) : (
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{tecnicos.map((tecnico) => (
								<li
									key={tecnico.id}
									className="p-4 bg-white shadow-lg rounded-lg flex justify-between items-center transition duration-300 hover:shadow-xl"
								>
									<div>
										<p className="font-semibold text-gray-800">
											{tecnico.nombreCompleto}
										</p>
										<p className="text-sm text-indigo-600">
											Especialidad: {tecnico.especialidad}
										</p>
									</div>
									<button
										type="button"
										onClick={() => handleEditar(tecnico)}
										className="py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
									>
										Editar
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			) : (
				<div className="mt-8 p-6 bg-white shadow-2xl rounded-xl border border-gray-200">
					<h2 className="text-2xl font-bold mb-6 text-gray-700">
						Editar Técnico
					</h2>

					<EditarTecnico
						tecnico={tecnicoSeleccionado}
						onCancelar={handleCancelar}
						onGuardar={handleActualizacionExitosa}
					/>
				</div>
			)}
		</div>
	);
};

export default ListarTecnicos;
