import axios from "axios";
import type {
	Cliente,
	EstadoTicket,
	Tecnico,
	TicketNew,
	TipoServicio,
	Usuario,
} from "../models/entity";

/*
 conexion de api 
*/
const apiUrl = "http://localhost:9090/innova-1.0-SNAPSHOT/";

const apiClient = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Configuración de Axios para manejar las solicitudes HTTP.
 * Incluye métodos para obtener listas, rangos, por ID, crear, actualizar y eliminar recursos.
 * esto sirve para simplificar las llamadas a la API y mantener un código más limpio y organizado.
 */

/**
 *
 */
/**
 * Conjunto de métodos para interactuar con la API REST de técnicos.
 * Proporciona funciones para listar, obtener, crear, actualizar y eliminar técnicos.
 */
export const tecnicoApi = {
	listarTecnicos: () => apiClient.get("/tecnicos/listar"),
	listarTecnicosRango: (desde: number, hasta: number) =>
		apiClient.get("/tecnicos/listar/rango", { params: { desde, hasta } }),
	obtenerTecnico: (id: string | number) =>
		apiClient.get(`/tecnicos/obtener/${id}`),
	crearTecnico: (data: Tecnico) => apiClient.post("/tecnicos/crear", data),
	actualizarTecnico: (id: string | number, data: Tecnico) =>
		apiClient.put(`/tecnicos/actualizar/${id}`, data),
	eliminarTecnico: (id: string | number) =>
		apiClient.delete(`/tecnicos/eliminar/${id}`),
};

export const ClienteApi = {
	listarClientes: () => apiClient.get("/clientes/listar"),
	listarClientesRango: (desde: number, hasta: number) =>
		apiClient.get("/clientes/listar/rango", { params: { desde, hasta } }),
	obtenerCliente: (id: string | number) =>
		apiClient.get(`/clientes/obtener/${id}`),
	crearCliente: (data: Cliente) => apiClient.post("/clientes/crear", data),
	actualizarCliente: (id: string | number, data: Cliente) =>
		apiClient.put(`/clientes/actualizar/${id}`, data),
	eliminarCliente: (id: string | number) =>
		apiClient.delete(`/clientes/eliminar/${id}`),
};

export const EstadoTicketApi = {
	listarEstados: () => apiClient.get("/estados/listar"),
	obtenerEstado: (id: string | number) =>
		apiClient.get(`/estados/obtener/${id}`),
	crearEstado: (data: EstadoTicket) => apiClient.post("/estados/crear", data),
	actualizarEstado: (id: string | number, data: EstadoTicket) =>
		apiClient.put(`/estados/actualizar/${id}`, data),
	eliminarEstado: (id: string | number) =>
		apiClient.delete(`/estados/eliminar/${id}`),
};

export const TipoServicioApi = {
	listarTipos: () => apiClient.get("/tipos/listar"),
	obtenerTipo: (id: string | number) => apiClient.get(`/tipos/obtener/${id}`),
	crearTipo: (data: TipoServicio) => apiClient.post("/tipos/crear", data),
	actualizarTipo: (id: string | number, data: TipoServicio) =>
		apiClient.put(`/tipos/actualizar/${id}`, data),
	eliminarTipo: (id: string | number) =>
		apiClient.delete(`/tipos/eliminar/${id}`),
};

export const TicketApi = {
	listarTickets: () => apiClient.get("/tickets/listar"),
	obtenerTicket: (id: string | number) =>
		apiClient.get(`/tickets/obtener/${id}`),
	crearTicket: (data: TicketNew) => apiClient.post("/tickets/crear", data),
	actualizarTicket: (id: string | number, data: TicketNew) =>
		apiClient.put(`/tickets/actualizar/${id}`, data),
	eliminarTicket: (id: string | number) =>
		apiClient.delete(`/tickets/eliminar/${id}`),
};

export const UsuarioApi = {
	listarUsuarios: () => apiClient.get("/usuarios/listar"),
	obtenerUsuario: (id: string | number) =>
		apiClient.get(`/usuarios/obtener/${id}`),
	crearUsuario: (data: Usuario) => apiClient.post("/usuarios/crear", data),
	actualizarUsuario: (id: string | number, data: Usuario) =>
		apiClient.put(`/usuarios/actualizar/${id}`, data),
	eliminarUsuario: (id: string | number) =>
		apiClient.delete(`/usuarios/eliminar/${id}`),
	login: (data: { nombreUsuario: string; contrasena: string }) =>
		apiClient.get(`/usuarios/Login/${data.nombreUsuario}/${data.contrasena}`),
};

export default apiClient;
