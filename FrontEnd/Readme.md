# GPI Template - Universidad de Valparaíso

Template web para la asignatura de Gestión de Proyecto Informático (GPI) de la Universidad de Valparaíso. Este proyecto proporciona una base robusta para desarrollar aplicaciones web modernas con React, TypeScript y otras tecnologías actuales.

## 🚀 Tecnologías

Este template utiliza las siguientes tecnologías:

- **React 19**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Vite**: Herramienta de construcción y desarrollo rápido
- **TailwindCSS 4**: Framework CSS para diseño basado en utilidades
- **Material UI (MUI) 6**: Biblioteca de componentes React con diseño Material
- **React Router 7**: Enrutamiento para aplicaciones React
- **pnpm**: Gestor de paquetes rápido y eficiente
- **Axios**: Cliente HTTP para realizar peticiones al backend

## 📁 Estructura de Carpetas

```
/
├── public/                # Archivos estáticos accesibles públicamente
├── src/                   # Código fuente principal
│   ├── assets/            # Imágenes, iconos y recursos estáticos
│   │   ├── icons/         # Iconos SVG personalizados
│   │   └── ...            
│   ├── components/        # Componentes React reutilizables
│   │   ├── mui/           # Componentes de Material UI personalizados
│   │   ├── spinner/       # Componente de carga/spinner
│   │   └── ...
│   ├── layouts/           # Componentes de diseño de página
│   │   ├── auth/          # Layout para páginas de autenticación
│   │   ├── blank-layout/  # Layout simple sin elementos adicionales
│   │   └── dashboardLayout/ # Layout principal con menú y estructura
│   ├── routes/            # Configuración de rutas
│   ├── scripts/           # Utilidades y hooks personalizados
│   ├── style/             # Configuraciones de temas y estilos
│   ├── views/             # Componentes de página principales
│   │   ├── authentication/ # Páginas de autenticación (login, registro)
│   │   ├── home/          # Página de inicio
│   │   └── ...
│   ├── App.tsx            # Componente principal de la aplicación
│   ├── main.tsx           # Punto de entrada de la aplicación
│   └── index.css          # Estilos globales
├── .gitignore             # Archivos ignorados por git
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
└── vite.config.ts         # Configuración de Vite
```

### Carpetas Adicionales Recomendadas

Para una gestión más eficiente del proyecto, se recomienda añadir las siguientes carpetas:

#### 📂 `src/db`
Contiene todo lo relacionado con la gestión de datos y conexión con el backend de NestJS:

```
src/db/
├── config/            # Configuración de conexión al backend
├── models/            # Interfaces y tipos para los datos
├── services/          # Funciones para interactuar con la API de NestJS
│   ├── authService.ts # Servicios de autenticación
│   ├── userService.ts # Servicios relacionados con usuarios
│   └── ...
└── index.ts           # Exportaciones centralizadas
```

**Ejemplo de uso:**
```typescript
// src/db/config/api.ts
import axios from 'axios';

// Crear instancia de axios para comunicarse con el backend de NestJS
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token de autenticación
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### 📂 `src/hooks`
Hooks personalizados de React para reutilizar lógica:

```
src/hooks/
├── useApi.ts          # Hook para interactuar con el backend NestJS
├── useAuth.ts         # Hook para gestionar autenticación
├── useForm.ts         # Hook para manejar formularios
└── ...
```

**Ejemplo de uso:**
```typescript
// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { api } from '../db/config/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  return { user, loading };
}
```

#### 📂 `src/utils`
Funciones de utilidad reutilizables:

```
src/utils/
├── formatters.ts      # Funciones para formatear datos (fechas, números, etc.)
├── validators.ts      # Validaciones (email, contraseña, etc.)
├── helpers.ts         # Funciones auxiliares generales
└── ...
```

**Ejemplo de uso:**
```typescript
// src/utils/formatters.ts
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(amount);
};
```

#### 📂 `src/components` (organización detallada)
Una estructura más organizada para componentes:

```
src/components/
├── common/            # Componentes básicos reutilizables
│   ├── Button/
│   ├── Card/
│   ├── Modal/
│   └── ...
├── forms/             # Componentes de formulario
│   ├── Input/
│   ├── Select/
│   ├── Checkbox/
│   └── ...
├── layout/            # Componentes de estructura (no confundir con layouts)
│   ├── Header/
│   ├── Footer/
│   ├── Sidebar/
│   └── ...
├── data-display/      # Componentes para mostrar datos
│   ├── Table/
│   ├── List/
│   ├── Chart/
│   └── ...
└── feature/           # Componentes específicos de características
    ├── Authentication/
    ├── Dashboard/
    └── ...
