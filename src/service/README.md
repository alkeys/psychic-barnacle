# Instrucciones para el uso del servicio REST

Este archivo describe cómo interactuar con la API REST utilizando Axios y los métodos definidos para cada entidad del sistema.

## Configuración

La conexión se realiza a través de la URL base:
```
Mediante la api
```
Se utiliza Axios para manejar las solicitudes HTTP con el header `Content-Type: application/json`.

## Estructura de los servicios

Cada entidad tiene un conjunto de métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar):

- **Listar**: Obtener todos los registros.
- **Listar por rango**: Obtener registros en un rango específico (cuando aplica).
- **Obtener por ID**: Obtener un registro específico.
- **Crear**: Agregar un nuevo registro.
- **Actualizar**: Modificar un registro existente.
- **Eliminar**: Borrar un registro.

## Ejemplo de uso

```ts
import { tecnicoApi } from "./service";

// Listar técnicos
tecnicoApi.listarTecnicos().then(response => {
    console.log(response.data);
});

// Crear un técnico
tecnicoApi.crearTecnico({ /* datos del técnico */ }).then(response => {
    console.log(response.data);
});
```

## Métodos disponibles

### Técnicos (`tecnicoApi`)
- `listarTecnicos()`
- `listarTecnicosRango(desde, hasta)`
- `obtenerTecnico(id)`
- `crearTecnico(data)`
- `actualizarTecnico(id, data)`
- `eliminarTecnico(id)`

### Clientes (`ClienteApi`)
- `listarClientes()`
- `listarClientesRango(desde, hasta)`
- `obtenerCliente(id)`
- `crearCliente(data)`
- `actualizarCliente(id, data)`
- `eliminarCliente(id)`

### Estados de Ticket (`EstadoTicketApi`)
- `listarEstados()`
- `obtenerEstado(id)`
- `crearEstado(data)`
- `actualizarEstado(id, data)`
- `eliminarEstado(id)`

### Tipos de Servicio (`TipoServicioApi`)
- `listarTipos()`
- `obtenerTipo(id)`
- `crearTipo(data)`
- `actualizarTipo(id, data)`
- `eliminarTipo(id)`

### Tickets (`TicketApi`)
- `listarTickets()`
- `obtenerTicket(id)`
- `crearTicket(data)`
- `actualizarTicket(id, data)`
- `eliminarTicket(id)`

### Usuarios (`UsuarioApi`)
- `listarUsuarios()`
- `obtenerUsuario(id)`
- `crearUsuario(data)`
- `actualizarUsuario(id, data)`
- `eliminarUsuario(id)`
- `login({ nombreUsuario, contrasena })`

## Notas

- Todos los métodos retornan una promesa (`Promise`) con la respuesta de la API.
- Asegúrate de manejar los errores usando `.catch()` o `try/catch` con `async/await`.
