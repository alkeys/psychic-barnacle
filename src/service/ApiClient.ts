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

/** URL base de la API */
const apiUrl =
	"https://glowing-guacamole-at64.onrender.com/innova-1.0-SNAPSHOT";

/** Instancia preconfigurada de Axios */
const apiClient = axios.create({
	baseURL: apiUrl,
	headers: { "Content-Type": "application/json" },
});

/* ===========================================================
   Tecnicos
   =========================================================== */
export const tecnicoApi = {
	listarTecnicos: () => apiClient.get<Tecnico[]>("/tecnicos/listar"),
	listarTecnicosRango: (desde: number, hasta: number) =>
		apiClient.get<Tecnico[]>("/tecnicos/listar/rango", {
			params: { desde, hasta },
		}),
	obtenerTecnico: (id: string | number) =>
		apiClient.get<Tecnico>(`/tecnicos/obtener/${id}`),
	crearTecnico: (data: Tecnico) =>
		apiClient.post<Tecnico>("/tecnicos/crear", data),
	actualizarTecnico: (id: string | number, data: Tecnico) =>
		apiClient.put<Tecnico>(`/tecnicos/actualizar/${id}`, data),
	eliminarTecnico: (id: string | number) =>
		apiClient.delete<void>(`/tecnicos/eliminar/${id}`),
};

/* ===========================================================
   Clientes
   =========================================================== */
export const ClienteApi = {
	listarClientes: () => apiClient.get<Cliente[]>("/clientes/listar"),
	listarClientesRango: (start: number, size: number) =>
		apiClient.get<Cliente[]>("/clientes/listar/rango", {
			params: { start, size },
		}),
	obtenerCliente: (id: string | number) =>
		apiClient.get<Cliente>(`/clientes/obtener/${id}`),
	crearCliente: (data: Cliente) =>
		apiClient.post<Cliente>("/clientes/crear", data),
	actualizarCliente: (id: string | number, data: Cliente) =>
		apiClient.put<Cliente>(`/clientes/actualizar/${id}`, data),
	eliminarCliente: (id: string | number) =>
		apiClient.delete<void>(`/clientes/eliminar/${id}`),
};

/* ===========================================================
   EstadoTicket
   =========================================================== */
export const EstadoTicketApi = {
	listarEstados: () => apiClient.get<EstadoTicket[]>("/estados/listar"),
	obtenerEstado: (id: string | number) =>
		apiClient.get<EstadoTicket>(`/estados/obtener/${id}`),
	crearEstado: (data: EstadoTicket) =>
		apiClient.post<EstadoTicket>("/estados/crear", data),
	actualizarEstado: (id: string | number, data: EstadoTicket) =>
		apiClient.put<EstadoTicket>(`/estados/actualizar/${id}`, data),
	eliminarEstado: (id: string | number) =>
		apiClient.delete<void>(`/estados/eliminar/${id}`),
};

/* ===========================================================
   TipoServicio
   =========================================================== */
export const TipoServicioApi = {
	listarTipos: () => apiClient.get<TipoServicio[]>("/tipos/listar"),
	obtenerTipo: (id: string | number) =>
		apiClient.get<TipoServicio>(`/tipos/obtener/${id}`),
	crearTipo: (data: TipoServicio) =>
		apiClient.post<TipoServicio>("/tipos/crear", data),
	actualizarTipo: (id: string | number, data: TipoServicio) =>
		apiClient.put<TipoServicio>(`/tipos/actualizar/${id}`, data),
	eliminarTipo: (id: string | number) =>
		apiClient.delete<void>(`/tipos/eliminar/${id}`),
};

/* ===========================================================
   Tickets
   =========================================================== */
export const TicketApi = {
	listarTickets: () => apiClient.get<TicketNew[]>("/tickets/listar"),
	obtenerTicket: (id: string | number) =>
		apiClient.get<TicketNew>(`/tickets/obtener/${id}`),
	crearTicket: (data: TicketNew) =>
		apiClient.post<TicketNew>("/tickets/crear", data),
	actualizarTicket: (id: string | number, data: TicketNew) =>
		apiClient.put<TicketNew>(`/tickets/actualizar/${id}`, data),
	eliminarTicket: (id: string | number) =>
		apiClient.delete<void>(`/tickets/eliminar/${id}`),
};

/* ===========================================================
   Usuarios
   =========================================================== */
export const UsuarioApi = {
	listarUsuarios: () => apiClient.get<Usuario[]>("/usuarios/listar"),
	obtenerUsuario: (id: string | number) =>
		apiClient.get<Usuario>(`/usuarios/obtener/${id}`),
	crearUsuario: (data: Usuario) =>
		apiClient.post<Usuario>("/usuarios/crear", data),
	actualizarUsuario: (id: number | number, data: Usuario) =>
		apiClient.put<Usuario>(`/usuarios/actualizar/${id}`, data),
	eliminarUsuario: (id: string | number) =>
		apiClient.delete<void>(`/usuarios/eliminar/${id}`),
};

export const LoginApi = {
	login: async (data: { nombreUsuario: string; contrasena: string }) => {
		const response = await apiClient.post<UsuarioGetLogin>(
			"/login/login",
			data,
		);
		return response;
	},
	logout: () => {
		localStorage.removeItem("user");
	},
};

export default apiClient;
