"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { Ticket } from "../../../models/entity";
import { TicketApi } from "../../../service/ApiClient";
import { useAuth } from "@/context/AuthContext";
import EditarTicket from "./EditarTicket";

const ActualizarTickets: React.FC = () => {
	const [ticket, setTicket] = useState<Ticket[]>([]);
	// ocupo el context para optener el id del usuario tecnico logeado
	const { currentUser } = useAuth();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchTicket = async () => {
		try {
			const response = await TicketApi.listarTickets();
			// filtro los tickets por el id del tecnico logeado
			const filteredTickets = response.data.filter(
				(ticket: Ticket) => ticket.idTecnico === currentUser?.idTecnico,
			);
			setTicket(filteredTickets);
		} catch (error) {
			setError("Error al obtener el ticket");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTicket();
	}, []);

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center space-y-4">
					<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
					<p className="text-gray-600 font-medium">Cargando tickets...</p>
				</div>
			</div>
		);

	if (error)
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
							<svg
								className="w-5 h-5 text-red-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<title>ok</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
						<p className="text-red-800 font-medium">{error}</p>
					</div>
				</div>
			</div>
		);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h2 className="text-3xl font-bold text-gray-900 mb-2">
					Actualizar Tickets
				</h2>
				<p className="text-gray-600">
					Gestiona y actualiza los tickets asignados a ti
				</p>
				<div className="mt-4 flex items-center gap-2">
					<span className="text-sm text-gray-500">Total de tickets:</span>
					<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
						{ticket.length}
					</span>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{ticket.map((ticket) => (
					<div
						key={ticket.id}
						className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
					>
						<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-blue-100 text-sm font-medium">Ticket ID</p>
									<p className="text-white text-2xl font-bold">#{ticket.id}</p>
								</div>
								<div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
									<p className="text-white text-sm font-semibold">
										{ticket.nombreEstado}
									</p>
								</div>
							</div>
						</div>

						<div className="p-6 space-y-4">
							{/* Cliente */}
							<div className="flex items-start gap-3">
								<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<svg
										className="w-5 h-5 text-purple-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>ok</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
										Cliente
									</p>
									<p className="text-gray-900 font-semibold truncate">
										{ticket.nombreCliente}
									</p>
								</div>
							</div>

							{/* Tipo de Servicio */}
							<div className="flex items-start gap-3">
								<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<svg
										className="w-5 h-5 text-green-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>ok</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
										Tipo de Servicio
									</p>
									<p className="text-gray-900 font-semibold truncate">
										{ticket.nombreTipoServicio}
									</p>
								</div>
							</div>

							{/* Fecha */}
							<div className="flex items-start gap-3">
								<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<svg
										className="w-5 h-5 text-orange-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>ok</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
										Fecha de Solicitud
									</p>
									<p className="text-gray-900 font-semibold">
										{ticket.fechaSolicitud}
									</p>
								</div>
							</div>

							{/* Técnico */}
							<div className="flex items-start gap-3">
								<div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
									<svg
										className="w-5 h-5 text-indigo-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>ok</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
										Técnico Asignado
									</p>
									<p className="text-gray-900 font-semibold truncate">
										{ticket.nombreTecnico || "No asignado"}
									</p>
								</div>
							</div>

							{/* Diagnóstico */}
							{ticket.diagnostico && (
								<div className="pt-4 border-t border-gray-100">
									<p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
										Diagnóstico
									</p>
									<p className="text-gray-700 text-sm leading-relaxed">
										{ticket.diagnostico}
									</p>
								</div>
							)}

							{/* Solución */}
							{ticket.solucion && (
								<div className="pt-4 border-t border-gray-100">
									<p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
										Solución
									</p>
									<p className="text-gray-700 text-sm leading-relaxed">
										{ticket.solucion}
									</p>
								</div>
							)}
						</div>

						<div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
							<EditarTicket ticket={ticket} />
						</div>
					</div>
				))}
			</div>

			{ticket.length === 0 && (
				<div className="text-center py-12">
					<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-8 h-8 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<title>ok</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						No hay tickets asignados
					</h3>
					<p className="text-gray-600">
						No tienes tickets asignados en este momento.
					</p>
				</div>
			)}
		</div>
	);
};

export default ActualizarTickets;
