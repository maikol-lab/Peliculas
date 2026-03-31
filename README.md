# 🎬 Peliculas - API REST

API REST para la gestión de películas, desarrollada con Node.js.

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap)
![JX](https://img.shields.io/badge/JX-Backend-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iMTIgMiAyIDcgMTIgMTIgMjIgNyAxMiAyIi8+PHBvbHlsaW5lIHBvaW50cz0iMiAxNyAxMiAyMiAyMiAxNyIvPjwvc3ZnPg==)
![React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?style=for-the-badge&logo=react-router)
![React Icons](https://img.shields.io/badge/React_Icons-5.x-E10098?style=for-the-badge&logo=react)
![Animate.css](https://img.shields.io/badge/Animate.css-4.x-F552B8?style=for-the-badge)
![WOW.js](https://img.shields.io/badge/WOW.js-1.x-FF6B6B?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?style=for-the-badge&logo=eslint)
![gh-pages](https://img.shields.io/badge/gh--pages-6.x-222222?style=for-the-badge&logo=github-pages)


## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Arquitectura](./docs/ARCHITECTURE.md)
- [Características del Proyecto](./docs/FEATURES.md)
- [Contribución](#contribución)
- [Autor](#autor)

## 📖 Descripción

**Peliculas** es una aplicación backend que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un catálogo de películas. Diseñada como una API RESTful siguiendo buenas prácticas de desarrollo.

## ✨ Características

- ✅ CRUD completo de películas
- ✅ API RESTful con endpoints bien definidos
- ✅ Manejo de errores centralizado
- ✅ Estructura de proyecto escalable
- ✅ Gestión de dependencias con npm

## 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| Node.js | Runtime del servidor |
| npm | Gestor de paquetes |
| Git | Control de versiones |
| GitHub | Repositorio remoto |

## 🚀 Instalación

### Prerrequisitos

- **Node.js** v20 o superior
- **npm** v8 o superior
- **Git** v2.30 o superior

### Pasos

**1. Clonar el repositorio**

    git clone https://github.com/tu-usuario/peliculas.git

**2. Navegar al directorio del proyecto**

    cd peliculas

**3. Instalar dependencias**

    npm install

**4. Configurar variables de entorno (si aplica)**

    cp .env.example .env

**5. Iniciar el servidor**

    npm start

## 📡 Uso

**Iniciar en modo desarrollo**

    npm run dev

**Iniciar en modo producción**

    npm start

**Ejecutar tests**

    npm test

## 🔗 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/peliculas | Obtener todas las películas |
| GET | /api/peliculas/:id | Obtener película por ID |
| POST | /api/peliculas | Crear nueva película |
| PUT | /api/peliculas/:id | Actualizar película |
| DELETE | /api/peliculas/:id | Eliminar película |

Para más detalles ver [API Reference](./docs/API_REFERENCE.md)

## 📁 Estructura del Proyecto

    peliculas/
    ├── docs/
    │   ├── ARCHITECTURE.md
    │   ├── API_REFERENCE.md
    │   ├── TROUBLESHOOTING.md
    │   └── FEATURES.md
    ├── node_modules/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middlewares/
    │   └── index.js
    ├── package.json
    ├── package-lock.json
    ├── .gitignore
    └── README.md

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [🐛 Troubleshooting](./docs/TROUBLESHOOTING.md) | Guía de solución de problemas |
| [📡 API Reference](./docs/API_REFERENCE.md) | Documentación de endpoints |
| [🏗️ Arquitectura](./docs/ARCHITECTURE.md) | Arquitectura del proyecto |
| [✨ Características](./docs/FEATURES.md) | Features y roadmap |

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'feat: agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## ✍️ Autor

**Maykool**
- Email: Maykolrodriguez2020.2016@gmail.com
- GitHub: [@Maykool](https://github.com/Maykool)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.