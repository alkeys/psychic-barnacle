import { expect, test } from "vitest";
import axios from "axios";
import { TicketApi } from "../service/ApiClient";
import type { TicketNew } from "../models/entity";
import { tr } from "framer-motion/client";

//test para crear un ticket
/*
{

  "idCliente": 2,
  "idTipoServicio": 1,
  "idTecnico": 1,
  "idEstado": 1,
  "fechaSolicitud": "2022-03-10",
  "fechaAsignacion": "2022-03-10",
  "fechaCierre": "2022-03-10",
  "diagnostico": "por hacer",
  "solucion": "en proceso"

}*/
test("crear ticket", async () => {
	const nuevoTicket: TicketNew = {
		idCliente: 3,
		idTipoServicio: 1,
		idTecnico: 1,
		idEstado: 1,
		fechaSolicitud: "2022-03-10",
		fechaAsignacion: "2022-03-10",
		fechaCierre: "2022-03-10",
		diagnostico: "por hacer",
		solucion: "en proceso",
	};

	try {
		const response = await TicketApi.crearTicket(nuevoTicket);
		console.log(" Ticket creado:", response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(" Error al crear ticket:", error.response?.data);
		} else {
			console.log(" Error inesperado:", error);
		}
	}
});

//listart todos los tickets
test("listar tickets", async () => {
	try {
		const response = await TicketApi.listarTickets();
		console.log(" Lista de tickets:", response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(" Error al listar tickets:", error.response?.data);
		} else {
			console.log(" Error inesperado:", error);
		}
	}
});

//obtener un ticket por id
test("obtener ticket por id", async () => {
	const ticketId = 6;

	try {
		const response = await TicketApi.obtenerTicket(ticketId);
		console.log(" Ticket obtenido:", response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(" Error al obtener ticket:", error.response?.data);
		} else {
			console.log(" Error inesperado:", error);
		}
	}
});

//actualizar un ticket
test("actualizar ticket", async () => {
	const ticketId = 6; // Cambia esto por un ID válido
	const datosActualizados: TicketNew = {
		idCliente: 3,
		idTipoServicio: 1,
		idTecnico: 1,
		idEstado: 2,
		fechaSolicitud: "2022-03-10",
		fechaAsignacion: "2022-03-11",
		fechaCierre: "2022-03-12",
		diagnostico: "actualizado",
		solucion: "resuelto",
	};

	try {
		const response = await TicketApi.actualizarTicket(
			ticketId,
			datosActualizados,
		);
		console.log(" Ticket actualizado:", response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(" Error al actualizar ticket:", error.response?.data);
		} else {
			console.log(" Error inesperado:", error);
		}
	}
});

//eliminar un ticket
test("eliminar ticket", async () => {
	const ticketId = 1; // Cambia esto por un ID válido

	try {
		await TicketApi.eliminarTicket(ticketId);
		console.log(" Ticket eliminado");
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(" Error al eliminar ticket:", error.response?.data);
		} else {
			console.log(" Error inesperado:", error);
		}
	}
});
