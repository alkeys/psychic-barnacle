import React, { useState } from "react";
import type { Cliente, Usuario } from "../models/entity";
import { ClienteApi } from "../service/ApiClient";

const Home: React.FC = () => {
	const [clientes, setClientes] = useState<Cliente[]>([]);

	const funcionTraerClientes = async () => {
		const response = await ClienteApi.listarClientes();
		setClientes(response.data);

		const loginUser: Usuario = {
			nombreUsuario: "juan.perez",
			rol: "cliente",
			contrasena: "password123",
		};
	};

	return (
		<div style={{ padding: "2rem", textAlign: "center" }}>
			<h1>Bienvenido a la Aplicación</h1>
		</div>
	);
};

export default Home;
