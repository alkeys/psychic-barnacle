"use client";

import type React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { Ticket } from "../../models/entity"; // Asegúrate que esta interfaz es correcta
import { TicketApi } from "../../service/ApiClient";

// Define un tipo para el ticket que se mostrará en la sección de tickets recientes
interface RecentTicket {
	id: number; // Suponiendo que el ID del ticket es un número
	diagnostico: string; // Usaremos 'diagnostico' como la descripción
	fechaAsignacion: string;
	estado: "Asignado" | "En Progreso" | "Cerrado" | "Pendiente"; // Definir posibles estados
	prioridad: "Alta" | "Media" | "Baja"; // Suponiendo que hay un campo de prioridad, aunque no se ve en el ejemplo de datos, se mantiene la estructura del front-end.
	// Usaremos 'fechaAsignacion' como la fecha a mostrar
}

const Dashboard: React.FC = () => {
	// 1. Inicializar stats y recentTickets con estados vacíos/por defecto
	const [stats, setStats] = useState({
		ticketsAsignados: 0,
		ticketsCerrados: 0, // Cambiado de 'Completados' a 'Cerrados' para reflejar el campo 'fechaCierre'
		ticketsPendientes: 0,
		ticketsEnProgreso: 0,
	});
	const { currentUser } = useAuth();
	// Usa un array vacío para inicializar, se llenará con los datos reales
	const [recentTickets, setRecentTickets] = useState<RecentTicket[]>([]);

	// Función auxiliar para determinar el estado del ticket
	const getTicketEstado = (
		ticket: Ticket,
	): "Asignado" | "En Progreso" | "Cerrado" | "Pendiente" => {
		// En base a la estructura de datos que proporcionaste, una forma simple de determinar el estado es con 'fechaCierre'
		if (ticket.fechaCierre && ticket.fechaCierre !== "2000-01-01") {
			// Asumiendo que '2000-01-01' es un valor por defecto o nulo
			return "Cerrado";
		}
		if (ticket.fechaAsignacion) {
			// Podríamos necesitar un campo adicional en 'Ticket' para diferenciar entre 'Asignado' y 'En Progreso'
			// Por simplicidad, todos los tickets asignados y no cerrados se considerarán 'En Progreso' o 'Asignado'
			return "En Progreso";
		}
		return "Pendiente"; // Si no está asignado
	};

	// Función para calcular las estadísticas
	const calculateStatsAndRecentTickets = (tecnicoTickets: Ticket[]) => {
		const asignados = tecnicoTickets.length;
		let cerrados = 0;
		let pendientes = 0;
		let enProgreso = 0;

		// Simulación de tickets recientes, tomando los últimos 4 por fecha de asignación.
		// Se asume que 'fechaAsignacion' indica el orden de llegada.
		const safeTime = (s?: string) => new Date(s ?? "1970-01-01").getTime();

		const sortedTickets = [...tecnicoTickets].sort(
			(a, b) => safeTime(b.fechaAsignacion) - safeTime(a.fechaAsignacion),
		);

		tecnicoTickets.forEach((ticket) => {
			const estado = getTicketEstado(ticket);

			if (estado === "Cerrado") {
				cerrados++;
			} else if (estado === "En Progreso") {
				enProgreso++;
			} else if (estado === "Pendiente") {
				pendientes++;
			}
			// Los 'Asignados' se cuentan al principio (todos los del técnico)
		});

		// Simular un campo de prioridad para el Front-end, ya que no existe en el objeto Ticket
		const mapTicketToRecent = (ticket: Ticket): RecentTicket => ({
			id: ticket.id || 0, // Usar el ID real si está disponible
			diagnostico: ticket.diagnostico,
			fechaAsignacion: ticket.fechaAsignacion || "N/A",
			estado: getTicketEstado(ticket),
			// Asignación de prioridad simulada para evitar errores en el componente de visualización
			prioridad:
				ticket.diagnostico.toLowerCase().includes("quemado") ||
				ticket.diagnostico.toLowerCase().includes("servidor")
					? "Alta"
					: "Media",
		});

		setStats({
			ticketsAsignados: asignados,
			ticketsCerrados: cerrados,
			ticketsPendientes: pendientes,
			ticketsEnProgreso: enProgreso,
		});

		// Tomar los 4 tickets más recientes
		setRecentTickets(sortedTickets.slice(0, 4).map(mapTicketToRecent));
	};

	// Ajustar el getEstadoBadge para los nuevos estados
	const getEstadoBadge = (estado: string) => {
		const variants: Record<
			string,
			"default" | "secondary" | "destructive" | "outline"
		> = {
			"En Progreso": "default", // Azul
			Asignado: "default", // Azul
			Pendiente: "secondary", // Gris
			Cerrado: "outline", // Borde/Completado
		};
		return variants[estado] || "default";
	};

	const getPrioridadColor = (prioridad: string) => {
		const colors: Record<string, string> = {
			Alta: "text-red-600",
			Media: "text-yellow-600",
			Baja: "text-green-600",
		};
		return colors[prioridad] || "text-gray-600";
	};

	// 2. Modificar fetchTickets para usar los datos y calcular las estadísticas
	const fetchTickets = useCallback(async () => {
		try {
			const response = await TicketApi.listarTickets();
			const normalizedTickets: Ticket[] = response.data.map(
				(ticket: Ticket) => ({
					...ticket,
					nombreTecnico: ticket.nombreTecnico || "No asignado",
					// Asegurar que el ID del ticket exista para usarlo
					idTicket: ticket.id || Math.random(), // Usar un valor por defecto si no existe
				}),
			);

			// Filtrar los tickets asignados al técnico actual
			const tecnicoTickets = normalizedTickets.filter(
				(ticket: Ticket) =>
					ticket.nombreTecnico === currentUser?.nombre_completo,
			);

			// Llama a la nueva función para calcular las estadísticas y tickets recientes
			calculateStatsAndRecentTickets(tecnicoTickets);

			console.log("Tickets del técnico:", tecnicoTickets);
		} catch (err) {
			console.error("Error fetching tickets:", err);
		} finally {
		}
	}, [currentUser]); // currentUser es una dependencia crucial

	useEffect(() => {
		// Asegúrate de que el currentUser exista antes de intentar obtener los tickets
		if (currentUser) {
			fetchTickets();
		}
	}, [fetchTickets, currentUser]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
			<div className="mx-auto max-w-7xl space-y-6">
				{/* Header */}
				<div className="space-y-2">
					<h1 className="text-4xl font-bold tracking-tight text-slate-900">
						Dashboard de Técnico
					</h1>
					<p className="text-lg text-slate-600">
						Bienvenido al panel de control. Aquí está tu resumen de actividad.
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{/* Tickets Asignados */}
					<Card className="border-l-4 border-l-blue-500 bg-white shadow-sm transition-shadow hover:shadow-md">
						<CardHeader className="pb-2">
							<CardDescription className="text-sm font-medium text-slate-600">
								Tickets Asignados
							</CardDescription>
							<CardTitle className="text-3xl font-bold text-slate-900">
								{stats.ticketsAsignados}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2">
								<svg
									className="h-4 w-4 text-blue-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>Tickets Asignados</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
								<p className="text-xs text-slate-500">Total asignados</p>
							</div>
						</CardContent>
					</Card>

					{/* Tickets Cerrados (antes Completados) */}
					<Card className="border-l-4 border-l-green-500 bg-white shadow-sm transition-shadow hover:shadow-md">
						<CardHeader className="pb-2">
							<CardDescription className="text-sm font-medium text-slate-600">
								Cerrados
							</CardDescription>
							<CardTitle className="text-3xl font-bold text-slate-900">
								{stats.ticketsCerrados}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2">
								<svg
									className="h-4 w-4 text-green-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>Tickets Cerrados</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="text-xs text-slate-500">Resueltos por ti</p>
							</div>
						</CardContent>
					</Card>

					{/* Tickets Pendientes */}
					<Card className="border-l-4 border-l-yellow-500 bg-white shadow-sm transition-shadow hover:shadow-md">
						<CardHeader className="pb-2">
							<CardDescription className="text-sm font-medium text-slate-600">
								Pendientes
							</CardDescription>
							<CardTitle className="text-3xl font-bold text-slate-900">
								{stats.ticketsPendientes}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2">
								<svg
									className="h-4 w-4 text-yellow-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>Tickets Pendientes</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="text-xs text-slate-500">Por iniciar atención</p>
							</div>
						</CardContent>
					</Card>

					{/* Tickets En Progreso */}
					<Card className="border-l-4 border-l-purple-500 bg-white shadow-sm transition-shadow hover:shadow-md">
						<CardHeader className="pb-2">
							<CardDescription className="text-sm font-medium text-slate-600">
								En Progreso
							</CardDescription>
							<CardTitle className="text-3xl font-bold text-slate-900">
								{stats.ticketsEnProgreso}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-2">
								<svg
									className="h-4 w-4 text-purple-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>Tickets En Progreso</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
								<p className="text-xs text-slate-500">Actualmente trabajando</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Recent Tickets */}
				<Card className="bg-white shadow-sm">
					<CardHeader>
						<CardTitle className="text-xl font-bold text-slate-900">
							Tickets Recientes
						</CardTitle>
						<CardDescription>Últimos tickets asignados a ti</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{/* Mostrar los tickets reales */}
							{recentTickets.map((ticket) => (
								<div
									// Cambiado a usar id para la key
									key={ticket.id}
									className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
								>
									<div className="flex items-center gap-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
											<svg
												className="h-6 w-6 text-blue-600"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<title>Ticket Icon</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
												/>
											</svg>
										</div>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												{/* Mostrar el ID o diagnóstico */}
												<p className="font-semibold text-slate-900">
													{ticket.id} - {ticket.diagnostico}
												</p>
												<Badge variant={getEstadoBadge(ticket.estado)}>
													{ticket.estado}
												</Badge>
											</div>
											{/* Usaremos diagnostico y fechaAsignacion */}
											<p className="text-sm text-slate-600">
												Asignado: {ticket.fechaAsignacion}
											</p>
											<p className="text-xs text-slate-500">
												Diagnóstico: {ticket.diagnostico}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p
											className={`text-sm font-medium ${getPrioridadColor(
												ticket.prioridad,
											)}`}
										>
											{/* Mostrar la prioridad simulada */}
											{ticket.prioridad}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
