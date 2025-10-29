import React, { useEffect, useState } from "react";
// <-- CAMBIO: Importar watch y setValue
import { useForm, type SubmitHandler } from "react-hook-form";
import type { EstadoTicket, Ticket, TicketNew } from "../../../models/entity";
import {
	EstadoTicketApi,
	TicketApi,
	tecnicoApi,
} from "../../../service/ApiClient";
import type { Tecnico, Cliente } from "../../../models/entity";
import { useAuth } from "@/context/AuthContext";
import { T } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

const Tickets: React.FC = () => {
	// <-- CAMBIO: Extraer watch y setValue
	const { register, handleSubmit, reset, watch, setValue } =
		useForm<TicketNew>();
	const [estados, setEstados] = useState<EstadoTicket[]>([]);
	const [tecnicos, setTecnicos] = useState<Tecnico[]>([]); // Lista completa
	// <-- CAMBIO: Añadir estado para técnicos filtrados
	const [filteredTecnicos, setFilteredTecnicos] = useState<Tecnico[]>([]);

	const { currentUser } = useAuth();

	const [tiposServicio] = useState<{ id: number; nombreServicio: string }[]>([
		{ id: 1, nombreServicio: "Hardware" },
		{ id: 2, nombreServicio: "Redes" },
		{ id: 3, nombreServicio: "Software" },
	]);

	// <-- CAMBIO: Observar el valor del select de tipo de servicio
	const selectedTipoServicioId = watch("idTipoServicio");

	useEffect(() => {
		// Cargar estados de tickets
		EstadoTicketApi.listarEstados()
			.then((response) => {
				setEstados(response.data);
				console.log("Estados de tickets cargados:", response.data);
			})
			.catch((error) => {
				console.error("Error al cargar estados de tickets:", error);
			});

		// Cargar tecnicos (lista completa)
		tecnicoApi
			.listarTecnicos()
			.then((response) => {
				setTecnicos(response.data);
				console.log("Técnicos cargados:", response.data);
			})
			.catch((error) => {
				console.error("Error al cargar técnicos:", error);
			});
	}, []);

	// <-- CAMBIO: Nuevo useEffect para filtrar técnicos
	useEffect(() => {
		if (!selectedTipoServicioId) {
			setFilteredTecnicos([]); // Si no hay servicio, la lista está vacía
			setValue("idTecnico", 0); // Resetea el valor del técnico seleccionado
			return;
		}

		// 1. Encontrar el nombre del servicio seleccionado (ej. "Hardware")
		// Nota: El valor del select puede ser string, lo convertimos a número
		const selectedService = tiposServicio.find(
			(tipo) => tipo.id === Number(selectedTipoServicioId),
		);

		if (selectedService) {
			// 2. Filtrar la lista completa de técnicos
			const filtered = tecnicos.filter(
				(tecnico) => tecnico.especialidad === selectedService.nombreServicio,
			);
			setFilteredTecnicos(filtered);
		} else {
			setFilteredTecnicos([]);
		}

		// 3. Resetear la selección de técnico cada vez que cambia el servicio
		setValue("idTecnico", 0);
	}, [selectedTipoServicioId, tecnicos, tiposServicio, setValue]); // Dependencias del efecto

	const onSubmit: SubmitHandler<TicketNew> = async (data) => {
		if (!currentUser || !currentUser.idCliente) {
			alert("No se pudo obtener el ID del cliente.");
			return;
		}

		//la fecha tiene que ser asi 2025-10-20
		const FechaActual = new Date();
		const FechaFormateada = `${FechaActual.getFullYear()}-${(
			FechaActual.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}-${FechaActual.getDate().toString().padStart(2, "0")}`;

		const fechaCierreInicial = "2000-01-01";

		const nuevoTicket: TicketNew = {
			...data,
			// Asegúrate de convertir los IDs a número si la API lo requiere
			idTipoServicio: Number(data.idTipoServicio),
			idTecnico: Number(data.idTecnico),
			idEstado: Number(data.idEstado),
			idCliente: currentUser.idCliente,
			diagnostico: data.diagnostico,
			fechaAsignacion: FechaFormateada,
			fechaSolicitud: FechaFormateada,
			fechaCierre: fechaCierreInicial,
			solucion: "En espera", // Inicialmente nulo
		};

		console.log("Nuevo Ticket:", nuevoTicket);

		try {
			const response = await TicketApi.crearTicket(nuevoTicket);
			alert("Ticket creado con éxito.");
		} catch (error) {
			console.error("Error al crear el ticket:", error);
			alert("Hubo un error al crear el ticket. Por favor, inténtelo de nuevo.");
		}

		// Resetear el formulario después de enviar

		reset();
		setFilteredTecnicos([]); // Limpiar lista filtrada después de enviar
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Crear Nuevo Ticket</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label className="block mb-1">Tipo de Servicio:</label>
					<select
						{...register("idTipoServicio", { required: true })}
						className="w-full border border-gray-300 p-2 rounded"
					>
						<option value="">Seleccione un servicio</option>
						{tiposServicio.map((tipo) => (
							<option key={tipo.id} value={tipo.id}>
								{tipo.nombreServicio}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block mb-1">Técnico Asignado:</label>
					<select
						{...register("idTecnico", { required: true })}
						className="w-full border border-gray-300 p-2 rounded"
						// <-- CAMBIO: Deshabilitar si no hay servicio seleccionado
						disabled={!selectedTipoServicioId || filteredTecnicos.length === 0}
					>
						<option value="">
							{/* <-- CAMBIO: Mensaje dinámico */}
							{!selectedTipoServicioId
								? "Seleccione un servicio primero"
								: "Seleccione un técnico"}
						</option>
						{/* <-- CAMBIO: Mapear sobre la lista filtrada */}
						{filteredTecnicos.map((tecnico) => (
							<option key={tecnico.id} value={tecnico.id}>
								{tecnico.nombreCompleto}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className="block mb-1">Estado del Ticket:</label>
					<select
						{...register("idEstado", { required: true })}
						className="w-full border border-gray-300 p-2 rounded"
					>
						<option value="">Seleccione un estado</option>
						{estados.map((estado) => (
							<option key={estado.id} value={estado.id}>
								{estado.nombreEstado}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block mb-1">Problema presentado:</label>
					<textarea
						{...register("diagnostico", { required: true })}
						className="w-full border border-gray-300 p-2 rounded"
					/>
				</div>

				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Crear Ticket
				</button>
			</form>
		</div>
	);
};

export default Tickets;
