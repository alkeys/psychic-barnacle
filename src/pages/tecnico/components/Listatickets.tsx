import { useEffect, useState, useMemo, useCallback } from "react";
import type { Ticket } from "../../../models/entity";
import { TicketApi } from "../../../service/ApiClient";

// --- Tipos adicionales para la usabilidad
interface FilterState {
	searchTerm: string;
	selectedStatus: string; // Para el filtro de estado
}

const ListarTickets: React.FC = () => {
	// 1. ESTADO DE DATOS Y CARGA
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// 2. ESTADO DE FILTROS
	const [filters, setFilters] = useState<FilterState>({
		searchTerm: "",
		selectedStatus: "TODOS",
	});

	// 3. LÓGICA DE CARGA DE DATOS (fetchTickets)
	const fetchTickets = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await TicketApi.listarTickets();
			// Normalizar el campo nombreTecnico para facilitar el filtrado y evitar errores de visualización
			const normalizedTickets = response.data.map((ticket: Ticket) => ({
				...ticket,
				nombreTecnico: ticket.nombreTecnico || "No asignado",
			}));
			setTickets(normalizedTickets);
		} catch (err) {
			console.error("Error fetching tickets:", err);
			setError(
				"No se pudieron cargar los tickets. Intente de nuevo más tarde.",
			);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTickets();
	}, [fetchTickets]);

	// 4. LÓGICA DE FILTRADO (useMemo)
	const filteredTickets = useMemo(() => {
		const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
		const { selectedStatus } = filters;

		return tickets.filter((ticket) => {
			// Filtrar por Estado (si no es 'TODOS')
			const matchesStatus =
				selectedStatus === "TODOS" || ticket.nombreEstado === selectedStatus;

			if (!matchesStatus) {
				return false;
			}

			// Filtrar por Término de Búsqueda (ID, Cliente o Técnico)
			const idString = ticket.id ? String(ticket.id) : "";
			const cliente = (ticket.nombreCliente ?? "").toLowerCase();
			const tecnico = (ticket.nombreTecnico ?? "").toLowerCase();

			return (
				!lowerCaseSearchTerm || // Si el término de búsqueda está vacío, pasa el filtro
				idString.includes(lowerCaseSearchTerm) ||
				cliente.includes(lowerCaseSearchTerm) ||
				tecnico.includes(lowerCaseSearchTerm)
			);
		});
	}, [tickets, filters]);

	// 5. OBTENER OPCIONES ÚNICAS DE ESTADO (Para el dropdown)
	const statusOptions = useMemo(() => {
		const statuses = tickets.map((ticket) => ticket.nombreEstado);
		// Usa Set para obtener valores únicos y luego conviértelos a array
		return ["TODOS", ...Array.from(new Set(statuses))];
	}, [tickets]);

	// --- MANEJADORES DE EVENTOS ---
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters((prev) => ({ ...prev, selectedStatus: e.target.value }));
	};

	// --- RENDERIZADO CONDICIONAL ---
	if (isLoading) {
		return <p>Cargando lista de tickets...</p>;
	}

	if (error) {
		return <p style={{ color: "red" }}>Error: {error}</p>;
	}

	if (tickets.length === 0) {
		return <p>No hay tickets registrados en el sistema.</p>;
	}

	// --- RENDERIZADO PRINCIPAL ---
	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>📋 Lista General de Tickets</h1>
			<hr />

			{/* SECCIÓN DE FILTROS */}
			<div
				style={{
					marginBottom: "20px",
					display: "flex",
					gap: "20px",
					alignItems: "center",
				}}
			>
				{/* Filtro de Búsqueda General */}
				<div style={{ flexGrow: 1 }}>
					<label
						htmlFor="search"
						style={{
							display: "block",
							marginBottom: "5px",
							fontWeight: "bold",
						}}
					>
						Búsqueda Rápida:
					</label>
					<input
						id="search"
						type="text"
						placeholder="Buscar por ID, Cliente o Técnico..."
						value={filters.searchTerm}
						onChange={handleSearchChange}
						style={{
							padding: "10px",
							width: "100%",
							borderRadius: "4px",
							border: "1px solid #ccc",
						}}
					/>
				</div>

				{/* Filtro por Estado */}
				<div style={{ width: "200px" }}>
					<label
						htmlFor="status"
						style={{
							display: "block",
							marginBottom: "5px",
							fontWeight: "bold",
						}}
					>
						Filtrar por Estado:
					</label>
					<select
						id="status"
						value={filters.selectedStatus}
						onChange={handleStatusChange}
						style={{
							padding: "10px",
							width: "100%",
							borderRadius: "4px",
							border: "1px solid #ccc",
							backgroundColor: "#f9f9f9",
						}}
					>
						{statusOptions.map((status) => (
							<option key={status} value={status}>
								{status}
							</option>
						))}
					</select>
				</div>
			</div>

			<hr />

			{/* RESULTADOS Y TABLA */}
			<h3>
				Resultados: {filteredTickets.length} de {tickets.length} tickets
			</h3>

			{filteredTickets.length === 0 ? (
				<p style={{ fontStyle: "italic", color: "#666" }}>
					No se encontraron tickets que coincidan con los filtros aplicados.
				</p>
			) : (
				<div style={{ overflowX: "auto" }}>
					<table
						style={{
							width: "100%",
							borderCollapse: "collapse",
							marginTop: "15px",
							border: "1px solid #ddd",
						}}
					>
						<thead>
							<tr style={{ backgroundColor: "#f2f2f2" }}>
								<th style={tableHeaderStyle}>ID</th>
								<th style={tableHeaderStyle}>Estado</th>
								<th style={tableHeaderStyle}>Cliente</th>
								<th style={tableHeaderStyle}>Servicio</th>
								<th style={tableHeaderStyle}>Fecha Solicitud</th>
								<th style={tableHeaderStyle}>Técnico Asignado</th>
								<th style={tableHeaderStyle}>Diagnóstico</th>
								<th style={tableHeaderStyle}>Solución</th>
							</tr>
						</thead>
						<tbody>
							{filteredTickets.map((ticket) => (
								<tr key={ticket.id} style={{ borderBottom: "1px solid #eee" }}>
									<td style={tableCellStyle}>{ticket.id}</td>
									<td style={{ ...tableCellStyle, fontWeight: "bold" }}>
										{ticket.nombreEstado}
									</td>
									<td style={tableCellStyle}>{ticket.nombreCliente}</td>
									<td style={tableCellStyle}>{ticket.nombreTipoServicio}</td>
									<td style={tableCellStyle}>{ticket.fechaSolicitud}</td>
									<td style={tableCellStyle}>{ticket.nombreTecnico}</td>
									<td style={tableCellStyle}>
										{truncateText(ticket.diagnostico, 50)}
									</td>
									<td style={tableCellStyle}>
										{truncateText(ticket.solucion, 50)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

// --- ESTILOS AUXILIARES Y UTILS ---
const tableHeaderStyle: React.CSSProperties = {
	padding: "12px",
	textAlign: "left",
	border: "1px solid #ddd",
	fontSize: "0.9em",
};

const tableCellStyle: React.CSSProperties = {
	padding: "10px",
	border: "1px solid #eee",
	verticalAlign: "top",
	fontSize: "0.85em",
};

// Función de utilidad para truncar texto largo
const truncateText = (text: string | undefined, limit: number): string => {
	if (!text) return "N/A";
	if (text.length <= limit) return text;
	return `${text.substring(0, limit)}...`;
};

export default ListarTickets;
