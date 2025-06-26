# AUKAN
Breve descripción de alto nivel sobre el propósito del proyecto.

## Tabla de Contenidos
- [Instalación y Primeros Pasos](#instalación-y-primeros-pasos)
- [Estructura de Directorios](#estructura-de-directorios)
- [Tecnologías y Dependencias Clave](#tecnologías-y-dependencias-clave)
- [Componentes Clave y Flujo de Datos](#componentes-clave-y-flujo-de-datos)
- [Comandos de Desarrollo y Build](#comandos-de-desarrollo-y-build)
- [Despliegue y Docker](#despliegue-y-docker)
- [Documentación Complementaria](#documentación-complementaria)

## Instalación y Primeros Pasos
**Requisitos**  
- Node.js ≥ 18  
- Docker & Docker Compose  

**Clonar repositorio**  
```bash
git clone <repo-url>
cd <repo-folder>
```

**Instalar dependencias**  
```bash
npm install
```

**Configurar variables de entorno**  
- Copiar `.env.example` a `.env` y completar los valores.

**Arrancar en modo desarrollo**  
```bash
npm run dev
```

## Estructura de Directorios
```bash
.
├── docker/
│   ├── nginx/
│   └── scripts/
├── docs/
├── public/
│   ├── assets/
│   └── icons/
├── src/
│   ├── components/
│   ├── constant/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   └── utils/
```
- `public/` – Recursos estáticos  
- `src/` – Código fuente  
- `docker/` – Configuración de despliegue  

## Tecnologías y Dependencias Clave
| Tecnología        | Versión Mínima | Propósito               |
| ----------------- | -------------- | ----------------------- |
| React             | 18.x           | UI y lógica frontend    |
| Django            | 4.x            | API y backend           |
| PostgreSQL        | 13.x           | Base de datos           |
| Docker            | 20.x           | Contenerización         |

## Componentes Clave y Flujo de Datos
- Diagrama de alto nivel:  
  ```ascii
  [Browser] → [React App] → [API (Django)] → [DB (PostgreSQL)]
  ```
- Ejemplo de uso de `Navbar` en `src/components/Navbar.tsx`
- Cómo funcionan `context/` y `hooks/` (ver `docs/context-hooks.md`)

## Comandos de Desarrollo y Build
```bash
npm run build       # Empaqueta la app para producción
docker-compose up   # Levanta servicios en contenedores
```

## Despliegue y Docker
- **Resumen**: Configuración en `docker/`
- **Construir imagen**:  
  ```bash
  docker build -t myapp-frontend -f docker/Dockerfile .
  ```
- **Arrancar servicios**:  
  ```bash
  docker-compose up --build -d
  ```
- Variables de entorno: ver `docs/deployment.md` para detalle completo.

## Documentación Complementaria
- [Arquitectura](docs/architecture.md)  
- [Componentes](docs/components.md)  
- [Páginas](docs/pages.md)  
- [Context & Hooks](docs/context-hooks.md)  
- [Utils](docs/utils.md)  
- [Constants](docs/constants.md)  
- [Deployment](docs/deployment.md)  
