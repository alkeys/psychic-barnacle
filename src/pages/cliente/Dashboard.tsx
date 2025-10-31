"use client"

import { useState, useEffect } from "react"
import type { Ticket } from "../../models/entity"
import { TicketApi } from "../../service/ApiClient"
import { useAuth } from "@/context/AuthContext"

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      setTickets([])
      setLoading(false)
      return
    }

    const fetchTickets = async () => {
      try {
        const response = await TicketApi.listarTickets()
        const clienteTickets = response.data.filter((ticket) => ticket.idCliente === currentUser.idCliente)
        setTickets(clienteTickets)
      } catch (error) {
        console.error("Error al cargar los tickets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [currentUser])

  const totalTickets = tickets.length
  const abiertos = tickets.filter((t) => t.nombreEstado === "Abierto").length
  const enProceso = tickets.filter((t) => t.nombreEstado === "En proceso").length
  const pendientes = tickets.filter((t) => t.nombreEstado === "Pendiente de Cliente").length
  const cerrados = tickets.filter((t) => t.nombreEstado === "Cerrado" || t.nombreEstado === "Resuelto").length

  const tasaResolucion = totalTickets > 0 ? Math.round((cerrados / totalTickets) * 100) : 0
  const ticketsActivos = abiertos + enProceso + pendientes

  const LoadingDots = () => (
    <span className="inline-flex gap-1">
      <span className="w-2 h-2 bg-current rounded-full animate-[pulse_1.4s_ease-in-out_infinite]" />
      <span className="w-2 h-2 bg-current rounded-full animate-[pulse_1.4s_ease-in-out_0.2s_infinite]" />
      <span className="w-2 h-2 bg-current rounded-full animate-[pulse_1.4s_ease-in-out_0.4s_infinite]" />
    </span>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fbcfe8] to-[#f472b6] p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#be185d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#a21caf] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#f472b6]/20 mb-6 animate-[fadeIn_0.6s_ease-out]">
          <p className="text-[#a21caf] text-center text-lg">
            Aquí puedes ver el estado de tus tickets de soporte en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Tickets */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-[#f472b6]/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-[fadeIn_0.6s_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#be185d] to-[#a21caf] flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Total Icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-[#a21caf] mb-2">Total de Tickets</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
              {loading ? <LoadingDots /> : totalTickets}
            </p>
            <p className="text-sm text-gray-600 mt-2">Tickets registrados en total</p>
          </div>

          {/* Abiertos */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-emerald-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-[fadeIn_0.6s_ease-out_0.1s_both]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Open Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-emerald-600 mb-2">Abiertos</p>
            <p className="text-5xl font-bold text-emerald-600">{loading ? <LoadingDots /> : abiertos}</p>
            <p className="text-sm text-gray-600 mt-2">Tickets recién creados</p>
          </div>

          {/* En Proceso */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-blue-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-[fadeIn_0.6s_ease-out_0.2s_both]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>In Progress Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-blue-600 mb-2">En Proceso</p>
            <p className="text-5xl font-bold text-blue-600">{loading ? <LoadingDots /> : enProceso}</p>
            <p className="text-sm text-gray-600 mt-2">Siendo atendidos ahora</p>
          </div>

          {/* Pendientes */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-amber-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-[fadeIn_0.6s_ease-out_0.3s_both]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Pending Icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-amber-600 mb-2">Pendiente de Cliente</p>
            <p className="text-5xl font-bold text-amber-600">{loading ? <LoadingDots /> : pendientes}</p>
            <p className="text-sm text-gray-600 mt-2">En espera de atención</p>
          </div>

          {/* Cerrados */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-green-200 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-[fadeIn_0.6s_ease-out_0.4s_both]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Closed Icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-green-600 mb-2">Cerrados</p>
            <p className="text-5xl font-bold text-green-600">{loading ? <LoadingDots /> : cerrados}</p>
            <p className="text-sm text-gray-600 mt-2">Tickets resueltos</p>
          </div>

          {/* Tasa de Resolución */}
          <div className="bg-gradient-to-br from-[#fdf2f8] to-[#fbcfe8] backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-[#f472b6]/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-[fadeIn_0.6s_ease-out_0.5s_both]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Performance Icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm font-semibold text-purple-600 mb-2">Tasa de Resolución</p>
            <p className="text-5xl font-bold text-purple-600">{loading ? <LoadingDots /> : `${tasaResolucion}%`}</p>
            <p className="text-sm text-gray-600 mt-2">
              {ticketsActivos} ticket{ticketsActivos !== 1 ? "s" : ""} activo{ticketsActivos !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#f472b6]/20 animate-[fadeIn_0.6s_ease-out_0.6s_both]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#be185d] to-[#a21caf] flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Analytics Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#be185d] to-[#a21caf] bg-clip-text text-transparent">
                Análisis de Rendimiento
              </h2>
              <p className="text-[#a21caf] text-sm">Resumen inteligente de tus tickets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estado General */}
            <div className="p-6 bg-gradient-to-br from-[#fdf2f8] to-[#fbcfe8] rounded-2xl border border-[#f472b6]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#be185d] text-lg">Estado General</h3>
                <span className="text-4xl">
                  {loading ? "⏳" : tasaResolucion >= 70 ? "🎉" : tasaResolucion >= 50 ? "👍" : "📋"}
                </span>
              </div>
              <p className="text-gray-700 font-medium">
                {loading ? (
                  <span className="flex items-center gap-2">
                    Analizando <LoadingDots />
                  </span>
                ) : tasaResolucion >= 70 ? (
                  "¡Excelente! La mayoría de tus tickets están resueltos"
                ) : tasaResolucion >= 50 ? (
                  "Buen progreso en la resolución de tickets"
                ) : totalTickets === 0 ? (
                  "No tienes tickets registrados aún"
                ) : (
                  "Hay varios tickets pendientes de resolver"
                )}
              </p>
            </div>

            {/* Distribución */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <h3 className="font-semibold text-blue-700 text-lg mb-4">Distribución de Tickets</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">Activos</span>
                  <span className="text-xl font-bold text-blue-600">{loading ? <LoadingDots /> : ticketsActivos}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">Resueltos</span>
                  <span className="text-xl font-bold text-green-600">{loading ? <LoadingDots /> : cerrados}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                    style={{ width: loading ? "0%" : `${tasaResolucion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