```

Cada carpeta de componente puede seguir esta estructura:
```
Button/
├── Button.tsx         # Componente principal
├── Button.test.tsx    # Tests
├── Button.module.css  # Estilos (si no se usa Tailwind)
└── index.ts           # Exporta el componente
```

## 🏗️ Arquitectura

### Sistema de Layouts

La aplicación utiliza un sistema de layouts para mantener una estructura coherente:

- **AuthLayout**: Para páginas de autenticación (login, registro, recuperación de contraseña)
- **MainLayout**: Layout principal con menú de navegación y estructura de dashboard
- **BlankLayout**: Layout simple sin elementos adicionales

#### Explicación Detallada de Layouts y Routing

La carpeta `src/layouts` contiene los diferentes layouts de la aplicación, que actúan como plantillas para diferentes secciones de la app. Cada layout define una estructura común que se reutiliza en múltiples páginas.

##### Funcionamiento de los Layouts

Cada layout utiliza el componente `<Outlet />` de React Router DOM, que funciona como un "hueco" donde se renderizará el contenido específico de cada ruta. Por ejemplo:

```jsx
// Estructura básica de un layout
function AuthLayout() {
  return (
    <div className="auth-container">
      {/* Elementos comunes del layout */}
      <header>...</header>
      
      {/* Aquí se renderizará el contenido específico de cada ruta */}
      <Outlet />
      
      <footer>...</footer>
    </div>
  );
}
```

##### Integración con Routes.tsx

En el archivo `src/routes/Routes.tsx`, se configura cómo los layouts y las vistas se conectan:

```jsx
const Router = [
  {
    path: "/auth",           // Ruta base
    element: <AuthLayout />, // Layout que se usará
    children: [              // Rutas hijas que se renderizarán dentro del <Outlet />
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      // ...
    ],
  },
  // Más configuraciones de rutas...
];
```

##### Lazy Loading con Loadable

El archivo `src/routes/Loadable.tsx` implementa la carga diferida (lazy loading) de componentes, lo que mejora el rendimiento inicial:

```jsx
// Simplificado para explicar el concepto
function Loadable(Component) {
  return function(props) {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    );
  };
}
```

Esto permite que los componentes se carguen solo cuando son necesarios, lo que se implementa en Routes.tsx:

```jsx
const Login = Loadable(lazy(() => import("../views/authentication/Login")));
```

##### Flujo de Navegación

1. Cuando un usuario navega a una URL (ej. `/auth/login`):
   - React Router identifica que debe usar `AuthLayout` para la ruta base `/auth`
   - Dentro de `AuthLayout`, el componente `<Outlet />` renderizará el componente `Login`
   - El resultado es una página que combina la estructura de `AuthLayout` con el contenido específico de `Login`

2. Si el usuario navega a `/` (raíz):
   - Se usará el `MainLayout` 
   - El componente `Home` se renderizará dentro del `<Outlet />`

Este sistema de layouts anidados permite:
- Reutilizar estructuras comunes (menús, cabeceras, etc.)
- Mantener coherencia visual entre páginas relacionadas
- Simplificar el código al evitar repetir elementos comunes
- Implementar áreas protegidas (como verificación de autenticación en `AuthLayout`)

### Sistema de Rutas

Las rutas se configuran en `src/routes/Routes.tsx` utilizando React Router. Cada ruta está asociada a un layout y carga los componentes necesarios de forma diferida (lazy loading).

### Componentes UI

- **Material UI**: Se utiliza para componentes avanzados como botones, campos de formulario, etc.
- **TailwindCSS**: Se utiliza para estilos personalizados y diseño responsivo

### Características

- **Modo Oscuro**: Implementado con detección automática de preferencias del sistema
- **Diseño Responsivo**: Adaptado para móviles y escritorio
- **Autenticación**: Sistema de login, registro y recuperación de contraseña

## 🚦 Guía de Instalación y Ejecución

### Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- pnpm

#### Instalación de pnpm

**Windows:**
```bash
# Usando npm
npm install -g pnpm

