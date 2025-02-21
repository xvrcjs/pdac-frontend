# AUKAN

Este proyecto fue iniciado con [Create React App](https://github.com/facebook/create-react-app).

## ¿Cómo usarlo?

### Entorno de Desarrollo local

### Creacion de variables de entorno

Para configurar el proyecto, crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno. A continuación, se incluye una tabla con las variables, sus valores por defecto y una descripción de su función:

| Variable                        | Valor por defecto                    | Descripción                                                                 |
|---------------------------------|--------------------------------------|-----------------------------------------------------------------------------|
| `GENERATE_SOURCEMAP`           | `false`                              | Desactiva la generación de mapas de fuente en el build para optimizar el rendimiento. |
| `REACT_APP_VERSION`            | `$npm_package_version`               | Define la versión de la aplicación basada en la versión especificada en `package.json`. |
| `REACT_APP_BACKEND_URL`        | `http://localhost:8000/api/`         | URL base de la API backend utilizada por el proyecto.                                   |
| `REACT_APP_BACKEND_URL_MEDIA`  | `http://localhost:8000`              | URL base para acceder a los recursos multimedia desde el backend.                       |
| `PORT`                         | `3000`                               | Especifica el puerto en el que se ejecuta la aplicación React.                          |
| `REACT_APP_IMAGES_PATH`        | `"public/images"`                   | Ruta relativa donde se encuentran las imágenes estáticas utilizadas por la aplicación.   |

#### Instalación

```bash
npm install
```

#### Si se generan errores de dependencias

```bash
npm install --legacy-peer-deps
```

#### Ejecutar el proyecto

```bash
npm run start
```

Esto iniciará la aplicación en modo de desarrollo.  
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para verla.

La página se recargará automáticamente si realizas cambios en el código.  
También podrás ver errores de lint en la consola.

### Entorno de Desarrollo Dockerizado

#### Requisitos previos

- Docker
- Docker Compose

#### Construir la imagen Docker

```bash
docker-compose build
```

#### Iniciar el contenedor

```bash
docker-compose up
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

Para detener el contenedor:

```bash
docker-compose down
```

#### Configuracion del Nginx

En el caso de querer levantar el frontend con un dominio y en conjunto el backend en la misma url, esta es la configuracion:

```bash
server {
    listen 80;
    server_name aukan.localhost;

    #FRONTEND REACT
    location / {
        proxy_pass http://pdac-frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    #API DE DJANGO
    location /api/ {
        proxy_pass http://pdac-web:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    #PANEL DE DJANGO
    location /panel/ {
        proxy_pass http://pdac-web:8000/panel/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```
## Aprende Más

Puedes obtener más información en la [documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, visita la [documentación de React](https://reactjs.org/).
