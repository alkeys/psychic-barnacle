"use client"

import type React from "react"

import { useEffect, useState, useMemo, useCallback } from "react"
import type { Ticket } from "@/models/entity"
import { TicketApi } from "@/service/ApiClient"

interface FilterState {
  searchTerm: string
  selectedStatus: string
}

const ListarTickets: React.FC = () => {
  // Estado de datos y carga
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Estado de filtros
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    selectedStatus: "TODOS",
  })

  // Lógica de carga de datos
  const fetchTickets = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await TicketApi.listarTickets()
      const normalizedTickets = response.data.map((ticket: Ticket) => ({
        ...ticket,
        nombreTecnico: ticket.nombreTecnico || "No asignado",
      }))
      setTickets(normalizedTickets)
    } catch (err) {
      console.error("Error fetching tickets:", err)
      setError("No se pudieron cargar los tickets. Intente de nuevo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  // Lógica de filtrado
  const filteredTickets = useMemo(() => {
    const lowerCaseSearchTerm = filters.searchTerm.toLowerCase()
    const { selectedStatus } = filters

    return tickets.filter((ticket) => {
      const matchesStatus = selectedStatus === "TODOS" || ticket.nombreEstado === selectedStatus

      if (!matchesStatus) {
        return false
      }

      const idString = ticket.id ? String(ticket.id) : ""
      const cliente = (ticket.nombreCliente ?? "").toLowerCase()
      const tecnico = (ticket.nombreTecnico ?? "").toLowerCase()

      return (
        !lowerCaseSearchTerm ||
        idString.includes(lowerCaseSearchTerm) ||
        cliente.includes(lowerCaseSearchTerm) ||
        tecnico.includes(lowerCaseSearchTerm)
      )
    })
  }, [tickets, filters])

  // Obtener opciones únicas de estado
  const statusOptions = useMemo(() => {
    const statuses = tickets.map((ticket) => ticket.nombreEstado)
    return ["TODOS", ...Array.from(new Set(statuses))]
  }, [tickets])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, selectedStatus: e.target.value }))
  }

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p>Cargando tickets...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>
          <p>{error}</p>
          <button onClick={fetchTickets} style={retryButtonStyle}>
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={emptyStateStyle}>
          <p>No hay tickets registrados en el sistema.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {/* Encabezado */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Tickets</h1>
          <p style={subtitleStyle}>Gestiona y monitorea todos los tickets del sistema</p>
        </div>
      </div>

      {/* Filtros */}
      <div style={filterSectionStyle}>
        {/* Búsqueda */}
        <div style={filterGroupStyle}>
          <label htmlFor="search" style={labelStyle}>
            Búsqueda
          </label>
          <input
            id="search"
            type="text"
            placeholder="Buscar por ID, cliente o técnico..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            style={inputStyle}
          />
        </div>

        {/* Estado */}
        <div style={filterGroupStyle}>
          <label htmlFor="status" style={labelStyle}>
            Estado
          </label>
          <select id="status" value={filters.selectedStatus} onChange={handleStatusChange} style={selectStyle}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Contador de resultados */}
        <div style={resultCountStyle}>
          <span style={countTextStyle}>
            {filteredTickets.length} de {tickets.length}
          </span>
        </div>
      </div>

      {/* Tabla de Tickets */}
      {filteredTickets.length === 0 ? (
        <div style={noResultsStyle}>
          <p>No se encontraron tickets con los filtros aplicados.</p>
        </div>
      ) : (
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeaderRowStyle}>
                <th style={{ ...tableHeaderCellStyle, width: "8%" }}>ID</th>
                <th style={{ ...tableHeaderCellStyle, width: "12%" }}>Estado</th>
                <th style={{ ...tableHeaderCellStyle, width: "15%" }}>Cliente</th>
                <th style={{ ...tableHeaderCellStyle, width: "15%" }}>Servicio</th>
                <th style={{ ...tableHeaderCellStyle, width: "13%" }}>Fecha Solicitud</th>
                <th style={{ ...tableHeaderCellStyle, width: "15%" }}>Técnico</th>
                <th style={{ ...tableHeaderCellStyle, width: "11%" }}>Diagnóstico</th>
                <th style={{ ...tableHeaderCellStyle, width: "11%" }}>Solución</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  style={{
                    ...tableRowStyle,
                    backgroundColor: index % 2 === 0 ? "transparent" : "rgba(0, 0, 0, 0.02)",
                  }}
                >
                  <td style={tableCellStyle}>{ticket.id}</td>
                  <td style={tableCellStyle}>
                    <span
                      style={{
                        ...statusBadgeStyle,
                        backgroundColor: getStatusColor(ticket.nombreEstado || ''),
                      }}
                    >
                      {ticket.nombreEstado}
                    </span>
                  </td>
                  <td style={tableCellStyle}>{ticket.nombreCliente}</td>
                  <td style={tableCellStyle}>{ticket.nombreTipoServicio}</td>
                  <td style={tableCellStyle}>{ticket.fechaSolicitud}</td>
                  <td style={tableCellStyle}>{ticket.nombreTecnico}</td>
                  <td style={tableCellStyle}>{truncateText(ticket.diagnostico, 40)}</td>
                  <td style={tableCellStyle}>{truncateText(ticket.solucion, 40)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  padding: "2rem",
  maxWidth: "1400px",
  margin: "0 auto",
  fontFamily: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  backgroundColor: "#ffffff",
  minHeight: "100vh",
}

const headerStyle: React.CSSProperties = {
  marginBottom: "2rem",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "1.5rem",
}

const titleStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: "700",
  margin: "0 0 0.5rem 0",
  color: "#000000",
  letterSpacing: "-0.5px",
}

const subtitleStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "#6b7280",
  margin: "0",
}

const filterSectionStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  marginBottom: "2rem",
  alignItems: "flex-end",
  flexWrap: "wrap",
}

const filterGroupStyle: React.CSSProperties = {
  flex: "1 1 200px",
  minWidth: "200px",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: "500",
  color: "#374151",
  marginBottom: "0.5rem",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "0.95rem",
  border: "1px solid #d1d5db",
  borderRadius: "0.5rem",
  backgroundColor: "#fafafa",
  transition: "all 0.2s ease",
  outline: "none",
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "0.95rem",
  border: "1px solid #d1d5db",
  borderRadius: "0.5rem",
  backgroundColor: "#fafafa",
  color: "#000000",
  cursor: "pointer",
  transition: "all 0.2s ease",
  outline: "none",
}

const resultCountStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "2.5rem",
}

const countTextStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "#6b7280",
  fontWeight: "500",
}

const tableContainerStyle: React.CSSProperties = {
  overflowX: "auto",
  borderRadius: "0.75rem",
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.9rem",
}

const tableHeaderRowStyle: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  borderBottom: "1px solid #e5e7eb",
}

const tableHeaderCellStyle: React.CSSProperties = {
  padding: "1rem",
  textAlign: "left",
  fontWeight: "600",
  color: "#374151",
  fontSize: "0.85rem",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
}

const tableRowStyle: React.CSSProperties = {
  borderBottom: "1px solid #f0f0f0",
  transition: "background-color 0.15s ease",
}

const tableCellStyle: React.CSSProperties = {
  padding: "0.875rem 1rem",
  color: "#1f2937",
  verticalAlign: "middle",
}

const statusBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "0.375rem 0.75rem",
  borderRadius: "0.375rem",
  fontSize: "0.8rem",
  fontWeight: "600",
  color: "#ffffff",
  textAlign: "center",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
}

const loadingStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  gap: "1rem",
  color: "#6b7280",
}

const spinnerStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  border: "3px solid #e5e7eb",
  borderTop: "3px solid #000000",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
}

const errorStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  gap: "1rem",
  backgroundColor: "#fef2f2",
  borderRadius: "0.75rem",
  border: "1px solid #fecaca",
  color: "#dc2626",
  padding: "2rem",
  textAlign: "center",
}

const retryButtonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#000000",
  color: "#ffffff",
  border: "none",
  borderRadius: "0.5rem",
  fontSize: "0.95rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
}

const noResultsStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "3rem 2rem",
  color: "#9ca3af",
  fontSize: "0.95rem",
  backgroundColor: "#fafafa",
  borderRadius: "0.75rem",
  border: "1px solid #e5e7eb",
}

const emptyStateStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "300px",
  color: "#9ca3af",
  fontSize: "0.95rem",
}

// Función para obtener color según estado
function getStatusColor(status: string): string {
  const statusColors: { [key: string]: string } = {
    ABIERTO: "#0ea5e9", // Azul más oscuro
    "EN PROGRESO": "#f59e0b", // Naranja
    CERRADO: "#059669", // Verde más oscuro
    PENDIENTE: "#7c3aed", // Púrpura
    RESUELTO: "#059669", // Verde
    RECHAZADO: "#dc2626", // Rojo
    ACTIVO: "#0ea5e9", // Azul
    INACTIVO: "#6b7280", // Gris
    "EN ESPERA": "#d97706", // Ámbar
  }
  return statusColors[status?.toUpperCase()] || "#6b7280"
}

// Función de utilidad para truncar texto
const truncateText = (text: string | undefined, limit: number): string => {
  if (!text) return "N/A"
  if (text.length <= limit) return text
  return `${text.substring(0, limit)}...`
}

const style = document.createElement("style")
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

export default ListarTickets