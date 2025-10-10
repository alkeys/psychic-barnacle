import axios from "axios";
import type {
	Cliente,
	EstadoTicket,
	Tecnico,
	TicketNew,
	TipoServicio,
	Usuario,
	UsuarioGetLogin,
} from "../models/entity";

/**
 * @file api.ts
 * @description Módulo para la conexión y gestión de la API REST.
 * Configura una instancia de Axios y expone objetos con métodos
 * para interactuar con los endpoints del backend.
 */

/** URL base de la API */
const apiUrl = "http://localhost:1000/innova-1.0-SNAPSHOT/";

/** Instancia preconfigurada de Axios */
const apiClient = axios.create({
	baseURL: apiUrl,
	headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
apiClient.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem("token");
		if (token && config.url !== "/usuarios/login") {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

/* ===========================================================
   Tecnicos
   =========================================================== */
/**
 * @namespace tecnicoApi
 * @description Métodos para el recurso `Tecnico`.
 */
export const tecnicoApi = {
	/**
	 * Obtiene todos los técnicos.
	 * @returns {Promise<import("axios").AxiosResponse<Tecnico[]>>} Lista de técnicos.
	 */
	listarTecnicos: () => apiClient.get<Tecnico[]>("/tecnicos/listar"),

	/**
	 * Obtiene técnicos dentro de un rango paginado.
	 * @param {number} desde - Índice inicial.
	 * @param {number} hasta - Índice final.
	 * @returns {Promise<import("axios").AxiosResponse<Tecnico[]>>} Lista de técnicos en el rango.
	 */
	listarTecnicosRango: (desde: number, hasta: number) =>
		apiClient.get<Tecnico[]>("/tecnicos/listar/rango", {
			params: { desde, hasta },
		}),

	/**
	 * Obtiene un técnico por ID.
	 * @param {string|number} id - ID del técnico.
	 * @returns {Promise<import("axios").AxiosResponse<Tecnico>>} Técnico encontrado.
	 */
	obtenerTecnico: (id: string | number) =>
		apiClient.get<Tecnico>(`/tecnicos/obtener/${id}`),

	/**
	 * Crea un nuevo técnico.
	 * @param {Tecnico} data - Datos del técnico.
	 * @returns {Promise<import("axios").AxiosResponse<Tecnico>>} Técnico creado.
	 */
	crearTecnico: (data: Tecnico) =>
		apiClient.post<Tecnico>("/tecnicos/crear", data),

	/**
	 * Actualiza un técnico existente.
	 * @param {string|number} id - ID del técnico.
	 * @param {Tecnico} data - Datos a actualizar.
	 * @returns {Promise<import("axios").AxiosResponse<Tecnico>>} Técnico actualizado.
	 */
	actualizarTecnico: (id: string | number, data: Tecnico) =>
		apiClient.put<Tecnico>(`/tecnicos/actualizar/${id}`, data),

	/**
	 * Elimina un técnico.
	 * @param {string|number} id - ID del técnico.
	 * @returns {Promise<import("axios").AxiosResponse<void>>} Confirmación de eliminación.
	 */
	eliminarTecnico: (id: string | number) =>
		apiClient.delete<void>(`/tecnicos/eliminar/${id}`),
};

/* ===========================================================
   Clientes
   =========================================================== */
/**
 * @namespace ClienteApi
 * @description Métodos para el recurso `Cliente`.
 */
export const ClienteApi = {
	/**
	 * Lista todos los clientes.
	 * @returns {Promise<import("axios").AxiosResponse<Cliente[]>>} Lista de clientes.
	 */
	listarClientes: () => apiClient.get<Cliente[]>("/clientes/listar"),

	/**
	 * Lista clientes en un rango.
	 * @param {number} desde - Índice inicial.
	 * @param {number} hasta - Índice final.
	 * @returns {Promise<import("axios").AxiosResponse<Cliente[]>>} Clientes en el rango.
	 */
	listarClientesRango: (desde: number, hasta: number) =>
		apiClient.get<Cliente[]>("/clientes/listar/rango", {
			params: { desde, hasta },
		}),

	/**
	 * Obtiene un cliente por ID.
	 * @param {string|number} id - ID del cliente.
	 * @returns {Promise<import("axios").AxiosResponse<Cliente>>} Cliente encontrado.
	 */
	obtenerCliente: (id: string | number) =>
		apiClient.get<Cliente>(`/clientes/obtener/${id}`),

	/**
	 * Crea un nuevo cliente.
	 * @param {Cliente} data - Datos del cliente.
	 * @returns {Promise<import("axios").AxiosResponse<Cliente>>} Cliente creado.
	 */
	crearCliente: (data: Cliente) =>
		apiClient.post<Cliente>("/clientes/crear", data),

	/**
	 * Actualiza un cliente.
	 * @param {string|number} id - ID del cliente.
	 * @param {Cliente} data - Datos a actualizar.
	 * @returns {Promise<import("axios").AxiosResponse<Cliente>>} Cliente actualizado.
	 */
	actualizarCliente: (id: string | number, data: Cliente) =>
		apiClient.put<Cliente>(`/clientes/actualizar/${id}`, data),

	/**
	 * Elimina un cliente.
	 * @param {string|number} id - ID del cliente.
	 * @returns {Promise<import("axios").AxiosResponse<void>>} Confirmación de eliminación.
	 */
	eliminarCliente: (id: string | number) =>
		apiClient.delete<void>(`/clientes/eliminar/${id}`),
};

/* ===========================================================
   EstadoTicket
   =========================================================== */
/**
 * @namespace EstadoTicketApi
 * @description Métodos para el recurso `EstadoTicket`.
 */
export const EstadoTicketApi = {
	/**
	 * Lista todos los estados.
	 * @returns {Promise<import("axios").AxiosResponse<EstadoTicket[]>>} Lista de estados.
	 */
	listarEstados: () => apiClient.get<EstadoTicket[]>("/estados/listar"),

	/**
	 * Obtiene un estado por ID.
	 * @param {string|number} id - ID del estado.
	 * @returns {Promise<import("axios").AxiosResponse<EstadoTicket>>} Estado encontrado.
	 */
	obtenerEstado: (id: string | number) =>
		apiClient.get<EstadoTicket>(`/estados/obtener/${id}`),

	/**
	 * Crea un nuevo estado.
	 * @param {EstadoTicket} data - Datos del estado.
	 * @returns {Promise<import("axios").AxiosResponse<EstadoTicket>>} Estado creado.
	 */
	crearEstado: (data: EstadoTicket) =>
		apiClient.post<EstadoTicket>("/estados/crear", data),

	/**
	 * Actualiza un estado.
	 * @param {string|number} id - ID del estado.
	 * @param {EstadoTicket} data - Datos a actualizar.
	 * @returns {Promise<import("axios").AxiosResponse<EstadoTicket>>} Estado actualizado.
	 */
	actualizarEstado: (id: string | number, data: EstadoTicket) =>
		apiClient.put<EstadoTicket>(`/estados/actualizar/${id}`, data),

	/**
	 * Elimina un estado.
	 * @param {string|number} id - ID del estado.
	 * @returns {Promise<import("axios").AxiosResponse<void>>} Confirmación de eliminación.
	 */
	eliminarEstado: (id: string | number) =>
		apiClient.delete<void>(`/estados/eliminar/${id}`),
};

/* ===========================================================
   TipoServicio
   =========================================================== */
/**
 * @namespace TipoServicioApi
 * @description Métodos para el recurso `TipoServicio`.
 */
export const TipoServicioApi = {
	/**
	 * Lista todos los tipos de servicio.
	 * @returns {Promise<import("axios").AxiosResponse<TipoServicio[]>>} Lista de tipos de servicio.
	 */
	listarTipos: () => apiClient.get<TipoServicio[]>("/tipos/listar"),

	/**
	 * Obtiene un tipo de servicio por ID.
	 * @param {string|number} id - ID del tipo.
	 * @returns {Promise<import("axios").AxiosResponse<TipoServicio>>} Tipo de servicio encontrado.
	 */
	obtenerTipo: (id: string | number) =>
		apiClient.get<TipoServicio>(`/tipos/obtener/${id}`),

	/**
	 * Crea un nuevo tipo de servicio.
	 * @param {TipoServicio} data - Datos del tipo.
	 * @returns {Promise<import("axios").AxiosResponse<TipoServicio>>} Tipo de servicio creado.
	 */
	crearTipo: (data: TipoServicio) =>
		apiClient.post<TipoServicio>("/tipos/crear", data),

	/**
	 * Actualiza un tipo de servicio.
	 * @param {string|number} id - ID del tipo.
	 * @param {TipoServicio} data - Datos a actualizar.
	 * @returns {Promise<import("axios").AxiosResponse<TipoServicio>>} Tipo de servicio actualizado.
	 */
	actualizarTipo: (id: string | number, data: TipoServicio) =>
		apiClient.put<TipoServicio>(`/tipos/actualizar/${id}`, data),

	/**
	 * Elimina un tipo de servicio.
	 * @param {string|number} id - ID del tipo.
	 * @returns {Promise<import("axios").AxiosResponse<void>>} Confirmación de eliminación.
	 */
	eliminarTipo: (id: string | number) =>
		apiClient.delete<void>(`/tipos/eliminar/${id}`),
};

/* ===========================================================
   Tickets
   =========================================================== */
/**
 * @namespace TicketApi
 * @description Métodos para el recurso `Ticket`.
 */
export const TicketApi = {
	/**
	 * Lista todos los tickets.
	 * @returns {Promise<import("axios").AxiosResponse<TicketNew[]>>} Lista de tickets.
	 */
	listarTickets: () => apiClient.get<TicketNew[]>("/tickets/listar"),

	/**
	 * Obtiene un ticket por ID.
	 * @param {string|number} id - ID del ticket.
	 * @returns {Promise<import("axios").AxiosResponse<TicketNew>>} Ticket encontrado.
	 */
	obtenerTicket: (id: string | number) =>
		apiClient.get<TicketNew>(`/tickets/obtener/${id}`),

	/**
	 * Crea un ticket.
	 * @param {TicketNew} data - Datos del ticket.
	 * @returns {Promise<import("axios").AxiosResponse<TicketNew>>} Ticket creado.
	 */
	crearTicket: (data: TicketNew) =>
		apiClient.post<TicketNew>("/tickets/crear", data),

	/**
	 * Actualiza un ticket.
	 * @param {string|number} id - ID del ticket.
	 * @param {TicketNew} data - Datos a actualizar.
	 * @returns {Promise<import("axios").AxiosResponse<TicketNew>>} Ticket actualizado.
	 */
	actualizarTicket: (id: string | number, data: TicketNew) =>
		apiClient.put<TicketNew>(`/tickets/actualizar/${id}`, data),

	/**
	 * Elimina un ticket.
	 * @param {string|number} id - ID del ticket.
	 * @returns {Promise<import("axios").AxiosResponse<void>>} Confirmación de eliminación.
	 */
	eliminarTicket: (id: string | number) =>
		apiClient.delete<void>(`/tickets/eliminar/${id}`),
};

/* ===========================================================
   Usuarios
   =========================================================== */
/**
 * @namespace UsuarioApi
 * @description Métodos para el recurso `Usuario`.
 */
export const UsuarioApi = {
	/**
	 * Lista todos los usuarios.
	 * @returns {Promise<import("axios").AxiosResponse<Usuario[]>>} Lista de usuarios.
	 */
	listarUsuarios: () => apiClient.get<Usuario[]>("/usuarios/listar"),

	/**
	 * Obtiene un usuario por ID.
	 * @param {string|number} id - ID del usuario.
	 * @returns {Promise<import("axios").AxiosResponse<Usuario>>} Usuario encontrado.
	 */
	obtenerUsuario: (id: string | number) =>
		apiClient.get<Usuario>(`/usuarios/obtener/${id}`),

	/**
	 * Crea un nuevo usuario.
	 * @param {Usuario} data - Datos del usuario.
	 * @returns {Promise<import("axios").AxiosResponse<Usuario>>} Usuario creado.
	 */
	crearUsuario: (data: Usuario) =>
		apiClient.post<Usuario>("/usuarios/crear", data),

	/**
	 * Actualiza un usuario.
	 * @param {string|number} id - ID del usuario.
	 * @param {Usuario} data - Datos a actualizar.
	 * @returns {Promise<import("axios").AxiosResponse<Usuario>>} Usuario actualizado.
	 */
	actualizarUsuario: (id: string | number, data: Usuario) =>
		apiClient.put<Usuario>(`/usuarios/actualizar/${id}`, data),

	/**
	 * Elimina un usuario.
	 * @param {string|number} id - ID del usuario.
	 * @returns {Promise<import("axios").AxiosResponse<void>>} Confirmación de eliminación.
	 */
	eliminarUsuario: (id: string | number) =>
		apiClient.delete<void>(`/usuarios/eliminar/${id}`),

	/**
	 * Autentica a un usuario.
	 * @param {object} data - Credenciales de acceso.
	 * @param {string} data.nombreUsuario - Nombre de usuario.
	 * @param {string} data.contrasena - Contraseña.
	 * @returns {Promise<import("axios").AxiosResponse<Usuario>>} Datos del usuario autenticado.
	 */
	login: async (data: { nombreUsuario: string; contrasena: string }) => {
		const response = await apiClient.post<UsuarioGetLogin>(
			"/usuarios/login",
			data,
		);
		return response;
	},

	/**
	 * Cierra la sesión del usuario.
	 */
	logout: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	},
};

/** Exportación por defecto de la instancia de Axios */
export default apiClient;
