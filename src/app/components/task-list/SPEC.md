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

## Prompt utilizado
Agente: Claude (claude.ai)
[El prompt se documentará antes del primer commit de código]