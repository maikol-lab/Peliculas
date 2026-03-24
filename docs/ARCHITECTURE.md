---

## 📄 Archivo 2: ARCHITECTURE.md

```markdown
# 🏗️ Documentación de Arquitectura - Peliculas API

## 1. Visión General

La aplicación sigue una **arquitectura en capas (Layered Architecture)** que separa responsabilidades para facilitar el mantenimiento y la escalabilidad.

## 2. Diagrama de Arquitectura

┌─────────────────────────────────────────────────┐
│                    CLIENTE                       │
│           (Postman / Frontend / cURL)            │
└─────────────────────┬───────────────────────────┘
│ HTTP Request
▼
┌─────────────────────────────────────────────────┐
│               CAPA DE ENTRADA                    │
│                 (Routes)                         │
│  Define los endpoints y métodos HTTP permitidos  │
└─────────────────────┬───────────────────────────┘
│
▼
┌─────────────────────────────────────────────────┐
│              CAPA DE MIDDLEWARE                   │
│             (Middlewares)                         │
│  Validación, autenticación, manejo de errores    │
└─────────────────────┬───────────────────────────┘
│
▼
┌─────────────────────────────────────────────────┐
│           CAPA DE LÓGICA DE NEGOCIO              │
│              (Controllers)                       │
│  Procesa la lógica y orquesta las operaciones    │
└─────────────────────┬───────────────────────────┘
│
▼
┌─────────────────────────────────────────────────┐
│             CAPA DE DATOS                        │
│               (Models)                           │
│  Define esquemas y accede a la base de datos     │
└─────────────────────┬───────────────────────────┘
│
▼
┌─────────────────────────────────────────────────┐
│            BASE DE DATOS                         │
│       (MongoDB / MySQL / JSON File)              │
└─────────────────────────────────────────────────┘

## 3. Componentes Principales

### 3.1 Routes (`/src/routes/`)
- **Responsabilidad**: Definir los endpoints de la API
- **Patrón**: Router de Express.js
- **Principio**: Cada recurso tiene su archivo de rutas

### 3.2 Controllers (`/src/controllers/`)
- **Responsabilidad**: Manejar la lógica de negocio
- **Patrón**: Controller Pattern
- **Principio**: Un controlador por recurso/entidad

### 3.3 Models (`/src/models/`)
- **Responsabilidad**: Definir la estructura de datos
- **Patrón**: Schema/Model Pattern
- **Principio**: Representación de entidades del dominio

### 3.4 Middlewares (`/src/middlewares/`)
- **Responsabilidad**: Funciones intermedias de procesamiento
- **Funciones**: Validación, logging, manejo de errores, CORS

## 4. Flujo de una Petición

Cliente envía: GET /api/peliculas/1
Router identifica la ruta → peliculasRouter
Middleware valida la petición
Controller ejecuta la lógica → getPeliculaById(1)
Model consulta la base de datos
Controller formatea la respuesta
Se envía HTTP 200 con los datos al cliente

## 5. Principios de Diseño

| Principio | Aplicación |
|-----------|------------|
| **Separación de responsabilidades** | Cada capa tiene una función única |
| **Single Responsibility** | Cada archivo/módulo hace una sola cosa |
| **DRY** | Reutilización de middlewares y utilidades |
| **RESTful** | Endpoints siguen convenciones REST |

## 6. Decisiones Técnicas

| Decisión | Justificación |
|----------|---------------|
| Node.js como runtime | Alto rendimiento en I/O, ecosistema npm amplio |
| Arquitectura en capas | Facilidad de testing y mantenimiento |
| npm como gestor | Estándar de la industria para Node.js |