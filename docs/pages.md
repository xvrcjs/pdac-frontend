# Rutas y Páginas

Esta guía resume las rutas definidas en `src/components/Router/RouterContainer.jsx` y describe brevemente la funcionalidad de cada pantalla. Consulta también la [Arquitectura](architecture.md) general y el [Listado de Componentes](components.md) para más detalles.

## 1. Descripción de Cada Ruta/Pantalla

| Ruta URL | Pantalla | Descripción |
|---------|---------|-------------|
|`/inicio`|`HomePage`|Página principal del sistema, muestra un dashboard de bienvenida.|
|`/perfil`|`ProfilePage`|Gestión y edición de datos del usuario.|
|`/gestion-de-usuarios/crear-usuario`|`NewUserPage`|Formulario para registrar nuevos usuarios.|
|`/gestion-de-usuarios/listado-de-usuarios`|`ListUserPage`|Listado general de usuarios registrados.|
|`/gestion-de-usuarios/editar-usuario/:id`|`EditUserPage`|Edición de información de un usuario existente.|
|`/mesa-de-entrada`|`EntranceTablePage`|Bandeja de reclamos recibidos.|
|`/mesa-de-entrada/reclamo/:id`|`ClaimViewPage`|Detalle y gestión de un reclamo puntual.|
|`/reclamos-hv/reclamo-ive/:id`|`ClaimIVEViewPage`|Visualización de reclamo HV en formato IVE.|
|`/archivados`|`ArchivedPage`|Reclamos finalizados y archivados.|
|`/reclamos-hv`|`ClaimHVPage`|Panel para seguimiento de reclamos HV.|
|`/configuracion/sistema-de-semaforos`|`TrafficLightSystemTimesPage`|Configuración de los tiempos del semáforo de tickets.|
|`/configuracion/datos-organismos`|`DataOrganismsPage`|Administración de los organismos disponibles.|
|`/estandares-y-protocolos`|`StandardsProtocolsPage`|Descarga y gestión de protocolos y estándares.|
|`/tickets`|`TicketsPage`|Listado de tickets de soporte.|
|`/tickets/:id`|`TicketsViewPage`|Detalle y acciones sobre un ticket específico.|
|`/reportes/`|`ReportsViewPage`|Generación de reportes y estadísticas.|
|`/`|`WelcomePage`|Pantalla de bienvenida pública.|
|`/login`|`LoginPage`|Inicio de sesión para los usuarios.|
|`/forgot-password`|`ForgotPassword`|Formulario de recuperación de contraseña.|
|`/create-password`|`CreatePassword`|Creación de contraseña tras invitación.|
|`/genera-tu-reclamo`|`ClaimsHomePage`|Inicio del proceso de reclamo ciudadano.|
|`/genera-tu-reclamo/formulario-comun`|`ClaimFormPage`|Formulario general de reclamo.|
|`/genera-tu-reclamo/formulario-ive`|`ClaimIVEFormPage`|Formulario IVE para reclamos.|

## 2. Ejemplos de Navegación

```jsx
import { Link } from 'react-router-dom';

// Navegar a recuperar contraseña
<Link to="/forgot-password">¿Olvido su contraseña?</Link>
```

Uso de hooks de router:

```jsx
import { useNavigate, useParams } from 'react-router-dom';

function ViewTicketContainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  // ...
```

## 3. Data Fetching

Ejemplo de obtención de datos en la mesa de entrada:

```jsx
useEffect(() => {
  api(CLAIM + '?page=' + currentPage).then(({ ok, body }) => {
    if (ok) {
      setClaims(body.data);
  });
}, [currentPage]);
```

Creación de ticket:

```jsx
const handleOnSubmit = (values) => {
  const formData = new FormData();
  formData.append('claim', claim.id);
  api(TICKET, { method: 'POST', body: formData, headers: { 'Content-Type': 'multipart/form-data' } });
};
```

## 4. Pseudodiagramas ASCII

```text
[Usuario] → [Click Link] → [Router] → [Página] → [useEffect/Query] → [API] → [Render]
```

## 5. Variables de Entorno y Props

| Variable | Descripción | Uso en página |
|----------|-------------|---------------|
|`REACT_APP_BACKEND_URL_MEDIA`|Ruta base para archivos e imágenes.|`Profile`, `ViewTicket`, `StandardsProtocols`|
|`REACT_APP_BACKEND_URL`|URL para llamadas al backend.|`StandardsProtocols` y otras peticiones `api()`|

Si alguna página exporta props particulares, se indican a continuación:

| Página | Prop | Tipo | Descripción |
|--------|------|------|-------------|
|`ProfilePage`|`signout`|`Function`|Callback para cerrar sesión.|
|`TicketsViewPage`|`ticket`|`Object`|Datos del ticket cargados desde la API.|
## Enlaces Cruzados
- [Arquitectura](architecture.md)
- [Componentes](components.md)
- [Constantes](constants.md)
- [Contextos y Hooks](context-hooks.md)
- [Despliegue](deployment.md)
- [Utilidades](utils.md)
