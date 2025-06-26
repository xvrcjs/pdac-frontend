# Componentes Reutilizables

Esta guía presenta los componentes ubicados en `src/components/` y describe sus props principales y ejemplos de uso. Consulta también la [Arquitectura](architecture.md) general del proyecto.

## 1. Listado de Componentes Reutilizables

```text
src/components/
├── Content/
│   ├── ContentComponent.jsx
│   └── index.js
├── DataGrid/
│   ├── DataGridComponent.jsx
│   └── index.js
├── DragAndDrop/
│   └── DropzoneComponent.jsx
├── Layout/
│   ├── Layout.jsx
│   └── index.js
├── Navbar/
│   ├── Navbar.jsx
│   ├── MenuData.ts
│   ├── MenuDataNav.ts
│   └── index.js
├── ProfileMenu/
│   ├── ProfileMenuComponent.jsx
│   ├── ProfileMenuContainer.js
│   └── index.js
├── Router/
│   ├── RouterContainer.jsx
│   ├── PrivateRoute.jsx
│   ├── PublicRoute.jsx
│   └── index.js
└── Topbar/
    ├── Topbar.jsx
    └── index.js
```

| Componente | Ruta | Propósito breve |
|------------|------|-----------------|
| `ContentComponent` | `Content/ContentComponent.jsx` | Contenedor con ancho máximo configurable que guarda el modo de tema en una cookie. |
| `DataGrid` | `DataGrid/DataGridComponent.jsx` | Tabla con paginación, ordenamiento y filtros básicos. |
| `DropzoneComponent` | `DragAndDrop/DropzoneComponent.jsx` | Área de carga de archivos mediante drag & drop. |
| `Layout` | `Layout/Layout.jsx` | Envoltura general con Topbar y Navbar. |
| `Navbar` | `Navbar/Navbar.jsx` | Menú lateral con enlaces y submenús. |
| `ProfileMenu` | `ProfileMenu/ProfileMenuComponent.jsx` | Menú desplegable con acciones de cuenta. |
| `RouterContainer` | `Router/RouterContainer.jsx` | Declaración principal de rutas de la aplicación. |
| `Topbar` | `Topbar/Topbar.jsx` | Barra superior con logo y perfil de usuario. |

### Detalles adicionales de implementación

- **ContentComponent**: guarda en una cookie llamada `theme` el modo de la interfaz cada vez que cambia la paleta.
- **DataGrid**: permite ordenar, paginar y expandir filas con un filtro opcional por estado usando círculos de colores.
- **DropzoneComponent**: solo acepta archivos JPEG/JPG/PNG de hasta 5MB.
- **Layout**: utiliza `AppContext` para obtener cuenta y servicios de API, y muestra un pie con `footer.png`.
- **Layout**: renderiza el contenido de cada página mediante `<Outlet />` de React Router.
- **Navbar**: filtra las opciones según el rol y consulta `CANT_CLAIM_HV_IVE` para mostrar reclamos HV.
- **Navbar**: también actualiza el título y subtítulo de la cabecera en función de la ruta actual.
- **ProfileMenuComponent**: la lógica de cierre y cierre de sesión se maneja en `ProfileMenuContainer`.
- **ProfileMenuContainer**: al cerrar sesión llama a `LOGOUT_ENDPOINT`, elimina la cookie `token` y redirige al inicio.
- **RouterContainer**: organiza rutas privadas y públicas. `PrivateRoute` envuelve el contenido con `<Layout>`, guarda la última URL visitada y, si no hay cuenta, redirige al inicio. `PublicRoute` envía al usuario autenticado a `/inicio` o a `/reg-updater/activity-logs` según permisos.
- **Topbar**: enlaza con la Biblioteca y utiliza `REACT_APP_BACKEND_URL_MEDIA` para cargar la imagen de perfil.


## 2. Props y API de Cada Componente

