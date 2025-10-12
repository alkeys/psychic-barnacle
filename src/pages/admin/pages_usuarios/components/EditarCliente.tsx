import { useEffect, useState } from "react";

// ...existing code...
export interface EditarClienteProps {
	id?: number; // <-- aceptar id opcional
	onChange: (id: number) => void;
	// ...otras props...
}

const EditarCliente: React.FC<EditarClienteProps> = ({ id, onChange }) => {
	const [localId, setLocalId] = useState<number | "">(id ?? "");

	useEffect(() => {
		setLocalId(id ?? "");
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value === "" ? "" : Number(e.target.value);
		setLocalId(val);
		if (val !== "") onChange(Number(val));
	};

	return (
		<input
			type="number"
			value={localId}
			onChange={handleChange}
			// ...otros atributos...
		/>
	);
};

export default EditarCliente;
// ...existing code...
