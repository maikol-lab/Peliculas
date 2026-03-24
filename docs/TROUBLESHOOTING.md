# 🐛 Guía de Troubleshooting - Peliculas API

## Índice de Problemas

- [Problemas de Instalación](#1-problemas-de-instalación)
- [Problemas al Iniciar el Servidor](#2-problemas-al-iniciar-el-servidor)
- [Problemas con la API](#3-problemas-con-la-api)
- [Problemas con Git](#4-problemas-con-git)
- [Problemas de Base de Datos](#5-problemas-de-base-de-datos)

---

## 1. Problemas de Instalación

### ❌ Error: npm install falla

**Síntoma:**

    npm ERR! code ERESOLVE
    npm ERR! ERESOLVE unable to resolve dependency tree

**Soluciones:**

Opción 1 - Limpiar caché de npm:

    npm cache clean --force
    npm install

Opción 2 - Eliminar node_modules y reinstalar:

    rm -rf node_modules package-lock.json
    npm install

Opción 3 - Instalar con legacy peer deps:

    npm install --legacy-peer-deps

---

### ❌ Error: node no se reconoce como comando

**Síntoma:**

    'node' is not recognized as an internal or external command

**Solución:**

1. Verificar que Node.js está instalado: descargar de [nodejs.org](https://nodejs.org)
2. Verificar que está en el PATH del sistema
3. Reiniciar la terminal después de instalar

Verificar instalación:

    node --version
    npm --version

---

## 2. Problemas al Iniciar el Servidor

### ❌ Error: EADDRINUSE - Port already in use

**Síntoma:**

    Error: listen EADDRINUSE: address already in use :::3000

**Soluciones:**

Opción 1 - Matar el proceso en el puerto (Windows):

    netstat -ano | findstr :3000
    taskkill /PID <PID> /F

Opción 2 - Matar el proceso en el puerto (Mac/Linux):

    lsof -ti:3000 | xargs kill -9

Opción 3 - Cambiar el puerto en la configuración. En `.env` o en el archivo principal:

    PORT=3001

---

### ❌ Error: MODULE_NOT_FOUND

**Síntoma:**

    Error: Cannot find module 'express'

**Solución:**

Reinstalar dependencias:

    npm install

Si persiste, instalar el módulo específico:

    npm install express

---

### ❌ Error: SyntaxError Unexpected token

**Síntoma:**

    SyntaxError: Unexpected token import

**Solución:**

Si usas ES Modules (`import/export`), agregar en `package.json`:

    {
      "type": "module"
    }

O cambiar a CommonJS:

    const express = require('express')

---

## 3. Problemas con la API

### ❌ Error 404 en todas las rutas

**Posibles causas:**
1. El servidor no está corriendo
2. La URL base es incorrecta
3. Las rutas no están registradas

**Diagnóstico:**

Verificar que el servidor responde:

    curl http://localhost:3000/

Verificar endpoint específico:

    curl -v http://localhost:3000/api/peliculas

---

### ❌ Error 500 Internal Server Error

**Posibles causas:**
1. Error en el controlador
2. Conexión a base de datos fallida
3. Variable de entorno faltante

**Diagnóstico:**
- Revisar los logs del servidor en la terminal
- Verificar el archivo `.env`
- Activar modo debug:

      DEBUG=* npm start

---

### ❌ CORS Error desde el frontend

**Síntoma:**

    Access to fetch at 'http://localhost:3000' from origin
    'http://localhost:5173' has been blocked by CORS policy

**Solución:**

Instalar cors:

    npm install cors

Agregar en tu código:

    const cors = require('cors');
    app.use(cors());

---

### ❌ Body vacío en POST/PUT

**Síntoma:** `req.body` es `undefined` o `{}`

**Solución:** Asegurarse de tener el middleware de parseo:

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

Y enviar el header correcto: `Content-Type: application/json`

---

## 4. Problemas con Git

### ❌ Error: node_modules fue commiteado

**Solución:**

1 - Crear o actualizar .gitignore:

    echo "node_modules/" >> .gitignore

2 - Remover node_modules del tracking:

    git rm -r --cached node_modules

3 - Commitear el cambio:

    git commit -m "chore: remover node_modules del repositorio"

---

### ❌ Error: push rejected (non-fast-forward)

**Solución:**

Opción 1 - Pull primero:

    git pull origin main --rebase
    git push origin main

Opción 2 - Force push (⚠️ CUIDADO - solo si eres el único en la rama):

    git push origin main --force

---

## 5. Problemas de Base de Datos

### ❌ Error de conexión a MongoDB

**Síntoma:**

    MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017

**Solución:**
1. Verificar que MongoDB está corriendo
2. Verificar la URI de conexión en `.env`
3. Comprobar firewall/permisos

---

## 🆘 ¿Problema no listado?

1. Revisar los logs completos del error
2. Buscar el error en [Stack Overflow](https://stackoverflow.com)
3. Abrir un Issue en el repositorio con:
   - Descripción del problema
   - Pasos para reproducir
   - Logs del error
   - Versión de Node.js y npm