import React from "react";
import ListarTecnicos from "./pages_tecnicos/ListarTecnicos";

const Tecnicos: React.FC = () => {
	return (
		<div>
			<h1 className="text-2xl font-bold">Gestión de Técnicos</h1>
			<ListarTecnicos />
		</div>
	);
};

export default Tecnicos;
