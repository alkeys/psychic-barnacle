import { useState, useEffect } from "react";
import type { EstadoTicket, Ticket, TicketNew } from "../../../models/entity";
import { TicketApi, EstadoTicketApi } from "../../../service/ApiClient";

interface EditarTicketProps {
	ticket: Ticket;
}
const EditarTicket: React.FC<EditarTicketProps> = ({ ticket }) => {
	const [diagnostico, setDiagnostico] = useState(ticket.diagnostico);
	const [idEstado, setIdEstado] = useState(ticket.idEstado);
	const [solucion, setSolucion] = useState(ticket.solucion);
	const [ticketNew] = useState<TicketNew>({
		idCliente: ticket.idCliente,
		idTipoServicio: ticket.idTipoServicio,
		fechaSolicitud: ticket.fechaSolicitud,
		fechaAsignacion: ticket.fechaAsignacion ?? "",
		fechaCierre: ticket.fechaCierre ?? "",
		diagnostico: ticket.diagnostico || "",
		solucion: ticket.solucion || "",
		idTecnico: ticket.idTecnico || 0,
		idEstado: ticket.idEstado,
	});
	const [tiposdeestado, setTiposdeEstado] = useState<EstadoTicket[]>([]);

	const handleGuardarCambios = async () => {
		console.log("Actualizando ticket con ID:", ticket.id);
		try {
			const fechaCierre = new Date().toISOString().split("T")[0];
			const updatedTicket = {
				...ticketNew,
				diagnostico,
				solucion,
				fechaCierre,
				idEstado,
			};
			if (!ticket.id) {
				throw new Error("El ticket no tiene un ID válido.");
			}
			// verfica el tipo de ticket para llamar a la api correcta
			await TicketApi.actualizarTicket(ticket.id, updatedTicket);
			alert("Ticket actualizado correctamente");

			//trae los tipos de estado para actualizar el nombre del estado en la list
		} catch (error) {
			console.error("Error al actualizar el ticket:", error);
			alert("Error al actualizar el ticket");
		}
	};

	useEffect(() => {
		const fetchEstados = async () => {
			try {
				const Response = await EstadoTicketApi.listarEstados();
				const data = Response.data ?? Response;
				setTiposdeEstado(data);
				console.log("Estados de tickets obtenidos:", data);
			} catch (error) {
				console.error("Error al obtener los estados de tickets:", error);
			}
		};
		fetchEstados();
	}, []);

	useEffect(() => {
		console.log("✅ Estados actualizados:", tiposdeestado);
	}, [tiposdeestado]);

	return (
		<div className="p-4 border rounded-lg shadow-sm">
			<h3 className="text-lg font-semibold mb-4">
				Editar Ticket ID: {ticket.id}
			</h3>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-1">Estado:</label>
				<select
					className="w-full border rounded-md p-2"
					value={idEstado}
					onChange={(e) => setIdEstado(Number(e.target.value))}
				>
					<option value="">-- Selecciona un estado --</option>
					{tiposdeestado.map((estado) => (
						<option key={estado.id} value={estado.id}>
							{estado.nombreEstado}
						</option>
					))}
				</select>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium mb-1">Diagnóstico:</label>
				<textarea
					className="w-full border rounded-md p-2"
					value={diagnostico}
					onChange={(e) => setDiagnostico(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium mb-1">Solución:</label>
				<textarea
					className="w-full border rounded-md p-2"
					value={solucion}
					onChange={(e) => setSolucion(e.target.value)}
				/>
			</div>
			<button
				type="button"
				className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
				onClick={handleGuardarCambios}
			>
				Guardar Cambios
			</button>
		</div>
	);
};

export default EditarTicket;
