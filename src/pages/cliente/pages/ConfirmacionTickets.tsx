import { useState, useEffect, useMemo, useCallback } from "react"; // <-- Se añade useCallback
import type { Ticket, TicketNew } from "../../../models/entity";
import { TicketApi } from "../../../service/ApiClient";
import { useAuth } from "@/context/AuthContext";

/**
 * Componente para que el cliente confirme tickets pendientes.
 *
 * Muestra una lista de tickets con estado "Pendiente de Cliente"
 * y permite al cliente "confirmarlos" (lo que idealmente los
 * devolvería al estado "En proceso" o "Abierto").
 */
const ConfirmacionTickets: React.FC = () => {
	const { currentUser } = useAuth();

	// --- Estados ---
	// Almacena TODOS los tickets del usuario, sin filtrar
	const [allUserTickets, setAllUserTickets] = useState<TicketNew[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// --- Carga de Datos ---
	/**
	 * Función memoizada para obtener todos los tickets del cliente.
	 */
	const fetchTickets = useCallback(async () => {
		if (!currentUser) {
			setAllUserTickets([]);
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);
		try {
			const response = await TicketApi.listarTickets();
			// Filtra solo los tickets del cliente actual
			const clienteTickets = response.data.filter(
				(ticket) => ticket.idCliente === currentUser.idCliente,
			);
			setAllUserTickets(clienteTickets);
		} catch (error) {
			console.error("Error fetching tickets:", error);
			setError("No se pudieron cargar los tickets.");
		} finally {
			setIsLoading(false);
		}
	}, [currentUser]); // Se vuelve a crear si 'currentUser' cambia

	// Efecto para cargar los tickets al montar el componente o si el usuario cambia
	useEffect(() => {
		fetchTickets();
	}, [fetchTickets]); // La dependencia es la función memoizada

	// --- Lógica de Filtro (Memoizada) ---
	/**
	 * Utiliza useMemo para filtrar la lista de tickets.
	 * Esta lista solo se recalculará si 'allUserTickets' cambia.
	 *
	 * Filtramos por "Pendiente de Cliente" (idEstado: 4) porque es el estado
	 * más lógico para una página de "Confirmación" del lado del cliente.
	 */
	const ticketsParaConfirmar = useMemo(() => {
		return allUserTickets.filter(
			(ticket) => ticket.nombreEstado === "Pendiente de Cliente",
		);
	}, [allUserTickets]); // Depende de la lista completa de tickets

	// --- Manejadores de Eventos ---
	/**
	 * Lógica para confirmar un ticket.
	 * (Esta es una implementación de EJEMPLO)
	 */
	const handleConfirm = async (ticket: TicketNew) => {
		console.log(`Confirmando ticket ${ticket.id}...`);

		try {
			console.log("ticketId a confirmar:", ticket);
			//cambiar el estado del ticket a "Cerrado" =3
			ticket.idEstado = 3;
			//mofificar el la fecha de cierre 2025-09-30
			ticket.fechaCierre = new Date().toISOString().split("T")[0];

			await TicketApi.actualizarTicket(ticket.id || 0, ticket);
			alert(`Ticket ${ticket.id} confirmado con éxito.`);

			// Después de confirmar, volvemos a cargar la lista para que desaparezca
			await fetchTickets();
		} catch (err) {
			console.error("Error al confirmar el ticket:", err);
			alert("Hubo un error al confirmar el ticket.");
		}
	};

	// --- Renderizado ---
	if (isLoading) {
		return <div>Cargando tickets...</div>;
	}

	if (error) {
		return <div style={{ color: "red" }}>{error}</div>;
	}

	return (
		<div style={styles.container}>
			<h1>Confirmación de Tickets</h1>
			<p>
				Hola, <strong>{currentUser?.nombre_completo}</strong>. Aquí están los
				tickets que requieren tu atención:
			</p>

			{ticketsParaConfirmar.length === 0 ? (
				<p style={styles.noTickets}>
					No hay tickets pendientes de confirmación.
				</p>
			) : (
				<div style={styles.ticketList}>
					{ticketsParaConfirmar.map((t) => (
						<div key={t.id} style={styles.ticketCard}>
							<div style={styles.cardHeader}>
								<h3>Ticket ID: {t.id}</h3>
								<span style={styles.ticketState}>{t.nombreEstado}</span>
							</div>
							<p>
								<strong>Técnico:</strong> {t.nombreTecnico || "No asignado"}
							</p>
							<p>
								<strong>Diagnóstico:</strong> {t.diagnostico || "Pendiente"}
							</p>

							<button
								type="button"
								onClick={() => handleConfirm(t || 0)}
								style={styles.confirmButton}
							>
								Confirmar Servicio
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

// --- Estilos (CSS-in-JS para el ejemplo) ---
// Puedes mover esto a un archivo CSS o CSS-Modules
const styles = {
	container: {
		fontFamily: "Arial, sans-serif",
		padding: "20px",
		maxWidth: "900px",
		margin: "0 auto",
	},
	ticketList: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
		gap: "20px",
	},
	ticketCard: {
		border: "1px solid #ddd",
		borderRadius: "8px",
		padding: "16px",
		backgroundColor: "#f9f9f9",
		boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
	},
	cardHeader: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottom: "1px solid #eee",
		paddingBottom: "10px",
		marginBottom: "10px",
	},
	ticketState: {
		backgroundColor: "#ffc107",
		color: "#333",
		padding: "4px 8px",
		borderRadius: "12px",
		fontSize: "0.8em",
		fontWeight: "bold",
	},
	confirmButton: {
		backgroundColor: "#28a745",
		color: "white",
		border: "none",
		padding: "10px 15px",
		borderRadius: "5px",
		cursor: "pointer",
		fontSize: "1em",
		marginTop: "10px",
		width: "100%",
	},
	noTickets: {
		fontSize: "1.1em",
		color: "#555",
		backgroundColor: "#f0f0f0",
		padding: "20px",
		borderRadius: "8px",
		textAlign: "center" as "center",
	},
};

export default ConfirmacionTickets;