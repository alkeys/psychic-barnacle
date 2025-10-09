# Sistema de Gestión de Tickets - Innova Tech

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

## Introducción

Bienvenido al frontend del Sistema de Gestión de Tickets de Innova Tech. Esta aplicación, construida con React y Vite, proporciona una interfaz de usuario intuitiva y eficiente para la administración de soporte técnico, permitiendo a clientes, técnicos y administradores interactuar con el sistema de manera fluida.

## Características Principales

- **Gestión de Tickets:** Creación, asignación, actualización y seguimiento de tickets de soporte.
- **Administración de Entidades:** CRUD completo para Clientes, Técnicos, Servicios y Estados de tickets.
- **Autenticación Basada en Roles:** Acceso seguro y diferenciado para administradores, técnicos y clientes mediante JWT.
- **Diseño Moderno:** Interfaz de usuario limpia y responsiva construida con **shadcn/ui** y **Tailwind CSS**.
- **Comunicación Eficiente con API:** Integración robusta con el backend de Innova Tech a través de un cliente API basado en Axios.

## Stack Tecnológico

- **Framework Principal:** [React](https://reactjs.org/)
- **Entorno de Desarrollo:** [Vite](https://vitejs.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Gestor de Paquetes:** [pnpm](https://pnpm.io/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)

---

## Primeros Pasos

Sigue estas instrucciones para obtener una copia local del proyecto y ponerla en funcionamiento para desarrollo y pruebas.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- [pnpm](https://pnpm.io/installation) (puedes instalarlo con `npm install -g pnpm`)

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    Utiliza `pnpm` para instalar todos los paquetes necesarios del proyecto.
    ```bash
    pnpm install
    ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

-   `pnpm run dev`
    Inicia la aplicación en modo de desarrollo. Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la consola) para verla en tu navegador. La página se recargará automáticamente si realizas cambios en el código.

-   `pnpm run build`
    Compila la aplicación para producción en la carpeta `dist`. Este comando empaqueta React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

-   `pnpm run preview`
    Ejecuta un servidor local para previsualizar la compilación de producción generada en la carpeta `dist`.

-   `pnpm run test`
    *Nota: Este comando es un marcador de posición. Configura tu framework de pruebas (ej. Vitest, Jest) para ejecutar las pruebas unitarias y de integración.*

## Añadir Componentes UI

Este proyecto utiliza **shadcn/ui**. Para añadir nuevos componentes reutilizables de su biblioteca, utiliza el siguiente comando de la CLI:

```bash
npx shadcn-vue@latest add [nombre-del-componente]
```
Ejemplos: `button`, `card`, `input`.

## Estructura del Proyecto

```
/
├── public/         # Archivos estáticos públicos
├── src/
│   ├── assets/       # Imágenes y otros recursos
│   ├── components/   # Componentes UI reutilizables (shadcn/ui)
│   ├── context/      # Contextos de React (ej. AuthContext)
│   ├── lib/          # Funciones de utilidad (ej. utils.ts)
│   ├── models/       # Definiciones de tipos y interfaces (ej. entity.ts)
│   ├── pages/        # Componentes de página (vistas principales)
│   ├── service/      # Lógica de comunicación con la API (ApiClient.ts)
│   ├── App.tsx       # Componente raíz de la aplicación
│   └── main.tsx      # Punto de entrada de la aplicación
├── index.html        # Plantilla HTML principal
├── package.json      # Dependencias y scripts del proyecto
├── tsconfig.json     # Configuración de TypeScript
└── vite.config.ts    # Configuración de Vite
```

## Contribuciones

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada**.

1.  Haz un Fork del Proyecto.
2.  Crea tu Rama de Característica (`git checkout -b feature/AmazingFeature`).
3.  Confirma tus Cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Empuja a la Rama (`git push origin feature/AmazingFeature`).
5.  Abre una Pull Request.

---

