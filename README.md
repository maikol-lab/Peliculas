# 🎬 Peliculas - API REST

API REST para la gestión de películas, desarrollada con Node.js.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints de la API](#endpoints-de-la-api)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Troubleshooting](#troubleshooting)
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

## 🐛 Troubleshooting

Ver [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

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