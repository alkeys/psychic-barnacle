import React, { useState, useEffect } from "react";
import type { Usuario, Cliente, Tecnico } from "../../../../models/entity";
import EditarCliente from "../../components/EditarCliente";
import EditarTecnico from "../../components/EditarTecnico";
import {
	UsuarioApi,
	ClienteApi,
	tecnicoApi,
} from "../../../../service/ApiClient";

type EditarUsuarioProps = {
	usuario: Usuario;
	onGuardar: (usuarioActualizado: Usuario) => void;
	onCancelar: () => void;
};

const EditarUsuario: React.FC<EditarUsuarioProps> = ({
	usuario,
	onGuardar,
	onCancelar,
}) => {
	const [cliente, setCliente] = useState<Cliente | null>(null);
	const [tecnico, setTecnico] = useState<Tecnico | null>(null);
	const [form, setForm] = useState<Usuario>({ ...usuario });
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const u = { ...usuario };
		setForm(u);
		setCliente(null);
		setTecnico(null);

		const cargarDatos = async () => {
			try {
				if (u.rol === "cliente" && u.idCliente) {
					const response = await ClienteApi.obtenerCliente(u.idCliente);
					setCliente(response.data);
				}
				if (u.rol === "tecnico" && u.idTecnico) {
					const response = await tecnicoApi.obtenerTecnico(u.idTecnico);
					setTecnico(response.data);
				}
			} catch (error) {
				console.error("Error al cargar datos del usuario:", error);
			}
		};

		cargarDatos();
	}, [usuario]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (form.id == null || isSaving) return;

		setIsSaving(true);
		try {
			await UsuarioApi.actualizarUsuario(form.id, form);
			onGuardar(form);
			alert("✅ Usuario actualizado con éxito");
		} catch (error) {
			console.error("Error al actualizar el usuario:", error);
			alert("❌ Error al actualizar el usuario");
		} finally {
			setIsSaving(false);
		}
	};

	const handleGuardarCliente = async (clienteActualizado: Cliente) => {
		try {
			if (clienteActualizado.id == null) {
				throw new Error("Cliente id no disponible");
			}
			await ClienteApi.actualizarCliente(
				clienteActualizado.id,
				clienteActualizado,
			);
			setCliente(clienteActualizado);
			setForm((prev) => ({ ...prev, idCliente: clienteActualizado.id }));
			alert("✅ Datos de Cliente actualizados.");
		} catch (error) {
			console.error("Error al guardar el cliente:", error);
			alert("❌ Error al guardar el Cliente.");
		}
	};

	const handleGuardarTecnico = async (tecnicoActualizado: Tecnico) => {
		try {
			if (tecnicoActualizado.id == null) {
				throw new Error("Técnico id no disponible");
			}
			await tecnicoApi.actualizarTecnico(
				tecnicoActualizado.id,
				tecnicoActualizado,
			);
			setTecnico(tecnicoActualizado);
			setForm((prev) => ({ ...prev, idTecnico: tecnicoActualizado.id }));
			alert("✅ Datos de Técnico actualizados.");
		} catch (error) {
			console.error("Error al guardar el técnico:", error);
			alert("❌ Error al guardar el Técnico.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4 border-b border-gray-200 pb-6">
				<p className="text-lg font-semibold text-gray-700">
					Datos de la Cuenta
				</p>

				<input
					name="nombreUsuario"
					value={form.nombreUsuario || ""}
					onChange={handleChange}
					required
					className="w-full p-3 border border-gray-300 rounded-lg"
					disabled={isSaving}
				/>

				<input
					name="contrasena"
					type="password"
					value={form.contrasena || ""}
					onChange={handleChange}
					className="w-full p-3 border border-gray-300 rounded-lg"
					disabled={isSaving}
					placeholder="Nueva contraseña opcional"
				/>
			</div>

			<div className="border-b border-gray-200 pb-6">
				<p className="text-lg font-semibold text-gray-700 mb-2">Rol Asignado</p>
				<div className="p-3 bg-[#fbcfe8] rounded-lg capitalize font-bold">
					{form.rol || "Sin Rol"}
				</div>
			</div>

			{form.rol === "tecnico" && tecnico && (
				<div className="p-6 border-2 rounded-xl bg-indigo-50/50 shadow-inner">
					<h3 className="text-xl font-bold mb-4">Editar Datos del Técnico</h3>
					<EditarTecnico
						tecnico={tecnico}
						onGuardar={handleGuardarTecnico}
						onCancelar={() => console.log("Cancelada edición técnico")}
					/>
				</div>
			)}

			{form.rol === "cliente" && cliente && (
				<div className="p-6 border-2 rounded-xl bg-indigo-50/50 shadow-inner">
					<h3 className="text-xl font-bold mb-4">Editar Datos del Cliente</h3>
					<EditarCliente
						cliente={cliente}
						onGuardar={handleGuardarCliente}
						onCancelar={() => console.log("Cancelada edición cliente")}
					/>
				</div>
			)}

			<div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
				<button
					type="button"
					onClick={onCancelar}
					className="px-4 py-2 bg-gray-300 rounded-lg"
					disabled={isSaving}
				>
					Cancelar
				</button>
				<button
					type="submit"
					className="px-4 py-2 text-white rounded-lg bg-[#be185d]"
					disabled={isSaving}
				>
					{isSaving ? "Guardando..." : "Guardar Usuario"}
				</button>
			</div>
		</form>
	);
};

export default EditarUsuario;
