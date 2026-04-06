# SPEC: Crear Proyecto

## Descripción general
El usuario puede crear un nuevo proyecto completando un formulario con los datos requeridos.
El formulario envía los datos al backend y muestra feedback de éxito o error.

## Endpoints involucrados
- **POST** `http://localhost:8080/project`
- Body: `{ name, startDate, endDate, status, description }`
- Response exitoso: 200 OK con el proyecto creado `{ id, name, startDate, endDate, status, description }`
- Response error 409: nombre duplicado
- Response error 400: datos inválidos

## Restricciones de negocio
- `name` es obligatorio y debe ser único
- `endDate` debe ser mayor o igual a `startDate`
- `endDate` debe ser mayor o igual a hoy
- `status` debe ser uno de: PLANNED, ACTIVE, CLOSED
- `description` es opcional

## Lineamientos técnicos
- Standalone component
- Bootstrap 5 para estilos
- Reactive Forms para el formulario
- HttpClient para la comunicación con el backend
- Servicio dedicado `ProjectService` en `src/app/services/`

## Criterios de aceptación
- Dado que el usuario completa todos los campos correctamente,
  cuando hace clic en Guardar,
  entonces el proyecto se crea y aparece un mensaje de éxito.

- Dado que el usuario deja el campo nombre vacío,
  cuando hace clic en Guardar,
  entonces ve un mensaje de error indicando que el nombre es obligatorio.

- Dado que el backend devuelve 409,
  cuando el nombre ya existe,
  entonces ve un mensaje de error indicando que el nombre está duplicado.