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
| `ContentComponent` | `Content/ContentComponent.jsx` | Contenedor que define ancho máximo y opcionalmente un pie de página. |
| `DataGrid` | `DataGrid/DataGridComponent.jsx` | Tabla con paginación, ordenamiento y filtros básicos. |
| `DropzoneComponent` | `DragAndDrop/DropzoneComponent.jsx` | Área de carga de archivos mediante drag & drop. |
| `Layout` | `Layout/Layout.jsx` | Envoltura general con Topbar y Navbar. |
| `Navbar` | `Navbar/Navbar.jsx` | Menú lateral con enlaces y submenús. |
| `ProfileMenu` | `ProfileMenu/ProfileMenuComponent.jsx` | Menú desplegable con acciones de cuenta. |
| `RouterContainer` | `Router/RouterContainer.jsx` | Declaración principal de rutas de la aplicación. |
| `Topbar` | `Topbar/Topbar.jsx` | Barra superior con logo y perfil de usuario. |

## 2. Props y API de Cada Componente

| Componente | Prop | Tipo | Descripción | Requerido |
|------------|------|------|-------------|-----------|
| `ContentComponent` | `minWidth` | `string` | Ancho mínimo del contenedor. | Opcional |
| | `maxWidth` | `string` | Ancho máximo del contenedor. | Opcional |
| | `showFooter` | `boolean` | Muestra o no el pie de página. | Opcional |
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
| `Layout` | `title` | `string` | Título de la página o sección. | Opcional |
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

<ContentComponent maxWidth="1200px" showFooter={false}>
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

## 5. Enlaces Cruzados

- [Listado de Componentes Reutilizables](#1-listado-de-componentes-reutilizables)
- [Props y API](#2-props-y-api-de-cada-componente)
- [Ejemplos de Uso](#3-ejemplos-de-uso)
- [Variables de Entorno](#4-variables-de-entorno)

