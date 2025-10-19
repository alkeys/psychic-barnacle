// test para comprobar la API de clientes

import { ClienteApi } from "../service/ApiClient";
import type { Cliente } from "../models/entity";
import { test, expect } from "vitest";

let idClienteCreado: number | undefined;
/*
{
  "usuarioId": 14,
  "nombreCompleto": "string",
  "correo": "string",
  "telefono": "string"
}*/
test("Crear un nuevo cliente", async () => {
	const nuevoCliente: Cliente = {
		usuarioId: 14,
		nombreCompleto: "Juan Pérez",
		correo: "juan.perez@example.com",
		telefono: "1234567890",
	};
	try {
		const response = await ClienteApi.crearCliente(nuevoCliente);
		console.log(" Cliente creado:", response.data);
		if (typeof response.data?.id === "number") {
			idClienteCreado = response.data.id; // Guardar el ID del cliente creado
		} else {
			console.warn("Respuesta sin id de cliente:", response.data);
		}
	} catch (error) {
		console.log(" Error al crear cliente:", error);
	}
});

test("Listar todos los clientes", async () => {
	try {
		const response = await ClienteApi.listarClientes();
		console.log(" Lista de clientes:", response.data);
	} catch (error) {
		console.log(" Error al listar clientes:", error);
	}
});

test("Obtener cliente por ID", async () => {
	const clienteId = 3; // Cambia esto por un ID válido
	try {
		const response = await ClienteApi.obtenerCliente(clienteId);
		console.log(" Cliente obtenido:", response.data);
	} catch (error) {
		console.log(" Error al obtener cliente:", error);
	}
});

test("Actualizar cliente", async () => {
	const clienteId = 3; // Cambia esto por un ID válido
	const datosActualizados: Cliente = {
		usuarioId: 14,
		nombreCompleto: "Juan Pérez Actualizado",
		correo: "juan.perez.actualizado@example.com",
		telefono: "0987654321",
	};
	try {
		const response = await ClienteApi.actualizarCliente(
			clienteId,
			datosActualizados,
		);
		console.log(" Cliente actualizado:", response.data);
	} catch (error) {
		console.log(" Error al actualizar cliente:", error);
	}
});

test("Eliminar cliente", async () => {
	const clienteId = idClienteCreado;
	if (!clienteId) {
		console.warn("No se proporcionó un ID de cliente válido para eliminar.");
		return;
	}
	try {
		await ClienteApi.eliminarCliente(clienteId);
		console.log(" Cliente eliminado correctamente");
	} catch (error) {
		console.log(" Error al eliminar cliente:", error);
	}
});
