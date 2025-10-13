/*
  Versión refactorizada de las entidades de la base de datos.
  - Se usa la convención PascalCase para los nombres de las interfaces.
  - Se eliminan propiedades redundantes para mayor claridad.
*/

interface Entity {
	id?: number;
}

interface Persona extends Entity {
	nombreCompleto: string; // Usando camelCase para propiedades
}

// --- Entidades Específicas ---

export interface Tecnico extends Persona {
	activo: boolean;
	especialidad: string;
	usuarioId?: number;
}

export interface Cliente extends Persona {
	correo: string;
	telefono: string;
	usuarioId?: number;
}

export interface ClienteGet extends Cliente {
	ticketsId: string[];
}

export interface EstadoTicket extends Entity {
	nombre: string;
}

export interface TipoServicio extends Entity {
	nombre: string;
}

export interface Ticket extends Entity {
	diagnostico: string;
	fechaSolicitud: string; // Considerar usar el tipo Date si se va a manipular

	// IDs de las relaciones
	idCliente: number;
	idEstado: number;
	idTipoServicio: number;

	// Campos denormalizados (traídos por un JOIN)
	nombreCliente: string;
	nombreEstado: string;
	nombreTipoServicio: string;
}

export interface TicketNew {
	idCliente: number;
	idTipoServicio: number;
	idTecnico: number;
	idEstado: number;
	fechaSolicitud: string;
	fechaAsignacion: string;
	fechaCierre: string;
	diagnostico: string;
	solucion: string;
}

export interface Usuario extends Entity {
	idcliente?: number;
	idtecnico?: number;

	idCliente?: number;
	idTecnico?: number;

	nombreUsuario: string;
	rol: string;
	contrasena: string;
}

export interface UsuarioGetLogin {
	token: string;
	rol_cargado: string;
	userId: number;
	tecnico?: Tecnico;
	cliente?: Cliente;
}

// El tipo unificado ahora usa los nuevos nombres
export type UnifiedEntity =
	| Tecnico
	| Cliente
	| EstadoTicket
	| TipoServicio
	| Ticket;
