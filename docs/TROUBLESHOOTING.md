---

## 📄 Archivo 4: TROUBLESHOOTING.md

```markdown
# 🐛 Guía de Troubleshooting - Peliculas API

## Índice de Problemas

1. [Problemas de Instalación](#1-problemas-de-instalación)
2. [Problemas al Iniciar el Servidor](#2-problemas-al-iniciar-el-servidor)
3. [Problemas con la API](#3-problemas-con-la-api)
4. [Problemas con Git](#4-problemas-con-git)
5. [Problemas de Base de Datos](#5-problemas-de-base-de-datos)

---

## 1. Problemas de Instalación

### ❌ Error: `npm install` falla

**Síntoma:**
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree

Soluciones:

# Opción 1: Limpiar caché de npm
npm cache clean --force
npm install

# Opción 2: Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Opción 3: Instalar con legacy peer deps
npm install --legacy-peer-deps

❌ Error: node no se reconoce como comando
Síntoma:

'node' is not recognized as an internal or external command

Solución:

Verificar que Node.js está instalado: descargar de nodejs.org
Verificar que está en el PATH del sistema
Reiniciar la terminal después de instalar

# Verificar instalación
node --version
npm --version

2. Problemas al Iniciar el Servidor
❌ Error: EADDRINUSE - Port already in use
Síntoma:  Error: listen EADDRINUSE: address already in use :::3000

Soluciones:

# Opción 1: Matar el proceso en el puerto (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Opción 2: Matar el proceso en el puerto (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Opción 3: Cambiar el puerto en la configuración
# En .env o en el archivo principal:
PORT=3001

Solución:

# Reinstalar dependencias
npm install

# Si persiste, instalar el módulo específico
npm install express