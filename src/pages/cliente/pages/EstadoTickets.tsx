"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import type { Ticket } from "../../../models/entity"
import { TicketApi } from "../../../service/ApiClient"
import { useAuth } from "@/context/AuthContext"

const EstadoTickets: React.FC = () => {
  const { currentUser } = useAuth()
  const [allTickets, setAllTickets] = useState<Ticket[]>([])
  const [filterEstado, setFilterEstado] = useState<string>("")
  const [availableEstados, setAvailableEstados] = useState<string[]>([])

  useEffect(() => {
    if (!currentUser) {
      setAllTickets([])
      return
    }

    const fetchTickets = async () => {
      try {
        const response = await TicketApi.listarTickets()
        const clienteTickets = response.data.filter((ticket) => ticket.idCliente === currentUser.idCliente)

        setAllTickets(clienteTickets)

        const uniqueEstados = [
          ...new Set(
            clienteTickets.map((ticket) => ticket.nombreEstado).filter((s): s is string => typeof s === "string"),
          ),
        ]
        setAvailableEstados(uniqueEstados)

        console.log("Tickets del cliente cargados:", clienteTickets)
      } catch (error) {
        console.error("Error al cargar los tickets del cliente:", error)
      }
    }

    fetchTickets()
  }, [currentUser])

  const filteredTickets = useMemo(() => {
    if (filterEstado === "") {
      return allTickets
    }
    return allTickets.filter((ticket) => ticket.nombreEstado === filterEstado)
  }, [allTickets, filterEstado])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fbcfe8] to-[#f472b6] p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#be185d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#a21caf] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#f472b6]/20 mb-6 animate-[fadeIn_0.6s_ease-out]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#be185d] to-[#a21caf] shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Tickets Icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
                  Estado de Tickets
                </h1>
                <p className="text-[#a21caf] mt-1">
                  Total: {filteredTickets.length} {filteredTickets.length === 1 ? "ticket" : "tickets"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="estadoFilter" className="text-sm font-semibold text-[#be185d] whitespace-nowrap">
                Filtrar por estado:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>Filter Icon</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </div>
                <select
                  id="estadoFilter"
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-[#fdf2f8] border-2 border-[#f472b6]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-transparent transition-all duration-300 text-gray-800 appearance-none cursor-pointer text-sm"
                >
                  <option value="">Todos</option>
                  {availableEstados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-[#f472b6]/20 text-center animate-[fadeIn_0.6s_ease-out]">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#be185d]/10 to-[#a21caf]/10 mb-4">
              <svg className="w-10 h-10 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Empty Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-[#be185d]">
              {allTickets.length === 0
                ? "No hay tickets para este cliente"
                : "No hay tickets que coincidan con el filtro"}
            </p>
            <p className="text-[#a21caf] mt-2">
              {allTickets.length === 0 ? "Crea tu primer ticket para comenzar" : "Intenta con otro filtro"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 animate-[fadeIn_0.6s_ease-out]">
            {filteredTickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-[#f472b6]/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Ticket Header */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#f472b6]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#be185d] to-[#a21caf] flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Service Type Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#be185d]">{ticket.nombreTipoServicio}</h3>
                      <p className="text-sm text-[#a21caf]">Ticket #{ticket.id}</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#be185d]/10 to-[#a21caf]/10 text-[#be185d] font-semibold text-sm border border-[#f472b6]/30">
                    {ticket.nombreEstado}
                  </span>
                </div>

                {/* Ticket Details */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fdf2f8] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Client Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#a21caf] font-semibold">Cliente</p>
                      <p className="text-sm text-gray-800 font-medium">{ticket.nombreCliente}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fdf2f8] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Technician Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#a21caf] font-semibold">Técnico</p>
                      <p className="text-sm text-gray-800 font-medium">{ticket.nombreTecnico}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fdf2f8] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Calendar Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#a21caf] font-semibold">Solicitado</p>
                      <p className="text-sm text-gray-800 font-medium">{ticket.fechaSolicitud}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fdf2f8] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#a21caf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Assignment Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#a21caf] font-semibold">Asignado</p>
                      <p className="text-sm text-gray-800 font-medium">{ticket.fechaAsignacion}</p>
                    </div>
                  </div>
                </div>

                {/* Diagnostico */}
                <div className="mt-4 p-4 bg-[#fdf2f8] rounded-xl border border-[#f472b6]/20">
                  <p className="text-xs text-[#a21caf] font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Diagnostic Icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Diagnóstico
                  </p>
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{ticket.diagnostico}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EstadoTickets
