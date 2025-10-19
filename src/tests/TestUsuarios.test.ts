import { test } from "vitest";
import type { Usuario } from "../models/entity";
import { UsuarioApi } from "../service/ApiClient";
let idUsuarioCreado: number | undefined;

test("crear un usuario", async () => {
	const nuevoUsuario: Usuario = {
		nombreUsuario: "maria123",
		contrasena: "password456",
		rol: "cliente",
	};

	try {
		const usuarioCreado = await UsuarioApi.crearUsuario(nuevoUsuario);
		if (usuarioCreado.data.id !== undefined) {
			idUsuarioCreado = usuarioCreado.data.id;
		}
	} catch (error) {
		console.error("Error al crear usuario:", error);
	}
});
test("obtener usuario por id", async () => {
	if (idUsuarioCreado === undefined) {
		throw new Error("El ID del usuario creado no está definido.");
	}

	try {
		const usuarioObtenido = await UsuarioApi.obtenerUsuario(idUsuarioCreado);
		console.log("Usuario obtenido:", usuarioObtenido.data);
	} catch (error) {
		console.error("Error al obtener usuario:", error);
	}
});
test("listar usuarios", async () => {
	try {
		const listaUsuarios = await UsuarioApi.listarUsuarios();
		console.log("Lista de usuarios:", listaUsuarios.data);
	} catch (error) {
		console.error("Error al listar usuarios:", error);
	}
});

test("eliminar usuario", async () => {
	//espera 3 segundos para evitar conflictos con la base de datos
	await new Promise((resolve) => setTimeout(resolve, 3000));
	if (idUsuarioCreado === undefined) {
		throw new Error("El ID del usuario creado no está definido.");
	}

	try {
		await UsuarioApi.eliminarUsuario(idUsuarioCreado);
		console.log("Usuario eliminado");
	} catch (error) {
		console.error("Error al eliminar usuario:", error);
	}
});
