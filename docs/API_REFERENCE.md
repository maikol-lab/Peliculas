# 📡 API Reference - Peliculas

## Base URL

    http://localhost:3000/api

---

## Películas

### Obtener todas las películas

    GET /api/peliculas

**Response 200 (OK)**

    {
      "success": true,
      "data": [
        {
          "id": 1,
          "titulo": "El Padrino",
          "director": "Francis Ford Coppola",
          "anio": 1972,
          "genero": "Drama",
          "calificacion": 9.2
        },
        {
          "id": 2,
          "titulo": "Pulp Fiction",
          "director": "Quentin Tarantino",
          "anio": 1994,
          "genero": "Crimen",
          "calificacion": 8.9
        }
      ],
      "total": 2
    }

---

### Obtener película por ID

    GET /api/peliculas/:id

**Parámetros de Ruta**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| id | integer | ✅ | ID único de la película |

**Response 200 (OK)**

    {
      "success": true,
      "data": {
        "id": 1,
        "titulo": "El Padrino",
        "director": "Francis Ford Coppola",
        "anio": 1972,
        "genero": "Drama",
        "calificacion": 9.2
      }
    }

**Response 404 (Not Found)**

    {
      "success": false,
      "error": "Película no encontrada",
      "message": "No existe una película con el ID proporcionado"
    }

---

### Crear nueva película

    POST /api/peliculas

**Headers**

| Header | Valor |
|--------|-------|
| Content-Type | application/json |

**Body**

    {
      "titulo": "Inception",
      "director": "Christopher Nolan",
      "anio": 2010,
      "genero": "Ciencia Ficción",
      "calificacion": 8.8
    }

**Parámetros del Body**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| titulo | string | ✅ | Título de la película |
| director | string | ✅ | Director de la película |
| anio | integer | ✅ | Año de estreno |
| genero | string | ❌ | Género cinematográfico |
| calificacion | float | ❌ | Calificación (0-10) |

**Response 201 (Created)**

    {
      "success": true,
      "message": "Película creada exitosamente",
      "data": {
        "id": 3,
        "titulo": "Inception",
        "director": "Christopher Nolan",
        "anio": 2010,
        "genero": "Ciencia Ficción",
        "calificacion": 8.8
      }
    }

**Response 400 (Bad Request)**

    {
      "success": false,
      "error": "Datos inválidos",
      "message": "Los campos 'titulo', 'director' y 'anio' son requeridos"
    }

---

### Actualizar película

    PUT /api/peliculas/:id

**Parámetros de Ruta**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| id | integer | ✅ | ID de la película a actualizar |

**Body**

    {
      "titulo": "Inception (IMAX Edition)",
      "calificacion": 9.0
    }

**Response 200 (OK)**

    {
      "success": true,
      "message": "Película actualizada exitosamente",
      "data": {
        "id": 3,
        "titulo": "Inception (IMAX Edition)",
        "director": "Christopher Nolan",
        "anio": 2010,
        "genero": "Ciencia Ficción",
        "calificacion": 9.0
      }
    }

---

### Eliminar película

    DELETE /api/peliculas/:id

**Parámetros de Ruta**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| id | integer | ✅ | ID de la película a eliminar |

**Response 200 (OK)**

    {
      "success": true,
      "message": "Película eliminada exitosamente"
    }

**Response 404 (Not Found)**

    {
      "success": false,
      "error": "Película no encontrada"
    }

---

## Códigos de Estado HTTP

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| 200 | OK | Petición exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Datos inválidos en la petición |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error interno del servidor |

---

## Ejemplos con cURL

**Obtener todas las películas**

    curl -X GET http://localhost:3000/api/peliculas

**Obtener una película por ID**

    curl -X GET http://localhost:3000/api/peliculas/1

**Crear una película**

    curl -X POST http://localhost:3000/api/peliculas -H "Content-Type: application/json" -d '{"titulo":"Matrix","director":"Wachowski","anio":1999}'

**Actualizar una película**

    curl -X PUT http://localhost:3000/api/peliculas/1 -H "Content-Type: application/json" -d '{"calificacion":9.5}'

**Eliminar una película**

    curl -X DELETE http://localhost:3000/api/peliculas/1