"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { UsuarioApi, TicketApi } from "../../service/ApiClient";
import type { TicketNew, Usuario } from "@/models/entity";

const Dashboard: React.FC = () => {
	// Datos de ejemplo para las estadísticas
	const [tasaCompletado, setTasaCompletado] = useState<string>("0%");
	const [totalTickets, setTotalTickets] = useState<number>(0);
	const [ticketsCompletados, setTicketsCompletados] = useState<number>(0);
	const [stats, setStats] = useState([
		{
			id: 1,
			title: "Total Clientes",
			value: "248",
			change: "+12%",
			icon: "👥",
			gradient: "from-[#be185d] to-[#a21caf]",
			bgGradient: "from-[#fbcfe8]/50 to-[#fdf2f8]",
		},
		{
			id: 2,
			title: "Técnicos",
			value: "32",
			change: "+5%",
			icon: "🔧",
			gradient: "from-[#a21caf] to-[#be185d]",
			bgGradient: "from-[#fdf2f8] to-[#fbcfe8]/50",
		},
		{
			id: 3,
			title: "Usuarios Registrados",
			value: "156",
			change: "+8%",
			icon: "👤",
			gradient: "from-[#be185d] to-[#f472b6]",
			bgGradient: "from-[#fbcfe8]/50 to-[#fdf2f8]",
		},
		{
			id: 4,
			title: "Cantidad de tickets",
			value: "1,429",
			change: "+23%",
			icon: "✅",
			gradient: "from-[#f472b6] to-[#be185d]",
			bgGradient: "from-[#fdf2f8] to-[#fbcfe8]/50",
		},
	]);

	const [recentActivity, setRecentActivity] = useState<
		{
			id: number;
			rol: "cliente" | "tecnico" | "administrador" | string;
			user: string;
			icon: string;
		}[]
	>([
		{ id: 1, rol: "cliente", user: "Juan Pérez", icon: "👤" },
		{ id: 2, rol: "tecnico", user: "María García", icon: "✅" },
		{ id: 3, rol: "tecnico", user: "Carlos López", icon: "🔧" },
		{ id: 4, rol: "cliente", user: "Ana Martínez", icon: "📋" },
	]);

	useEffect(() => {
		const cargarUsuarios = async () => {
			try {
				const response = await UsuarioApi.listarUsuarios();
				const usuarios = response.data;
				const response2 = await TicketApi.listarTickets();
				const tickets = response2.data as TicketNew[];

				// Filtrar según roles

				// Filtrar según roles
				const totalUsuarios = usuarios.length;
				const totalClientes = usuarios.filter(
					(u: Usuario) => u.rol === "cliente",
				).length;
				const totalTecnicos = usuarios.filter(
					(u: Usuario) => u.rol === "tecnico",
				).length;

				// Actualizar los stats dinámicamente
				setStats((prevStats) =>
					prevStats.map((stat) => {
						if (stat.title === "Total Clientes")
							return { ...stat, value: totalClientes.toString() };
						if (stat.title === "Técnicos")
							return { ...stat, value: totalTecnicos.toString() };
						if (stat.title === "Usuarios Registrados")
							return { ...stat, value: totalUsuarios.toString() };
						return stat;
					}),
				);

				// Actualizar la cantidad de tickets
				setStats((prevStats) =>
					prevStats.map((stat) => {
						if (stat.title === "Cantidad de tickets")
							return { ...stat, value: tickets.length.toString() };
						return stat;
					}),
				);
				//actualiza la taza de completado si el ticke si en id_estado es 3 (completado)
				console.log("Calculando tasa de completado...");
				console.log("Total de tickets:", tickets.length);
				console.log("Tickets:", tickets);

				setTotalTickets(tickets.length);
				setTicketsCompletados(
					tickets.filter((TicketNew) => TicketNew.idEstado === 3).length,
				);
				console.log(
					"Tickets completados:",
					tickets.filter((TicketNew) => TicketNew.idEstado === 3).length,
				);
				const ticketsCompletados = tickets.filter(
					(TicketNew) => TicketNew.idEstado === 3,
				).length;

				const tasaCompletado2 =
					tickets.length > 0
						? `${((ticketsCompletados / tickets.length) * 100).toFixed(2)}%`
						: "0%";
				console.log("Tasa de completado calculada:", tasaCompletado2);
				setTasaCompletado(tasaCompletado2);

				// Actualizar la actividad reciente con los últimos usuarios
				const actividadReciente = usuarios.slice(-4).map((usuario, index) => ({
					id: usuario.id ?? index, // fallback si no hay id
					rol: usuario.rol || "desconocido",
					user: usuario.nombreUsuario || "Usuario sin nombre",
					icon:
						usuario.rol === "cliente"
							? "👤"
							: usuario.rol === "tecnico"
							? "🔧"
							: "👨‍💼",
				}));
				setRecentActivity(actividadReciente);
			} catch (error) {
				console.error("Error al obtener los usuarios:", error);
			}
		};

		cargarUsuarios();
	}, []);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="animate-in fade-in slide-in-from-top duration-700">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent mb-2">
					Dashboard
				</h1>
				<p className="text-[#a21caf]/70 text-lg">
					Bienvenido al panel de administración
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<div
						key={stat.id}
						style={{ animationDelay: `${index * 100}ms` }}
						className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-[#fdf2f8] p-6 shadow-lg shadow-[#f472b6]/10 border border-[#f472b6]/20 transition-all duration-500 hover:shadow-xl hover:shadow-[#be185d]/20 hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom"
					>
						{/* Background decoration */}
						<div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#fbcfe8]/30 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />

						<div className="relative z-10 space-y-4">
							{/* Icon */}
							<div
								className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg shadow-[#be185d]/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
							>
								<span className="text-3xl">{stat.icon}</span>
							</div>

							{/* Content */}
							<div className="space-y-1">
								<p className="text-sm font-medium text-[#a21caf]/70">
									{stat.title}
								</p>
								<div className="flex items-end justify-between">
									<h3 className="text-4xl font-bold text-[#be185d]">
										{stat.value}
									</h3>
									<span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
										{stat.change}
									</span>
								</div>
							</div>
						</div>

						{/* Shimmer effect */}
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
					</div>
				))}
			</div>

			{/* Two Column Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Activity */}
				<div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-white to-[#fdf2f8] p-6 shadow-lg shadow-[#f472b6]/10 border border-[#f472b6]/20 animate-in fade-in slide-in-from-left duration-700 delay-300">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
							Usuarios Recientes agregados
						</h2>
						<button
							type="button"
							className="text-sm font-medium text-[#be185d] hover:text-[#a21caf] transition-colors duration-300"
						>
							Ver todo →
						</button>
					</div>

					<div className="space-y-4">
						{recentActivity.map((activity, index) => (
							<div
								key={activity.id}
								style={{ animationDelay: `${(index + 4) * 100}ms` }}
								className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#fdf2f8] to-white border border-[#f472b6]/10 transition-all duration-300 hover:shadow-md hover:shadow-[#f472b6]/20 hover:scale-[1.02] animate-in fade-in slide-in-from-left"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#be185d] to-[#a21caf] shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
									<span className="text-2xl">{activity.icon}</span>
								</div>
								<div className="flex-1">
									<p className="font-semibold text-[#be185d]">{activity.rol}</p>
									<p className="text-sm text-[#a21caf]/70">{activity.user}</p>
								</div>
								<span className="text-xs text-[#a21caf]/60 font-medium">
									{activity.id}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Quick Stats */}
				<div className="rounded-2xl bg-gradient-to-br from-white to-[#fdf2f8] p-6 shadow-lg shadow-[#f472b6]/10 border border-[#f472b6]/20 animate-in fade-in slide-in-from-right duration-700 delay-300">
					<h2 className="text-2xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent mb-6">
						Resumen Rápido
					</h2>

					<div className="space-y-4">
						<div className="p-4 rounded-xl bg-gradient-to-r from-[#fbcfe8]/50 to-[#fdf2f8] border border-[#f472b6]/20">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-[#a21caf]/70">
									Tasa de Completado
								</span>
								<span className="text-lg font-bold text-[#be185d]">
									{tasaCompletado || "0%"}
								</span>
							</div>
							<div className="h-2 bg-[#fdf2f8] rounded-full overflow-hidden">
								<div className="h-full w-[94%] bg-gradient-to-r from-[#be185d] to-[#a21caf] rounded-full transition-all duration-1000 animate-in slide-in-from-left delay-500" />
							</div>
						</div>

						<div className="p-4 rounded-xl bg-gradient-to-r from-[#fdf2f8] to-[#fbcfe8]/50 border border-[#f472b6]/20">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-[#a21caf]/70">
									cantidad de tickets resueltos
								</span>
								<span className="text-lg font-bold text-[#be185d]">
									{ticketsCompletados || 0}
								</span>
							</div>
							<p className="text-xs text-[#a21caf]/60">
								{" "}
								Basado en reseñas de clientes
							</p>
						</div>

						<div className="p-4 rounded-xl bg-gradient-to-r from-[#fbcfe8]/50 to-[#fdf2f8] border border-[#f472b6]/20">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-[#a21caf]/70">
									total de tickets
								</span>
								<span className="text-lg font-bold text-[#be185d]">
									{totalTickets || 0}
								</span>
							</div>
							<p className="text-xs text-[#a21caf]/60">Por orden de servicio</p>
						</div>

						<button
							type="button"
							className="w-full mt-4 group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#be185d] to-[#a21caf] px-6 py-3 font-semibold text-white shadow-lg shadow-[#be185d]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#be185d]/40 hover:scale-105 active:scale-95"
						>
							<span className="relative z-10 flex items-center justify-center gap-2">
								<span>Ver Reportes Completos</span>
								<span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
									→
								</span>
							</span>
							<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
