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

	if (loading) return <div>Cargando...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h2>Actualizar Ticket</h2>
			{ticket.map((ticket) => (
				<div key={ticket.id} className="mb-4 p-4 border rounded-lg shadow-sm">
					<p>
						<strong>Ticket ID:</strong> {ticket.id}
					</p>
					<p>
						<strong>Estado:</strong> {ticket.nombreEstado}
					</p>
					<p>
						<strong>Cliente:</strong> {ticket.nombreCliente}
					</p>
					<p>
						<strong>Tipo de Servicio:</strong> {ticket.nombreTipoServicio}
					</p>
					<p>
						<strong>Fecha de Solicitud:</strong> {ticket.fechaSolicitud}
					</p>
					<p>
						<strong>Diagnóstico:</strong> {ticket.diagnostico}
					</p>
					<p>
						<strong>Solución:</strong> {ticket.solucion}
					</p>
					<p>
						<strong>Técnico Asignado:</strong>{" "}
						{ticket.nombreTecnico || "No asignado"}
					</p>

					{/* Editar ticket component */}
					<EditarTicket ticket={ticket} />
				</div>
			))}
		</div>
	);
};

export default ActualizarTickets;
