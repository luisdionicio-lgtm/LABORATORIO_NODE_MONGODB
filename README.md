# Nexo Social Media

Aplicación web del Laboratorio 06 para gestionar publicaciones con Node.js, Express, EJS, Mongoose y MongoDB.

## Funcionalidades de la tarea

- Modelos `User` y `Post` con restricciones de tipo, longitud, obligatoriedad y fechas.
- Listado de publicaciones de todos los usuarios.
- Registro, edición y eliminación de publicaciones.
- Selección de una historia destacada para mostrarla dinámicamente en la portada.
- Asociación de cada publicación con un usuario de MongoDB.
- Registro y listado de usuarios desde la interfaz web.
- Hashtags, imagen opcional y actualización automática de `updatedAt`.
- Interfaz responsive con estilos propios.

## Ejecución

1. Copia `.env.example` como `.env`.
2. Verifica que MongoDB esté iniciado.
3. Instala las dependencias con `npm install`.
4. Ejecuta `npm run dev`.
5. Abre `http://localhost:3001`.

Para crear una publicación debe existir al menos un usuario en la colección `users`, tal como se realiza en la parte previa del laboratorio.
