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
- URL base del backend tomada desde environment.apiUrl
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

## Prompt utilizado
- Agente: Claude (claude.ai)
- El prompt principal está documentado en la conversación de desarrollo.## Criterios de aceptación

* Dado que el usuario completa todos los campos correctamente,
  cuando hace clic en Guardar,
  entonces el proyecto se crea y aparece un mensaje de éxito.

* Dado que el usuario deja el campo nombre vacío,
  cuando hace clic en Guardar,
  entonces ve un mensaje de error indicando que el nombre es obligatorio.

* Dado que el backend devuelve 409,
  cuando el nombre ya existe,
  entonces ve un mensaje de error indicando que el nombre está duplicado.

* Dado que el usuario ingresa una fecha de fin anterior a la fecha de inicio,
  cuando hace clic en Guardar,
  entonces ve el mensaje "La fecha de fin debe ser igual o posterior a la fecha de inicio".

* Dado que el usuario ingresa una fecha de fin anterior a la fecha actual,
  cuando hace clic en Guardar,
  entonces ve el mensaje "La fecha de fin no puede ser anterior a hoy".

* Dado que el backend devuelve error 400,
  cuando el usuario intenta crear un proyecto con datos inválidos,
  entonces ve un mensaje indicando que los datos ingresados no son válidos.

* Dado que ocurre un error inesperado en el servidor,
  cuando el usuario intenta crear un proyecto,
  entonces ve un mensaje genérico de error.

## Prompt utilizado

Agente utilizado: Claude (claude.ai)

Prompt principal:

"Soy estudiante de Angular 21 y es mi primera vez utilizando Angular.

Contexto:
Estoy desarrollando el frontend de una aplicación de gestión de tareas y proyectos.
El backend es una API REST en Java Spring Boot sin autenticación JWT.
El frontend utiliza Angular 21 con standalone components y Bootstrap 5.

Feature a implementar: Crear Proyecto.

Requisitos:

* Formulario reactivo utilizando Reactive Forms.
* Campos: name, startDate, endDate, status y description.
* Validar que endDate sea igual o posterior a startDate.
* Validar que endDate no sea anterior a la fecha actual.
* Consumir el endpoint POST /project.
* Mostrar mensajes de éxito y error según la respuesta del backend.
* Utilizar un servicio ProjectService para la comunicación HTTP.
* Utilizar Bootstrap 5 para la interfaz.
* Implementar manejo de errores para respuestas 400 y 409.
* Utilizar Angular standalone components."
