# AUKAN

Este proyecto fue iniciado con [Create React App](https://github.com/facebook/create-react-app).

## Descripción del proyecto

Frontend del portal PDAC desarrollado en React. Incluye un conjunto de componentes, páginas y utilidades para la gestión de reclamos, autenticación de usuarios y reportes. Se provee configuración para su ejecución tanto en entorno local como mediante contenedores Docker.

## Estructura del proyecto

```text
.
├── public/                # Recursos estáticos que se sirven directamente
├── src/                   # Código fuente principal de React
│   ├── components/        # Componentes reutilizables (Navbar, Layout, etc.)
│   ├── pages/             # Vistas y contenedores de cada módulo de la aplicación
│   ├── context/           # Contextos de React utilizados globalmente
│   ├── hooks/             # Hooks personalizados
│   ├── utils/             # Funciones y estilos compartidos
│   └── constant/          # Constantes y endpoints
├── docker/                # Archivos de despliegue en Docker
│   ├── Dockerfile         # Construcción de la imagen
│   ├── nginx/             # Configuración de Nginx
│   └── scripts/           # Scripts de inicialización
├── package.json           # Dependencias y scripts de NPM
├── jsconfig.json          # Configuración de rutas para el editor
└── README.md
```

## Tecnologías utilizadas

- **React** con Create React App
- **JavaScript** (algunas utilidades en TypeScript)
- **Sass** para estilos
- **Material UI (MUI)** y **@mui/x-data-grid** para componentes de interfaz
- **Redux Toolkit** para manejo de estado global
- **Axios** para solicitudes HTTP
- **Docker** y **Nginx** para despliegue

Consulta los archivos [`package.json`](package.json) y [`jsconfig.json`](jsconfig.json) para más detalles de dependencias y configuración.

## Comandos disponibles

| Comando                | Descripción                                                         |
|----------------------- |-------------------------------------------------------------------- |
| `npm install`          | Instala todas las dependencias definidas en `package.json`.         |
| `npm start`            | Ejecuta la aplicación en modo desarrollo (`react-scripts start`).  |
| `npm run build`        | Genera una versión optimizada para producción.                      |
| `npm test`             | Ejecuta las pruebas con `react-scripts`.                            |
| `npm run eject`        | Expone la configuración interna de Create React App.                |

## Instalación y primeros pasos

1. Clona este repositorio.
2. Crea un archivo `.env` en la raíz y define las variables de entorno:

| Variable                        | Valor por defecto              | Descripción                                                                 |
|---------------------------------|--------------------------------|----------------------------------------------------------------------------|
| `GENERATE_SOURCEMAP`            | `false`                        | Desactiva la generación de sourcemaps en el build.                         |
| `REACT_APP_VERSION`             | `$npm_package_version`         | Versión de la aplicación obtenida de `package.json`.                        |
| `REACT_APP_BACKEND_URL`         | `http://localhost:8000/api/`   | URL base de la API backend.                                                |
| `REACT_APP_BACKEND_URL_MEDIA`   | `http://localhost:8000`        | Ruta para recursos multimedia del backend.                                 |
| `PORT`                          | `3000`                         | Puerto local de la aplicación React.                                       |
| `REACT_APP_IMAGES_PATH`         | `"public/images"`              | Ruta de imágenes estáticas utilizadas en la app.                           |

3. Instala las dependencias:

```bash
npm install
```

Si se generan errores de dependencias ejecuta:

```bash
npm install --legacy-peer-deps
```

4. Inicia la aplicación en modo desarrollo:

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador. La página se recargará automáticamente con cada cambio.

### Uso con Docker

1. Construye la imagen:

```bash
docker-compose build
```

2. Inicia el contenedor:

```bash
docker-compose up
```

Accede a la aplicación en [http://localhost:3000](http://localhost:3000). Para detenerla usa:

```bash
docker-compose down
```

#### Configuración de Nginx

Si necesitas servir el frontend y backend bajo el mismo dominio, puedes usar la siguiente configuración (ver también [`docker/nginx/nginx.conf`](docker/nginx/nginx.conf)):

```nginx
server {
    listen 80;
    server_name aukan.localhost;

    location / {
        proxy_pass http://pdac-frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://pdac-web:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /panel/ {
        proxy_pass http://pdac-web:8000/panel/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Aprende más

- [Guía de Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Documentación de React](https://reactjs.org/)
