import { test, expect } from "vitest";
import type { Tecnico, Usuario } from "../models/entity";
import { tecnicoApi, UsuarioApi } from "../service/ApiClient";
let idTecnicoCreado: number | undefined;
let idUsuarioCreado2: number | undefined;

test("crear un usuario", async () => {
	const nuevoUsuario: Usuario = {
		nombreUsuario: "maria1232",
		contrasena: "password4536",
		rol: "cliente",
	};

	try {
		const usuarioCreado = await UsuarioApi.crearUsuario(nuevoUsuario);
		if (usuarioCreado.data.id !== undefined) {
			idUsuarioCreado2 = usuarioCreado.data.id;
		}
	} catch (error) {
		console.error("Error al crear usuario:", error);
	}
});

test("crear un tecnico", async () => {
	const nuevoTecnico: Tecnico = {
		activo: true,
		especialidad: "Electricidad",
		nombreCompleto: "Juan Perez",
		idUsuario: idUsuarioCreado2 as number,
	};

	try {
		const tecnicoCreado = await tecnicoApi.crearTecnico(nuevoTecnico);
		if (tecnicoCreado.data.id !== undefined) {
			idTecnicoCreado = tecnicoCreado.data.id;
		}
	} catch (error) {
		console.error("Error al crear técnico:", error);
	}
});
test("obtener tecnico por id", async () => {
	if (idTecnicoCreado === undefined) {
		throw new Error("El ID del técnico creado no está definido.");
	}

	try {
		const tecnicoObtenido = await tecnicoApi.obtenerTecnico(idTecnicoCreado);
		expect(tecnicoObtenido.data.id).toBe(idTecnicoCreado);
	} catch (error) {
		console.error("Error al obtener técnico por ID:", error);
	}
});
test("listar tecnicos", async () => {
	try {
		const listaTecnicos = await tecnicoApi.listarTecnicos();
		expect(Array.isArray(listaTecnicos.data)).toBe(true);
	} catch (error) {
		console.error("Error al listar técnicos:", error);
	}
});

test("eliminar tecnico", async () => {
	//espera 3 segundos para evitar conflictos con la base de datos
	await new Promise((resolve) => setTimeout(resolve, 3000));
	if (idTecnicoCreado === undefined) {
		throw new Error("El ID del técnico creado no está definido.");
	}

	try {
		await tecnicoApi.eliminarTecnico(idTecnicoCreado);
		console.log("Técnico desactivado");
	} catch (error) {
		console.error("Error al eliminar técnico:", error);
	}
});

test("eliminar usuario", async () => {
	//espera 3 segundos para evitar conflictos con la base de datos
	await new Promise((resolve) => setTimeout(resolve, 3000));
	if (idUsuarioCreado2 === undefined) {
		throw new Error("El ID del usuario creado no está definido.");
	}

	try {
		await UsuarioApi.eliminarUsuario(idUsuarioCreado2);
		console.log("Usuario eliminado");
	} catch (error) {
		console.error("Error al eliminar usuario:", error);
	}
});
