import React, { useEffect, useState } from "react";
import ListarUsuarios from "./pages_usuarios/Listarusuarios";

const Usuarios: React.FC = () => {
	const [activeTab, setActiveTab] = useState("dashboard");

	useEffect(() => {}, []);

	const renderContent = () => {
		switch (activeTab) {
			case "listar":
				return <ListarUsuarios />;
			// case "agregar":

			default:
				return <ListarUsuarios />;
		}
	};

	const navItems = [{ id: "listar", label: "Listar Usuarios" }];

	return (
		<div>
			<nav
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderBottom: "1px solid #f472b6", // rosa claro
					padding: "1rem",
					backgroundColor: "#fdf2f8", // fondo rosa muy claro
				}}
			>
				<div>
					{navItems.map((item) => (
						<button
							type="button"
							key={item.id}
							onClick={() => setActiveTab(item.id)}
							style={{
								padding: "0.5rem 1rem",
								marginRight: "0.5rem",
								border: "1px solid transparent",
								borderRadius: "0.375rem",
								cursor: "pointer",
								fontWeight: activeTab === item.id ? "600" : "normal",
								color: activeTab === item.id ? "#be185d" : "#a21caf", // rosa fuerte y rosa medio
								backgroundColor:
									activeTab === item.id ? "#fbcfe8" : "transparent", // rosa claro
							}}
						>
							{item.label}
						</button>
					))}
				</div>
			</nav>
			<main style={{ padding: "1.5rem", backgroundColor: "#fdf2f8" }}>
				{renderContent()}
			</main>
		</div>
	);
};

export default Usuarios;
