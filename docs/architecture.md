# Arquitectura del Frontend

Este documento describe la estructura general del proyecto React que vive en `src/` y cómo interactúan sus módulos principales.

## Diagrama de Componentes

```text
src/
├─ components/      # Elementos reutilizables (Layout, Navbar, Topbar)
├─ pages/           # Contenedores de las distintas vistas
├─ context/         # Contextos globales
├─ hooks/           # Hooks personalizados
├─ utils/           # Funciones de apoyo
├─ constant/        # Endpoints y constantes
```

### Ejemplo de componente

```javascript
import React, { useState,useContext } from "react";
import { Outlet } from 'react-router-dom';
import NavbarLayout from "../Navbar";
import TopbarLayout from "../Topbar";
import "./LayoutStyles.scss";
import { AppContext } from "context/AppContext.js";


function Layout({title}) {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const [navMenuData, setNavMenuData] = useState([]);
  const { account,setAccount,api } = useContext(AppContext);

  return (
    <main className="swt-layout-main">
      <TopbarLayout
        isNavbarCollapsed={isNavbarCollapsed}
        setIsNavbarCollapsed={setIsNavbarCollapsed}
        account={account}
        api={api}
        setAccount={setAccount}
```

## Flujo de Datos {#flujo-de-datos}

```text
[User Action] → [Component] → [Context/Hook] → [Service Call] → [Response] → [State Update] → [Render]
```

```javascript
function EntranceTableContainer() {
  const { api, account } = useContext(AppContext);
  const [claimSelected, setClaimSelected] = useState(null);
  const [showTypeAssignClaim, setShowTypeAssignClaim] = useState(false);
  const [isReAssignClaim, setIsReAssignClaim] = useState(false)
  const [claims, setClaims] = useState([]);
  const [showMessageConfirmReAssign,setShowMessageConfirmReAssign] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
  const [cantElement,setCantElement] = useState(0)

  useEffect(() => {
    if (account.roles[0].name === "Admin"){
      api(CLAIM+"?page="+currentPage).then(({ ok, body }) => {
        if (ok) {
          setClaims(body.data);
          setCantElement(body.data_size)
      })
    else{
      api(CLAIM+"?search="+account.uuid+"&page="+currentPage).then(({ ok, body }) => {
        if (ok) {
          setClaims(body.data);
          setCantElement(body.data_size)
      })
  }, [currentPage]);

  return (
    <>
      <EntranceTableComponent
        claims={claims}
        setClaimSelected={setClaimSelected}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
        setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
        account={account}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cantElement={cantElement}
        setCantElement={setCantElement}
      />
      <AssignClaimContainer
        claimSelected={claimSelected}
        showTypeAssignClaim={showTypeAssignClaim}
        setShowTypeAssignClaim={setShowTypeAssignClaim}
        showMessageConfirmReAssign={showMessageConfirmReAssign}
        setShowMessageConfirmReAssign={setShowMessageConfirmReAssign}
      />
```

## Dependencias Externas {#dependencias-externas}

Las URL de los servicios se definen en `src/constant/endpoints.js` y son consumidas por el hook `useApi`.

| Variable                        | Descripción                              | Archivo de ejemplo |
| ------------------------------- | ---------------------------------------- | ------------------ |
| `REACT_APP_BACKEND_URL`         | URL base para llamadas al backend        | `src/hooks/useApi.js` |
| `REACT_APP_BACKEND_URL_MEDIA`   | Ruta de archivos multimedia              | `src/components/Topbar/Topbar.jsx` |
| `REACT_APP_IMAGES_PATH`         | Carpeta de imágenes públicas             | `README.md` |

## Snippet de llamada a la API

```javascript
  const api = useCallback(
    (url, config = {}) => {
      return axiosInstance({
        method: config.method,
        url,
        data: config.body,
        ...config,
      })
        .then((response) => {
          setIsLoading(false);
          // if(config.method){
          //   alert({
          //     type: "success",
          //     title: response.data.messages[0].title,
          //     detail: response.data.messages[0].description,
          //     life: 4000  
          //   }) 
          // }
          return { ok: true, body: response.data };
        })
        .catch((error) => {
          setIsLoading(false);
          if(error.status !== 401) {
          if(error.status !== 401) {
            alert({
              type: "error",
              title: "Upss!",
              detail: "Algo no salió como esperabamos, por favor intentá nuevamente.",
              life: 4000  
            })  
          if (jwtAxios.isCancel(error)) {
            // Manejar cancelaciones si es necesario
          } else if (error.response) { 
            if(config.method && error.response.data.messages) {
              // alert({
              //   type: "error",
              //   title: "Upss!",
              //   life: 5000  
              // })    
            onError(error.response.data);
          } else if (error.request) {
            onError('No se recibió respuesta del servidor');
          } else {
            onError('Error durante la configuración de la solicitud');
```

Consulta también el [Flujo de Datos](#flujo-de-datos) para entender cómo se transmiten estas props.

### Notas adicionales

- Las variables de entorno se definen en archivos `.env.development`, `.env.staging` y `.env.production` según el entorno, como se detalla en [Constantes](constants.md).
- Los hooks personalizados documentados en [Contextos y Hooks](context-hooks.md) manejan alertas (`useAlert`), peticiones (`useApi`) y formularios (`useForm`).
- Las utilidades siguen principios de **pure functions**, inmutabilidad y testabilidad, descritos en [Utilidades](utils.md).
- El proceso de despliegue utiliza *multistage builds* de Docker y puede incluir healthchecks opcionales; consulta [Despliegue](deployment.md) para más detalles.

## Enlaces Cruzados
- [Componentes](components.md)
- [Constantes](constants.md)
- [Contextos y Hooks](context-hooks.md)
- [Despliegue](deployment.md)
- [Páginas](pages.md)
- [Utilidades](utils.md)
