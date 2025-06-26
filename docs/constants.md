# Constantes y Endpoints

Este documento recopila las constantes definidas en `src/constant/`. Son utilizadas para construir las URLs de la API y otras configuraciones globales.

## 1. Listado de Constantes y Endpoints

```text
src/constant/
└── endpoints.js
```

## 2. Definición y Uso de Cada Constante

A continuación se detallan las constantes incluidas en `endpoints.js`:

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| `LOGOUT_ENDPOINT` | `/v1/logout/` | Cierra la sesión del usuario actual. |
| `SINGIN_ENDPOINT` | `/v1/login/` | Autenticación de usuarios. |
| `SINGUP_ENDPOINT` | `/v1/register/` | Registro de nuevos usuarios. |
| `FORGOT_PASSWORD_ENDPOINT` | `/v1/forgot-password/` | Solicitud de restablecimiento de contraseña. |
| `CREATE_PASSWORD_ENDPOINT` | `/v1/create-password/` | Creación de la contraseña inicial. |
| `GET_PROFILE_ENDPOINT` | `/v1/profile` | Obtiene el perfil del usuario. |
| `GET_PERMISSIONS` | `/v1/permissions` | Lista los permisos disponibles. |
| `CREATE_USER` | `/v1/account` | Alta de un usuario desde la administración. |
| `GET_USERS` | `/v1/account` | Listado de usuarios. |
| `GET_USERS_SUPPORT` | `/v1/supports` | Usuarios que brindan soporte. |
| `CLAIM` | `/v1/claim` | Endpoints principales de reclamos. |
| `CLAIM_IVE` | `/v1/claim-ive` | Reclamos en formato IVE. |
| `CREATE_CLAIM` | `/v1/create_claim` | Alta de un reclamo estándar. |
| `CREATE_CLAIM_IVE` | `/v1/create-claim-ive` | Alta de un reclamo IVE. |
| `DOWNLOAD_CLAIM` | `/v1/download_claim` | Descarga un archivo PDF del reclamo. |
| `DOWNLOAD_ZIP` | `/v1/zip_files_claim` | Descarga múltiples archivos en ZIP. |
| `COMMENT` | `/v1/comment` | Comentarios de reclamos. |
| `COMMENT_IVE` | `/v1/comment-ive` | Comentarios de reclamos IVE. |
| `ASSIGN_CLAIM` | `/v1/assign_claim` | Asigna un reclamo a un operador. |
| `ASSIGN_CLAIM_IVE` | `/v1/assign-claim-ive` | Asigna un reclamo IVE. |
| `CANT_CLAIM_HV_IVE` | `/v1/cant-claim-hv` | Cantidad de reclamos HV IVE. |
| `CLAIM_REJECTED` | `/v1/claim-rejected` | Marca un reclamo como rechazado. |
| `VALIDATE_RECAPTCHA` | `/v1/validate-recaptcha` | Verificación de Google reCAPTCHA. |
| `GET_TRAFIC_LIGHT_CONFIG` | `/v1/traffic-light-system-config` | Configura los tiempos del semáforo de tickets. |
| `OMICS` | `/v1/omic` | Información de organismos OMIC. |
| `CREATE_STANDARDS_PROTOCOLS` | `v1/standards-and-protocols` | Ruta para subir protocolos y estándares. |
| `GET_ZIP_STANDARDS_PROTOCOLS` | `v1/standards-and-protocols/zip` | Descarga un paquete ZIP con los estándares. |
| `TICKET` | `v1/ticket` | Administración de tickets de soporte. |
| `ASSIGN_TICKET` | `v1/ticket/assign` | Asignación de tickets a operadores. |
| `COMMENT_TICKET` | `v1/ticket/comment` | Comentarios dentro de un ticket. |
| `ADD_INFO_ADITIONAL_TICKET` | `v1/ticket/aditional-info` | Agrega información adicional a un ticket. |

Ejemplo de uso:

```ts
import { LOGOUT_ENDPOINT } from 'src/constant/endpoints';

api(LOGOUT_ENDPOINT, { method: 'POST' });
```

## 3. Extensión y Modificación por Entorno

Este proyecto utiliza variables de entorno para cambiar la URL base y otros valores según el entorno. Puedes crear archivos `.env.development`, `.env.staging` y `.env.production` con las mismas claves pero diferentes valores.

| Archivo de entorno | Variable | Valor de ejemplo |
|--------------------|----------|------------------|
| `.env.development` | `REACT_APP_API_URL` | `http://localhost:8000/api` |
| `.env.staging` | `REACT_APP_API_URL` | `https://staging.api.sowtic.com` |
| `.env.production` | `REACT_APP_API_URL` | `https://api.sowtic.com` |

El código lee automáticamente la variable adecuada al ejecutar la app:

```ts
const baseUrl = process.env.REACT_APP_API_URL;
```

## 4. Enlaces Cruzados

- [Componentes](components.md)
- [Páginas](pages.md)
- [Contextos y Hooks](context-hooks.md)
- [Arquitectura](architecture.md)
- [Utilidades](utils.md)

