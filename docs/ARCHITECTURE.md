# 🏗️ Documentación de Arquitectura - Peliculas API

> Para convertir los diagramas a PNG, usa: https://mermaid.live oVS Code con extensión "Markdown Preview Mermaid"

## 1. Visión General

La aplicación sigue una **arquitectura en capas (Layered Architecture)** que separa responsabilidades para facilitar el mantenimiento y la escalabilidad.

---

## 2. Diagrama de Arquitectura (Flow)

![Diagrama de Arquitectura](../public/asset/Diagrama%20de%20Arquitectura.png)

---

## 3. Diagrama de Componentes

![Diagrama de Componentes](../public/asset/Diagrama%20de%20Componentes.png)

---

## 4. Diagrama de Secuencia (Crear Película)

![Diagrama de Secuencia](../public/asset/Diagrama%20de%20Secuencia.png)

---

## 5. Estructura del Proyecto

![Estructura del Proyecto](../public/asset/Estructura%20del%20Proyecto.png)

---

## 6. Flujo de Petición API

![Flujo de Petición API](../public/asset/Flujo%20de%20Petición%20API.png)

---

## 7. Componentes Principales

### 3.1 Routes - /src/routes/
- **Responsabilidad**: Definir los endpoints de la API
- **Patrón**: Router de Express.js
- **Principio**: Cada recurso tiene su archivo de rutas

### 3.2 Controllers - /src/controllers/
- **Responsabilidad**: Manejar la lógica de negocio
- **Patrón**: Controller Pattern
- **Principio**: Un controlador por recurso/entidad

### 3.3 Models - /src/models/
- **Responsabilidad**: Definir la estructura de datos
- **Patrón**: Schema/Model Pattern
- **Principio**: Representación de entidades del dominio

### 3.4 Middlewares - /src/middlewares/
- **Responsabilidad**: Funciones intermedias de procesamiento
- **Funciones**: Validación, logging, manejo de errores, CORS

## 8. Principios de Diseño

| Principio | Aplicación |
|-----------|------------|
| **Separación de responsabilidades** | Cada capa tiene una función única |
| **Single Responsibility** | Cada archivo/módulo hace una sola cosa |
| **DRY** | Reutilización de middlewares y utilidades |
| **RESTful** | Endpoints siguen convenciones REST |

## 9. Decisiones Técnicas

| Decisión | Justificación |
|----------|---------------|
| Node.js como runtime | Alto rendimiento en I/O, ecosistema npm amplio |
| Arquitectura en capas | Facilidad de testing y mantenimiento |
| npm como gestor | Estándar de la industria para Node.js |