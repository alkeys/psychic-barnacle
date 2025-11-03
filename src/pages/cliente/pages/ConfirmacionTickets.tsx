"use client"

import type React from "react"

import { useState, useEffect, useMemo, useCallback } from "react"
import type { TicketNew } from "../../../models/entity"
import { TicketApi } from "../../../service/ApiClient"
import { useAuth } from "@/context/AuthContext"

/**
 * Componente para que el cliente confirme tickets pendientes.
 *
 * Muestra una lista de tickets con estado "Pendiente de Cliente"
 * y permite al cliente "confirmarlos" (lo que idealmente los
 * devolvería al estado "En proceso" o "Abierto").
 */
const ConfirmacionTickets: React.FC = () => {
  const { currentUser } = useAuth()

  // --- Estados ---
  const [allUserTickets, setAllUserTickets] = useState<TicketNew[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // --- Carga de Datos ---
  const fetchTickets = useCallback(async () => {
    if (!currentUser) {
      setAllUserTickets([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await TicketApi.listarTickets()
      const clienteTickets = response.data.filter((ticket) => ticket.idCliente === currentUser.idCliente)
      setAllUserTickets(clienteTickets)
    } catch (error) {
      console.error("Error fetching tickets:", error)
      setError("No se pudieron cargar los tickets.")
    } finally {
      setIsLoading(false)
    }
  }, [currentUser])

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  // --- Lógica de Filtro (Memoizada) ---
  const ticketsParaConfirmar = useMemo(() => {
    return allUserTickets.filter((ticket) => ticket.nombreEstado === "Pendiente de Cliente")
  }, [allUserTickets])

  // --- Manejadores de Eventos ---
  const handleConfirm = async (ticket: TicketNew) => {
    console.log(`Confirmando ticket ${ticket.id}...`)

    try {
      console.log("ticketId a confirmar:", ticket)
      ticket.idEstado = 3
      ticket.fechaCierre = new Date().toISOString().split("T")[0]

      await TicketApi.actualizarTicket(ticket.id || 0, ticket)
      alert(`Ticket ${ticket.id} confirmado con éxito.`)

      await fetchTickets()
    } catch (err) {
      console.error("Error al confirmar el ticket:", err)
      alert("Hubo un error al confirmar el ticket.")
    }
  }

  // --- Renderizado ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tickets...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-tight mb-2">Confirmación de Tickets</h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Hola, <span className="font-medium text-gray-900">{currentUser?.nombre_completo}</span>. Aquí están los
            tickets que requieren tu atención.
          </p>
        </div>

        {/* Empty State */}
        {ticketsParaConfirmar.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4 text-4xl text-gray-300">✓</div>
            <p className="text-gray-600 text-lg">No hay tickets pendientes de confirmación</p>
            <p className="text-gray-500 text-sm mt-2">Todos tus tickets han sido procesados</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ticketsParaConfirmar.map((t) => (
              <div
                key={t.id}
                className="group border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow duration-200"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Ticket #{t.id}</h3>
                    <p className="text-xs text-gray-500 mt-1">{t.nombreEstado}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {t.nombreEstado}
                  </span>
                </div>

                {/* Card Content */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-gray-600">Técnico</span>
                    <span className="text-sm font-medium text-gray-900">{t.nombreTecnico || "No asignado"}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-gray-600">Diagnóstico</span>
                    <span className="text-sm font-medium text-gray-900">{t.diagnostico || "Pendiente"}</span>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={() => handleConfirm(t || 0)}
                  className="w-full bg-black text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:bg-gray-900 transition-colors duration-200"
                >
                  Confirmar Servicio
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default ConfirmacionTickets