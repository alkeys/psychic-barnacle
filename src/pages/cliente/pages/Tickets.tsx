"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import type { EstadoTicket, TicketNew } from "../../../models/entity"
import { EstadoTicketApi, TicketApi, tecnicoApi } from "../../../service/ApiClient"
import type { Tecnico } from "../../../models/entity"
import { useAuth } from "@/context/AuthContext"

const Tickets: React.FC = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<TicketNew>()
  const [estados, setEstados] = useState<EstadoTicket[]>([])
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [filteredTecnicos, setFilteredTecnicos] = useState<Tecnico[]>([])

  const { currentUser } = useAuth()

  const [tiposServicio] = useState<{ id: number; nombreServicio: string }[]>([
    { id: 1, nombreServicio: "Hardware" },
    { id: 2, nombreServicio: "Redes" },
    { id: 3, nombreServicio: "Software" },
  ])

  const selectedTipoServicioId = watch("idTipoServicio")

  useEffect(() => {
    EstadoTicketApi.listarEstados()
      .then((response) => {
        setEstados(response.data)
        console.log("Estados de tickets cargados:", response.data)
      })
      .catch((error) => {
        console.error("Error al cargar estados de tickets:", error)
      })

    tecnicoApi
      .listarTecnicos()
      .then((response) => {
        setTecnicos(response.data)
        console.log("Técnicos cargados:", response.data)
      })
      .catch((error) => {
        console.error("Error al cargar técnicos:", error)
      })
  }, [])

  useEffect(() => {
    if (!selectedTipoServicioId) {
      setFilteredTecnicos([])
      setValue("idTecnico", 0)
      return
    }

    const selectedService = tiposServicio.find((tipo) => tipo.id === Number(selectedTipoServicioId))

    if (selectedService) {
      const filtered = tecnicos.filter((tecnico) => tecnico.especialidad === selectedService.nombreServicio)
      setFilteredTecnicos(filtered)
    } else {
      setFilteredTecnicos([])
    }

    setValue("idTecnico", 0)
  }, [selectedTipoServicioId, tecnicos, tiposServicio, setValue])

  const onSubmit: SubmitHandler<TicketNew> = async (data) => {
    if (!currentUser || !currentUser.idCliente) {
      alert("No se pudo obtener el ID del cliente.")
      return
    }

    const FechaActual = new Date()
    const FechaFormateada = `${FechaActual.getFullYear()}-${(FechaActual.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${FechaActual.getDate().toString().padStart(2, "0")}`

    const fechaCierreInicial = "2000-01-01"

    const nuevoTicket: TicketNew = {
      ...data,
      idTipoServicio: Number(data.idTipoServicio),
      idTecnico: Number(data.idTecnico),
      idEstado: Number(data.idEstado),
      idCliente: currentUser.idCliente,
      diagnostico: data.diagnostico,
      fechaAsignacion: FechaFormateada,
      fechaSolicitud: FechaFormateada,
      fechaCierre: fechaCierreInicial,
      solucion: "En espera",
    }

    console.log("Nuevo Ticket:", nuevoTicket)

    try {
      const response = await TicketApi.crearTicket(nuevoTicket)
      alert("Ticket creado con éxito.")
    } catch (error) {
      console.error("Error al crear el ticket:", error)
      alert("Hubo un error al crear el ticket. Por favor, inténtelo de nuevo.")
    }

    reset()
    setFilteredTecnicos([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fbcfe8] to-[#f472b6] flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#be185d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#a21caf] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Ticket Creation Card */}
      <div className="relative w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#f472b6]/20 animate-[fadeIn_0.6s_ease-out]">
          {/* Header */}
          <div className="text-center mb-8 animate-[slideDown_0.6s_ease-out]">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#be185d] to-[#a21caf] mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Ticket Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
              Crear Nuevo Ticket
            </h1>
            <p className="text-[#a21caf] mt-2">Complete el formulario para crear un ticket de soporte</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="animate-[slideUp_0.6s_ease-out_0.1s_both]">
              <label htmlFor="tipoServicio" className="block text-sm font-semibold text-[#be185d] mb-2">
                Tipo de Servicio
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Service Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <select
                  id="tipoServicio"
                  {...register("idTipoServicio", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-[#fdf2f8] border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Seleccione un servicio</option>
                  {tiposServicio.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombreServicio}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="animate-[slideUp_0.6s_ease-out_0.2s_both]">
              <label htmlFor="tecnico" className="block text-sm font-semibold text-[#be185d] mb-2">
                Técnico Asignado
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Technician Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <select
                  id="tecnico"
                  {...register("idTecnico", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-[#fdf2f8] border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 text-gray-800 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedTipoServicioId || filteredTecnicos.length === 0}
                >
                  <option value="">
                    {!selectedTipoServicioId ? "Seleccione un servicio primero" : "Seleccione un técnico"}
                  </option>
                  {filteredTecnicos.map((tecnico) => (
                    <option key={tecnico.id} value={tecnico.id}>
                      {tecnico.nombreCompleto}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="animate-[slideUp_0.6s_ease-out_0.3s_both]">
              <label htmlFor="estado" className="block text-sm font-semibold text-[#be185d] mb-2">
                Estado del Ticket
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Status Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <select
                  id="estado"
                  {...register("idEstado", { required: true })}
                  className="w-full pl-12 pr-4 py-3 bg-[#fdf2f8] border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Seleccione un estado</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nombreEstado}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="animate-[slideUp_0.6s_ease-out_0.4s_both]">
              <label htmlFor="diagnostico" className="block text-sm font-semibold text-[#be185d] mb-2">
                Problema Presentado
              </label>
              <div className="relative">
                <textarea
                  id="diagnostico"
                  {...register("diagnostico", { required: true })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#fdf2f8] border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-[#a21caf]/50 resize-none"
                  placeholder="Describa el problema que está experimentando..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-[#be185d] to-[#a21caf] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 animate-[slideUp_0.6s_ease-out_0.5s_both]"
            >
              Crear Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Tickets
