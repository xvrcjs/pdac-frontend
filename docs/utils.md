# Utilidades

Este documento recopila las funciones y ayudas ubicadas en `src/utils/`.
Consulta también la [Arquitectura](architecture.md), el listado de [Componentes](components.md), las [Páginas](pages.md) y la guía de [Contextos y Hooks](context-hooks.md).

## 1. Listado de Funciones Utilitarias

```text
src/utils/
├── Criteria.js
├── FormatDate.js
├── HTMLRenderer.jsx
├── MainStyles.scss
├── censor.js
└── icons.js
```

## 2. Descripción y Ejemplos de Uso

### FormatDate.js

Funciones para transformar números y fechas a cadenas legibles.

```ts
// FormatDate.js
import { renderDate, renderDatetime } from 'src/utils/FormatDate';

const day = renderDate(new Date());
const full = renderDatetime('2025-06-25T15:00:00Z', { timezone: 'UTC' });
```

- **`renderInt(value: number): string`** – Formatea un entero.
- **`renderFloat(value: number): string`** – Formatea un número con decimales.
- **`renderDate(date: Date | string): string`** – Devuelve la fecha local formateada.
- **`renderTime(date: Date | string): string`** – Devuelve la hora local.
- **`renderDatetime(value: Date | string, options?): string`** – Combina fecha y hora con opciones.

### censor.js

```ts
import { censorEmail } from 'src/utils/censor';

const safeMail = censorEmail('user@example.com');
```

- **`censorEmail(email: string): string`** – Oculta caracteres centrales del correo electrónico.

### Criteria.js

Clase orientada a filtrar colecciones mediante operadores simples.

```ts
import Criteria from 'src/utils/Criteria';

const criteria = new Criteria();
criteria.add({ field: 'status', operator: 'equals', value: 'open' });
const result = criteria.apply(items);
```

- **`add(filter)`** – Agrega una condición al conjunto.
- **`reset()`** – Limpia todas las condiciones.
- **`apply(items)`** – Retorna los elementos que cumplen todos los filtros.

### HTMLRenderer.jsx

Componente React para mostrar HTML seguro.

```tsx
import HTMLRenderer from 'src/utils/HTMLRenderer';

<HTMLRenderer htmlText="<p>Hola Mundo</p>" />
```

### icons.js

Exporta varios íconos SVG como constantes para su reutilización.

```ts
import { notificationIcon } from 'src/utils/icons';
```

## 3. Criterios de Diseño

- **Pure Functions** cuando es posible.
- **Inmutabilidad** de parámetros para evitar efectos colaterales.
- **Testabilidad** manteniendo funciones pequeñas y desacopladas.

```text
[Input] → [Pure Function] → [Output]
```

## 4. Variables de Entorno

Actualmente las utilidades no requieren variables de entorno específicas.

## 5. Enlaces Cruzados

- [Componentes](components.md)
- [Páginas](pages.md)
- [Contextos y Hooks](context-hooks.md)
- [Arquitectura](architecture.md)
