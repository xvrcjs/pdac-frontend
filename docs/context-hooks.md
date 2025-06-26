# Contextos y Hooks Personalizados

Esta guía documenta los contextos y hooks disponibles en la carpeta `src/` del proyecto. Consulta también la [Arquitectura](architecture.md), las [Páginas](pages.md) y los [Componentes](components.md) para una visión completa.

## 1. Listado de Contextos y Hooks

```text
src/
├── context/
│   └── AppContext.js
└── hooks/
    ├── useAlert.js
    ├── useApi.js
    └── useForm.js
```

## 2. Descripción y Uso de Cada Context

### AppContext

**Propósito:** almacena funciones y estados globales como `api`, `account` y control de autenticación.

**Inicialización:** se provee en `App.js` mediante `AppContext.Provider`.

```tsx
import { AppContext } from 'src/context/AppContext';

<AppContext.Provider value={appContextValues}>
  <Router />
</AppContext.Provider>
```

**Consumo:**

```tsx
import { useContext } from 'react';
import { AppContext } from 'src/context/AppContext';

const { api, account } = useContext(AppContext);
```

## 3. Descripción y Uso de Cada Hook Personalizado

### useAlert
Permite mostrar notificaciones flotantes con Material UI.

```tsx
import useAlert from 'src/hooks/useAlert';

const { alert, alertNode } = useAlert();
```

### useApi
Encapsula las llamadas HTTP y gestiona el token de autenticación.

```ts
import useApi from 'src/hooks/useApi';

const { api, setAuthToken } = useApi({ alert, setIsLoading, onLogout, onError });
```

### useForm
Maneja el estado de formularios simples.

```ts
import useForm from 'src/hooks/useForm';

const { formData, handleInputChange, handleSubmit } = useForm(initialState, onSubmit);
```

## 4. Pseudodiagramas ASCII de Flujo

```text
[Componente] ── useApi ──► [API] ──► setState
       └───── useContext(AppContext) ──► [Auth State]
```

## 5. Variables de Entorno y Props

| Variable                      | Descripción                                | Usado en Hook/Context |
| ----------------------------- | ------------------------------------------ | -------------------- |
| `REACT_APP_BACKEND_URL`       | URL base del backend                       | `useApi`             |

| Context/Hook   | Prop/Parámetro | Tipo       | Descripción                             |
| -------------- | -------------- | ---------- | --------------------------------------- |
| `AppContext.Provider` | `value`        | `object`    | Valores globales (api, account, etc.) |
| `useForm`      | `initialState` | `object`   | Estado inicial del formulario          |
|                | `onSubmit`     | `Function` | Callback al enviar el formulario       |

## 6. Enlaces Cruzados

- [Componentes](components.md)
- [Páginas](pages.md)
- [Arquitectura](architecture.md)
