# SPEC: Crear Tarea dentro de un Proyecto

## Descripción general
El usuario puede crear una nueva tarea dentro de un proyecto existente.
Completa un formulario con los datos requeridos y el sistema la asocia
al proyecto indicado. Solo se pueden agregar tareas a proyectos que no
estén CLOSED.

## Endpoints involucrados
- **POST** `http://localhost:8080/project/{projectId}/task`
- Body: `{ title, estimateHours, assignee, status }`
- Response: 200 OK con `{ id, title, estimateHours, assignee, status, finishedAt, createdAt }`
- Error 400: datos inválidos
- Error 404: proyecto no encontrado
- Error 409: proyecto CLOSED
- Error 0: sin conexión con el servidor

## Restricciones de negocio
- title es obligatorio y mínimo 3 caracteres
- estimateHours debe ser mayor a 0
- status debe ser uno de: TODO, IN_PROGRESS, DONE
- assignee es opcional
- No se pueden agregar tareas a proyectos con status CLOSED
- Si el proyecto no existe (404), se muestra mensaje de error

## Lineamientos técnicos
- Standalone component
- Bootstrap 5 para estilos
- Reactive Forms con validaciones
- HttpClient con TaskService en src/app/services/task.service.ts
- El projectId se lee desde la URL con ActivatedRoute
- URL base del backend tomada desde environment.apiUrl
- Manejar estados de carga, éxito y error en el template

## Criterios de aceptación

- Dado que el usuario completa todos los campos correctamente,
  cuando hace clic en Crear tarea,
  entonces la tarea se crea y aparece un mensaje de éxito.

- Dado que el usuario deja el título vacío,
  cuando hace clic en Crear tarea,
  entonces ve un mensaje indicando que el título es obligatorio.

- Dado que estimateHours es 0 o negativo,
  cuando hace clic en Crear tarea,
  entonces ve un mensaje indicando que debe ser mayor a 0.

- Dado que el proyecto tiene estado CLOSED,
  cuando el backend devuelve 409,
  entonces ve un mensaje indicando que no se pueden agregar tareas.

- Dado que el proyecto no existe,
  cuando el backend devuelve 404,
  entonces ve un mensaje indicando que el proyecto no fue encontrado.

- Dado que el backend no está corriendo,
  cuando el request falla con error de red,
  entonces ve un mensaje indicando que no se pudo conectar con el servidor.

## Prompt utilizado
Agente: Claude (claude.ai)
El prompt principal está documentado en la conversación de desarrollo.