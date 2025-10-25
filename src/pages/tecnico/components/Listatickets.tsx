import { useEffect, useState } from "react";
import type { Ticket} from "../../../models/entity";
import { TicketApi } from "../../../service/ApiClient";

const ListarTickets: React.FC = () => {
	const [tickets, setTickets] = useState<Ticket[]>([]);

	const fetchTickets = async () => {
		try {
			const response = await TicketApi.listarTickets();
			setTickets(response.data);
			console.log("Fetched tickets:", response.data);
		} catch (error) {
			console.error("Error fetching tickets:", error);
		}
	};

	useEffect(() => {
		fetchTickets();
	}, []);

	return (
		<div>
			<h2>Lista de Tickets</h2>
			<ul>
				{tickets.map((ticket) => (
					<li key={ticket.id}>
						Ticket ID: {ticket.id} - Estado: {ticket.nombreEstado} - Cliente:{" "}
						{ticket.nombreCliente}- Tipo de Servicio:{" "}
						{ticket.nombreTipoServicio}- Fecha de Solicitud:{" "}
						{ticket.fechaSolicitud}- Diagnóstico: {ticket.diagnostico}-
						Solución: {ticket.solucion}- Técnico Asignado:{" "}
						{ticket.nombreTecnico || "No asignado"}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListarTickets;