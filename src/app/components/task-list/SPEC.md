# SPEC: Listar Tareas de un Proyecto por Estado

## Descripción general
El usuario puede ver las tareas de un proyecto filtradas por estado.
Es una vista de solo lectura que muestra el listado de tareas
con su título, estado, horas estimadas y responsable.

## Endpoints involucrados
- **GET** `/project/{projectId}/tasks?status={status}`
- Response: 200 OK con array de `[{ id, title, estimateHours, assignee, status, finishedAt, createdAt }]`
- Error 400: status inválido
- Error 404: proyecto no encontrado

## Restricciones de negocio
- El projectId viene desde la URL
- El status es un parámetro de filtro: TODO, IN_PROGRESS o DONE
- Si no hay tareas con ese estado, mostrar mensaje "No hay tareas en este estado"
- El status por defecto es TODO

## Lineamientos técnicos
- Standalone component
- Bootstrap 5 para estilos con tabla o cards para mostrar las tareas
- HttpClient con TaskService en src/app/services/task.service.ts
- El componente se llama TaskListComponent en src/app/components/task-list/
- El projectId se lee desde la URL con inject(ActivatedRoute)
- El filtro de estado se maneja con un selector en el template
- URL base desde environment.apiUrl
- Usar ngOnInit para cargar los datos al iniciar el componente
- Usar inject() en lugar del constructor

## Lineamientos de diseño
- Selector de estado (TODO, IN_PROGRESS, DONE) arriba del listado
- Tabla Bootstrap con columnas: ID, Título, Estado, Horas, Responsable
- Mensaje vacío cuando no hay tareas
- Spinner mientras carga
- Alerta de error en rojo si falla el request

## Criterios de aceptación
- Dado que el proyecto tiene tareas con estado TODO,
  cuando el usuario navega a /project/2/tasks?status=TODO,
  entonces ve el listado de tareas con ese estado.

- Dado que no hay tareas con el estado seleccionado,
  cuando el usuario cambia el filtro,
  entonces ve el mensaje "No hay tareas en este estado".

- Dado que el proyecto no existe,
  cuando el backend devuelve 404,
  entonces ve un mensaje de error indicando que el proyecto no fue encontrado.

- Dado que el backend no está disponible,
  cuando el usuario navega al listado,
  entonces ve el mensaje "No se pudo conectar con el servidor."

- Dado que se envía un status inválido al backend,
  cuando el backend devuelve 400,
  entonces el usuario ve el mensaje "Estado de tarea inválido."

## Prompt utilizado
Agente: Claude (claude.ai)

Prompt principal:

"Soy estudiante de Angular 21, es mi primera vez usando Angular.

Contexto del sistema:
Estoy desarrollando el frontend de una app de gestión de tareas y proyectos.
El backend es una API REST en Java Spring Boot sin autenticación JWT.
El frontend usa Angular 21 con standalone components y Bootstrap 5.
La URL base del backend viene desde environment.apiUrl.

Feature a implementar: Listar Tareas de un Proyecto por Estado

Endpoint: GET /project/{projectId}/tasks?status={status}
Response: 200 OK con array de [{ id, title, estimateHours, assignee, status, finishedAt, createdAt }]
Error 400: status inválido
Error 404: proyecto no encontrado

Restricciones de negocio:
- El projectId viene desde la URL
- El status es un parámetro de filtro: TODO, IN_PROGRESS o DONE
- Si no hay tareas con ese estado, mostrar mensaje 'No hay tareas en este estado'
- El status por defecto es TODO

Lineamientos técnicos:
- Standalone components
- Bootstrap 5 para estilos con tabla para mostrar las tareas
- HttpClient con método getTasksByStatus() en TaskService
- El componente se llama TaskListComponent en src/app/components/task-list/
- El projectId se lee desde la URL con inject(ActivatedRoute)
- El filtro de estado se maneja con un selector en el template
- URL base desde environment.apiUrl
- Usar ngOnInit para cargar los datos al iniciar el componente
- Usar inject() en lugar del constructor para todas las dependencias
- NO usar CommonModule ni *ngIf, usar sintaxis moderna @if y @for
- Cuando el usuario cambia el estado en el selector, recargar las tareas automáticamente"