# Usando Winget
winget install pnpm

# Usando Chocolatey
choco install pnpm
```

**macOS:**
```bash
# Usando npm
npm install -g pnpm

# Usando Homebrew
brew install pnpm

# Usando MacPorts
port install pnpm
```

**Linux:**
```bash
# Usando npm
npm install -g pnpm

# Usando Debian/Ubuntu
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Usando Alpine Linux
apk add pnpm
```

Para cualquier sistema operativo, también puedes usar:
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Instalación

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd gpitemplate
   ```

2. Instala las dependencias con pnpm:
   ```bash
   pnpm install
   ```

### Ejecución

- **Desarrollo**:
  ```bash
  pnpm dev
  ```
  Esto iniciará el servidor de desarrollo en `http://localhost:5173`

- **Construcción para producción**:
  ```bash
  pnpm build
  ```
  Los archivos se generarán en la carpeta `dist`

- **Vista previa de la versión de producción**:
  ```bash
  pnpm preview
  ```

- **Ejecutar el linter**:
  ```bash
  pnpm lint
  ```

## 📱 Características Responsivas

La aplicación está diseñada para funcionar en dispositivos móviles y de escritorio:

- En dispositivos móviles, el menú se convierte en un drawer que se abre desde la derecha
- En escritorio, se muestra un menú lateral fijo
- Los formularios y componentes se adaptan al tamaño de la pantalla

## 🎨 Personalización de Temas

El tema de Material UI está configurado en `src/style/theme.mui.ts`. Puedes modificar colores, tipografía y otros aspectos del tema allí.

Los colores principales del tema son:

```css
:root {
  --color-darkgreen: #002E38;
  --color-blue: #003c58;
  --color-turquesa: #06717e;
  --color-gris: #ebebeb;
  --color-white-smoke: #fefefe;
  --color-black: #1f1b1b;
}
```

## 📝 Notas para Estudiantes

- Este template está diseñado como punto de partida para proyectos web en la asignatura de GPI
- Se recomienda familiarizarse con React, TypeScript y los conceptos básicos de los frameworks utilizados
- Puedes personalizar y extender este template según las necesidades de tu proyecto
- La estructura está diseñada para ser escalable y mantener el código organizado a medida que el proyecto crece

## 🔍 Ejemplos de Uso

### Conectar con el Backend NestJS

1. Configura la URL base en el archivo `.env`:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

2. Crea un servicio para interactuar con el backend:
   ```typescript
   // src/db/services/userService.ts
   import { api } from '../config/api';
   
   export const userService = {
     getUsers: async () => {
       const response = await api.get('/users');
       return response.data;
     },
     
     getUserById: async (id: string) => {
       const response = await api.get(`/users/${id}`);
       return response.data;
     },
     
     createUser: async (userData: any) => {
       const response = await api.post('/users', userData);
       return response.data;
     }
   };
   ```

3. Utiliza el servicio en un componente:
   ```tsx
   import { useState, useEffect } from 'react';
   import { userService } from '../db/services/userService';
   
   function UserList() {
     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(true);
     
     useEffect(() => {
       const fetchUsers = async () => {
         try {
           const data = await userService.getUsers();
           setUsers(data);
         } catch (error) {
           console.error('Error fetching users:', error);
         } finally {
           setLoading(false);
         }
       };
       
       fetchUsers();
     }, []);
     
     if (loading) return <p>Cargando usuarios...</p>;
     
     return (
       <div>
         <h2>Lista de Usuarios</h2>
         <ul>
           {users.map(user => (
             <li key={user.id}>{user.name}</li>
           ))}
         </ul>
       </div>
     );
   }
   ```

### Añadir una Nueva Página

1. Crea un nuevo componente en la carpeta `src/views`
2. Añade la ruta en `src/routes/Routes.tsx`
3. Asocia la ruta con el layout adecuado

### Personalizar el Tema

Modifica el archivo `src/style/theme.mui.ts` para cambiar colores, tipografía y otros aspectos del tema.

---

Desarrollado para la asignatura de Gestión de Proyecto Informático - Diego Monsalves - René Noël - Universidad de Valparaíso