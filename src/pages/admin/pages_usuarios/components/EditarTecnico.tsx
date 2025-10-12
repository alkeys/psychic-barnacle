import React from "react";

type Props = {
	id: string | number;
};

const EditarTecnico: React.FC<Props> = ({ id }) => {
	console.log("ID en EditarTecnico:", id);
	return (
		<div style={{ padding: "1rem" }}>
			<h1>Editar Técnico</h1>
			<p>ID recibido: {String(id)}</p>
		</div>
	);
};

export default EditarTecnico;
