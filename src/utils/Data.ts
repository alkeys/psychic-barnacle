/*
Metodos genericos para manejar datos de la API o configuraciones comunes. 
concatenar o formatear datos. en objetos o arrays.
*/
import type { UsuarioGetLogin } from "@/models/entity";
import type { UsuarioLoginContext } from "../context/AuthContext";

export const UserData = (
	data: UsuarioGetLogin,
	nombreUsuario: string,
): UsuarioLoginContext => {
	return {
		idUsuario: data.userId,
		nombreUsuario,
		rol: data.rol_cargado,
		idTecnico: data.tecnico?.id,
		idCliente: data.cliente?.id,
		nombre_completo:
			data.tecnico?.nombreCompleto || data.cliente?.nombreCompleto || "",
		correo: data.cliente?.correo,
		telefono: data.cliente?.telefono,
		especialidad: data.tecnico?.especialidad,
	};
};
