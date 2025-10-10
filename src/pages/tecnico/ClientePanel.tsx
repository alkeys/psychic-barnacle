"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// Importación de componentes
import Dashboard from "./Dashboard";
export default function TecnicoPanel() {
	const [activeTab, setActiveTab] = useState("dashboard");
	const { currentUser, logout } = useAuth();

	useEffect(() => {}, []);

	const cerrarSesion = () => {
		logout();
	};

	const renderContent = () => {
		switch (activeTab) {
			case "dashboard":
				return <Dashboard />;

			default:
				return <Dashboard />;
		}
	};

	const navItems = [{ id: "dashboard", label: "Dashboard" }];

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
				<div style={{ display: "flex", alignItems: "center" }}>
					<span style={{ marginRight: "1rem", color: "#be185d" }}>
						Hola, {currentUser?.nombreUsuario || "Admin"}
					</span>
					<button
						type="button"
						onClick={cerrarSesion}
						style={{
							padding: "0.5rem 1rem",
							border: "1px solid #be185d",
							borderRadius: "0.375rem",
							color: "#fff",
							backgroundColor: "#be185d",
							cursor: "pointer",
						}}
					>
						Cerrar Sesión
					</button>
				</div>
			</nav>
			<main style={{ padding: "1.5rem", backgroundColor: "#fdf2f8" }}>
				{renderContent()}
			</main>
		</div>
	);
}
