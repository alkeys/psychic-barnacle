"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// Importación de componentes
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import ListarTickets from "./components/Listatickets";

export default function TecnicoPanel() {
	const [activeTab, setActiveTab] = useState("dashboard");
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {}, []);

	const cerrarSesion = () => {
		logout();
		navigate("/login");
		//borrar token del almacenamiento local
		window.localStorage.removeItem("token");
	};

	const renderContent = () => {
		switch (activeTab) {
			case "dashboard":
				return <Dashboard />;
			case "tickets":
				return <ListarTickets />;

			default:
				return <Dashboard />;
		}
	};

	const navItems = [
		{ id: "dashboard", label: "Dashboard", icon: "📊" },
		{ id: "tickets", label: "Tickets", icon: "🎟️" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fdf2f8] to-[#fbcfe8]/30">
			<nav className="sticky top-0 z-50 border-b border-[#f472b6]/20 bg-white/80 backdrop-blur-xl shadow-lg shadow-[#f472b6]/5">
				<div className="mx-auto max-w-7xl px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-8">
							<div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-700">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#be185d] to-[#a21caf] shadow-lg shadow-[#be185d]/30">
									<span className="text-xl font-bold text-white">A</span>
								</div>
								<span className="text-xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
									Panel Técnico
								</span>
							</div>

							<div className="hidden md:flex items-center gap-2">
								{navItems.map((item, index) => (
									<button
										type="button"
										key={item.id}
										onClick={() => setActiveTab(item.id)}
										style={{
											animationDelay: `${index * 100}ms`,
										}}
										className={`
                      group relative overflow-hidden rounded-xl px-4 py-2.5 font-medium
                      transition-all duration-300 ease-out
                      animate-in fade-in slide-in-from-top
                      ${
												activeTab === item.id
													? "bg-gradient-to-r from-[#be185d] to-[#a21caf] text-white shadow-lg shadow-[#be185d]/30 scale-105"
													: "text-[#a21caf] hover:bg-[#fbcfe8]/80 hover:text-[#be185d] hover:scale-105 hover:shadow-md"
											}
                    `}
									>
										<span className="relative z-10 flex items-center gap-2">
											<span className="text-lg">{item.icon}</span>
											<span>{item.label}</span>
										</span>

										<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

										{activeTab === item.id && (
											<span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-3/4 bg-white rounded-full animate-in slide-in-from-bottom duration-300" />
										)}
									</button>
								))}
							</div>
						</div>

						<div className="flex items-center gap-4 animate-in fade-in slide-in-from-right duration-700">
							<div className="hidden sm:flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#fbcfe8]/50 to-[#fdf2f8] px-4 py-2 shadow-sm border border-[#f472b6]/20">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#be185d] to-[#a21caf] shadow-md">
									<span className="text-sm font-bold text-white">
										{currentUser?.nombreUsuario?.charAt(0).toUpperCase() || "A"}
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-xs text-[#a21caf]/70 font-medium">
										Bienvenido
									</span>
									<span className="text-sm text-[#be185d] font-semibold">
										{currentUser?.nombreUsuario || "Técnico"}
									</span>
								</div>
							</div>

							<button
								type="button"
								onClick={cerrarSesion}
								className="
                  group relative overflow-hidden rounded-xl
                  bg-gradient-to-r from-[#be185d] to-[#a21caf]
                  px-5 py-2.5 font-semibold text-white shadow-lg shadow-[#be185d]/30
                  transition-all duration-300 ease-out
                  hover:shadow-xl hover:shadow-[#be185d]/40 hover:scale-105
                  active:scale-95
                "
							>
								<span className="relative z-10 flex items-center gap-2">
									<span>Cerrar Sesión</span>
									<span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
										→
									</span>
								</span>
								<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
							</button>
						</div>
					</div>
				</div>
			</nav>

			<main className="mx-auto max-w-7xl p-6 animate-in fade-in slide-in-from-bottom duration-700 delay-150">
				<div className="rounded-2xl bg-white/60 backdrop-blur-sm p-6 shadow-xl shadow-[#f472b6]/5 border border-[#f472b6]/10">
					{renderContent()}
				</div>
			</main>
		</div>
	);
}