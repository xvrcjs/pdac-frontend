# Despliegue

Este documento describe el proceso recomendado para desplegar la aplicación de frontend utilizando Docker y Docker Compose.

## 1. Paso a Paso de Despliegue

### 1. Construcción de la imagen Docker

```bash
docker build -t sowtic-frontend -f docker/Dockerfile .
```

### 2. Configuración de `docker-compose.yml`

Defina un archivo `docker-compose.yml` que incluya los servicios de **frontend**, **backend** y **nginx**. Ejemplo para Nginx:

```yaml
nginx:
  image: nginx:latest
  volumes:
    - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf
    - ./build:/usr/share/nginx/html
  ports:
    - "80:80"
  depends_on:
    - frontend
```

### 3. Arranque con Docker Compose

```bash
docker-compose up --build -d
```

### 4. Verificación

Acceda a `http://<HOST>/` y verifique los logs:

```bash
docker-compose logs nginx
```

## 2. Configuración Avanzada

### Nginx

Puede habilitar caché, compresión gzip y encabezados de seguridad en el archivo `nginx.conf`:

```nginx
http {
  gzip on;
  add_header X-Frame-Options "DENY";
  ...
}
```

### Healthchecks en `docker-compose.yml`

```yaml
services:
  frontend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      retries: 3
```

## 3. Variables de Entorno

| Variable               | Descripción                           | Ejemplo                       |
|----------------------- |-------------------------------------- |------------------------------ |
| `NODE_ENV`             | Entorno de ejecución (production)     | `production`                  |
| `REACT_APP_API_URL`    | URL del backend                       | `https://api.sowtic.com`      |
| `NGINX_MAX_BODY_SIZE`  | Tamaño máximo de carga en Nginx       | `10m`                         |

## 4. Optimización y Buenas Prácticas

Use *multistage builds* para obtener imágenes más ligeras:

```dockerfile
FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
```

También se recomienda habilitar técnicas de *cache busting* y considerar el uso de una CDN para los archivos estáticos.

## 5. Pseudodiagrama ASCII del Flujo de Despliegue

```text
[Local Repo] → docker build → [Docker Registry] → docker-compose pull → [Prod Server]
            → docker-compose up → [Nginx] → [Client Browser]
```

## 6. Enlaces Cruzados

- [Arquitectura](architecture.md)
- [Variables de Entorno](constants.md)
- [Docker Compose](../docker/docker-compose.yml)
