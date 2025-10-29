import { useState, useEffect, useMemo } from "react"; // <-- Importar useMemo
import type { Ticket } from "../../../models/entity";
import { TicketApi } from "../../../service/ApiClient";
import { useAuth } from "@/context/AuthContext";

const EstadoTickets: React.FC = () => {
	const { currentUser } = useAuth();
	// <-- CAMBIO: Renombrar a 'allTickets' para guardar la lista completa
	const [allTickets, setAllTickets] = useState<Ticket[]>([]);

	// <-- NUEVO: Estados para el filtro
	const [filterEstado, setFilterEstado] = useState<string>(""); // Valor del filtro seleccionado
	const [availableEstados, setAvailableEstados] = useState<string[]>([]); // Opciones del dropdown

	useEffect(() => {
		// Si no hay usuario actual, no intentar cargar tickets
		if (!currentUser) {
			setAllTickets([]);
			return;
		}

		const fetchTickets = async () => {
			try {
				const response = await TicketApi.listarTickets();
				// Filtrar tickets por el ID del cliente actual
				const clienteTickets = response.data.filter(
					(ticket) => ticket.idCliente === currentUser.idCliente,
				);

				setAllTickets(clienteTickets); // <-- Guardar la lista completa

				// <-- NUEVO: Extraer estados únicos para el dropdown de filtro
				const uniqueEstados = [
					...new Set(
						clienteTickets
							.map((ticket) => ticket.nombreEstado)
							.filter((s): s is string => typeof s === "string"),
					),
				];
				setAvailableEstados(uniqueEstados);

				console.log("Tickets del cliente cargados:", clienteTickets);
			} catch (error) {
				console.error("Error al cargar los tickets del cliente:", error);
			}
		};

		fetchTickets();
	}, [currentUser]);

	// <-- NUEVO: Calcular la lista filtrada usando useMemo
	// Esto se recalcula solo si 'allTickets' o 'filterEstado' cambian
	const filteredTickets = useMemo(() => {
		if (filterEstado === "") {
			return allTickets; // Si no hay filtro, mostrar todos
		}
		return allTickets.filter((ticket) => ticket.nombreEstado === filterEstado);
	}, [allTickets, filterEstado]);

	return (
		<>
			<div>
				<h2>Estado de tickets</h2>

				{/* <-- INICIO CAMBIO: Agregar el dropdown de filtro */}
				<div style={{ marginBottom: 16 }}>
					<label
						htmlFor="estadoFilter"
						style={{ marginRight: 8, fontWeight: 600 }}
					>
						Filtrar por estado:
					</label>
					<select
						id="estadoFilter"
						value={filterEstado}
						onChange={(e) => setFilterEstado(e.target.value)}
						style={{
							padding: "8px",
							borderRadius: 4,
							border: "1px solid #ccc",
						}}
					>
						<option value="">Todos</option>
						{availableEstados.map((estado) => (
							<option key={estado} value={estado}>
								{estado}
							</option>
						))}
					</select>
				</div>
				{/* <-- FIN CAMBIO */}

				{/* <-- CAMBIO: Usar 'filteredTickets' en lugar de 'tickets' */}
				{filteredTickets.length === 0 ? (
					// Mensaje dinámico
					<p>
						{allTickets.length === 0
							? "No hay tickets para este cliente."
							: "No hay tickets que coincidan con el filtro."}
					</p>
				) : (
					<>
						<p>Total: {filteredTickets.length}</p>{" "}
						{/* Muestra total filtrado */}
						<ul style={{ listStyle: "none", padding: 0 }}>
							{filteredTickets.map(
								(
									ticket,
								) => ( // <-- Usar filteredTickets
									<li
										key={ticket.id}
										style={{
											marginBottom: 12,
											padding: 12,
											border: "1px solid #e0e0e0",
											borderRadius: 6,
											background: "#fafafa",
											fontFamily: "sans-serif",
										}}
									>
										{/* El contenido de la tarjeta no cambia */}
										<div
											style={{
												fontWeight: 600,
												fontSize: "1.1em",
												marginBottom: "8px",
											}}
										>
											{ticket.nombreTipoServicio}
										</div>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												gap: "5px",
												fontSize: "0.9em",
											}}
										>
											<p style={{ margin: 0 }}>
												<strong>Cliente:</strong> {ticket.nombreCliente}
											</p>
											<p style={{ margin: 0 }}>
												<strong>Técnico:</strong> {ticket.nombreTecnico}
											</p>
											<p style={{ margin: 0 }}>
												<strong>Estado:</strong> {ticket.nombreEstado}
											</p>
											<p style={{ margin: 0 }}>
												<strong>Solicitado:</strong> {ticket.fechaSolicitud}
											</p>
											<p style={{ margin: 0 }}>
												<strong>Asignado:</strong> {ticket.fechaAsignacion}
											</p>
											<div style={{ marginTop: "8px" }}>
												<strong
													style={{ display: "block", marginBottom: "4px" }}
												>
													Diagnóstico:
												</strong>
												<p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
													{ticket.diagnostico}
												</p>
											</div>
										</div>
									</li>
								),
							)}
						</ul>
					</>
				)}
			</div>
		</>
	);
};

export default EstadoTickets;