| Componente | Prop | Tipo | Descripción | Requerido |
|------------|------|------|-------------|-----------|
| `ContentComponent` | `minWidth` | `string` | Ancho mínimo del contenedor. | Opcional |
| | `maxWidth` | `string` | Ancho máximo del contenedor. | Opcional |
| | `className` | `string` | Clases CSS adicionales. | Opcional |
| `DataGrid` | `columns` | `Array` | Definición de columnas. | Sí |
| | `rows` | `Array` | Datos a mostrar. | Sí |
| | `pageSize` | `number` | Tamaño de página. | Opcional |
| | `handleEdit` | `Function` | Callback para editar una fila. | Opcional |
| | `hasFilter` | `boolean` | Activa filtro de estado. | Opcional |
| | `noDataMessage` | `string` | Mensaje cuando no hay datos. | Opcional |
| | `backgroundColor` | `string` | Color de fondo de la tabla. | Opcional |
| `DropzoneComponent` | `setFiles` | `(files) => void` | Función para guardar los archivos seleccionados. | Sí |
| | `setIsDragActive` | `(flag) => void` | Indica si se está arrastrando un archivo. | Sí |
| `Navbar` | `api` | `Function` | Función para llamadas a la API. | Sí |
| | `navMenuData` | `Array` | Datos de navegación actuales. | Sí |
| | `setNavMenuData` | `(data) => void` | Actualiza las opciones de menú. | Sí |
| | `isNavbarCollapsed` | `boolean` | Estado de barra lateral. | Sí |
| | `setIsNavbarCollapsed` | `(flag) => void` | Cambia el colapso de la barra lateral. | Sí |
| `ProfileMenuComponent` | `isMenuOpen` | `boolean` | Controla la apertura del menú. | Sí |
| | `handleCloseMenu` | `() => void` | Cierra el menú. | Sí |
| | `signout` | `() => void` | Acción de cerrar sesión. | Sí |
| | `account` | `object` | Información del usuario. | Sí |
| | `navigate` | `Function` | Navegación de React Router. | Sí |
| | `permissions` | `object` | Permisos disponibles. | Opcional |
| `Topbar` | `isNavbarCollapsed` | `boolean` | Indica si la barra lateral está colapsada. | Sí |
| | `account` | `object` | Usuario activo. | Sí |
| | `setAccount` | `(data) => void` | Actualiza los datos de usuario. | Sí |
| | `api` | `Function` | Llamador de servicios HTTP. | Sí |

## 3. Ejemplos de Uso

```jsx
import ContentComponent from 'components/Content';

<ContentComponent maxWidth="1200px">
  {children}
</ContentComponent>
```

```jsx
import DataGrid from 'components/DataGrid';

<DataGrid columns={columns} rows={rows} pageSize={10} handleEdit={onEdit} />
```

```jsx
import Dropzone from 'components/DragAndDrop/DropzoneComponent';

<Dropzone setFiles={setFiles} setIsDragActive={setDragActive} />
```

```jsx
import Navbar from 'components/Navbar';

<Navbar api={api} navMenuData={menu} setNavMenuData={setMenu} isNavbarCollapsed={collapsed} setIsNavbarCollapsed={setCollapsed} />
```

```jsx
import Topbar from 'components/Topbar';

<Topbar isNavbarCollapsed={collapsed} account={account} setAccount={setAccount} api={api} />
```

## 4. Variables de Entorno

| Variable | Descripción | Archivo de configuración |
|----------|-------------|-------------------------|
| `REACT_APP_BACKEND_URL_MEDIA` | URL para cargar imágenes de usuario. | `src/components/Topbar/Topbar.jsx` |
## Enlaces Cruzados
- [Arquitectura](architecture.md)
- [Constantes](constants.md)
- [Contextos y Hooks](context-hooks.md)
- [Despliegue](deployment.md)
- [Páginas](pages.md)
- [Utilidades](utils.md)
