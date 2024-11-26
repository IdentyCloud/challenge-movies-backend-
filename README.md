# MovieChallenge Backend

## Importante:
crear un file .env donde se puede tomar como base el .env.example

## Nombre completo

Ezequiel Antonio Nuñez

## Librerías adicionales

- **axios**: Cliente HTTP para realizar solicitudes.
- **compression**: Middleware para la compresión de las respuestas HTTP.
- **cookie-parser**: Middleware para parsear cookies.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Carga variables de entorno desde un archivo `.env`.
- **express**: Framework para construir la API.
- **mongoose**: ODM (Object Document Mapper) para MongoDB.
- **morgan**: Middleware de logging para solicitudes HTTP.

## Documentación a aportar

Con respecto al Modelo Entidad Relación no puedo realizar un grafico pero si detallar lo siguiente:

#### Entidad User:

    ### Atributos:
    •	firstName: Cadena de texto, obligatorio.
    •	lastName: Cadena de texto, obligatorio.
    •	email: Cadena de texto, obligatorio, único.
    •	birthdate: Fecha, obligatorio.
    •	authentication: Un objeto embebido que contiene:
    •	password: Cadena de texto, obligatorio (oculto en las consultas).
    •	salt: Cadena de texto, obligatorio (oculto en las consultas).
    •	sessionToken: Cadena de texto (opcional, oculto en las consultas).

    ### Relaciones:
    •	No hay relaciones con otras entidades en el código actual.
