# 📡 API Reference - Peliculas

## Base URL 

http://localhost:3000/api

---

## Películas

### Obtener todas las películas

```http
GET /api/peliculas

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

GET /api/peliculas/:id

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

{
  "success": false,
  "error": "Película no encontrada",
  "message": "No existe una película con el ID proporcionado"
}

{
  "titulo": "Inception",
  "director": "Christopher Nolan",
  "anio": 2010,
  "genero": "Ciencia Ficción",
  "calificacion": 8.8
}

# Obtener todas las películas
curl -X GET http://localhost:3000/api/peliculas

# Obtener una película por ID
curl -X GET http://localhost:3000/api/peliculas/1

# Crear una película
curl -X POST http://localhost:3000/api/peliculas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Matrix","director":"Wachowski","anio":1999}'

# Actualizar una película
curl -X PUT http://localhost:3000/api/peliculas/1 \
  -H "Content-Type: application/json" \
  -d '{"calificacion":9.5}'

# Eliminar una película
curl -X DELETE http://localhost:3000/api/peliculas/1