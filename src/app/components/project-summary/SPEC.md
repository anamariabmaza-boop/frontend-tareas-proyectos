# SPEC: Ver Resumen de un Proyecto

## Descripción general
El usuario puede ver un resumen estadístico de un proyecto existente.
Muestra el total de tareas, cuántas están completadas y el total
de horas estimadas. Es una vista de solo lectura.

## Endpoints involucrados
- GET /project/{projectId}/summary
- Response: 200 OK con `{ totalTasks, doneTasks, totalEstimateHours }`
- Error 404: proyecto no encontrado

## Restricciones de negocio
- El projectId viene desde la URL
- Es una vista de solo lectura, no hay formulario
- Si el proyecto no tiene tareas, los valores deben mostrar 0
- Si el projectId no es un número válido, se muestra error

## Lineamientos técnicos
- Standalone component
- Bootstrap 5 para estilos con cards para mostrar estadísticas
- HttpClient con ProjectService en src/app/services/project.service.ts
- El componente se llama ProjectSummaryComponent en src/app/components/project-summary/
- El projectId se lee desde la URL usando inject(ActivatedRoute)
- URL base del backend tomada desde environment.apiUrl
- Manejar estados de carga y error en el template
- Usar ngOnInit para cargar los datos al iniciar el componente

## Criterios de aceptación
- Dado que el proyecto existe,
  cuando el usuario navega a /project/2/summary,
  entonces ve el total de tareas, tareas completadas y horas estimadas en cards.

- Dado que el proyecto no existe,
  cuando el backend devuelve 404,
  entonces ve un mensaje de error indicando que el proyecto no fue encontrado.

- Dado que el proyecto no tiene tareas,
  cuando el usuario navega al resumen,
  entonces ve los valores en 0 y la barra de progreso en 0%.

- Dado que el backend no está corriendo,
  cuando el request falla con error de red,
  entonces ve un mensaje de error genérico.

## Prompt utilizado
Agente: Claude (claude.ai)

```
Soy estudiante de Angular 21, es mi primera vez usando Angular.

Contexto del sistema:
Estoy desarrollando el frontend de una app de gestión de tareas y proyectos.
El backend es una API REST en Java Spring Boot sin autenticación JWT.
El frontend usa Angular 21 con standalone components y Bootstrap 5.
La URL base del backend viene desde environment.apiUrl.

Feature a implementar: Ver Resumen de un Proyecto

Endpoint: GET http://localhost:8080/project/{projectId}/summary
Response: 200 OK con { totalTasks, doneTasks, totalEstimateHours }
Error 404: proyecto no encontrado

Restricciones de negocio:
- Es una vista de solo lectura, no hay formulario
- El projectId viene desde la URL
- Si el proyecto no tiene tareas, los valores muestran 0
- Si el projectId no es un número válido, mostrar error

Lineamientos técnicos:
- Standalone components
- Bootstrap 5 para estilos con cards para mostrar las estadísticas
- HttpClient con método getSummary() en ProjectService
- El componente se llama ProjectSummaryComponent
- El projectId se lee desde la URL con inject(ActivatedRoute)
- Usar ngOnInit para cargar los datos
- URL base desde environment.apiUrl
- Manejar estados de carga y error en el template
- NO usar CommonModule ni *ngIf, usar sintaxis moderna @if y @for
- Usar inject() en lugar del constructor para todas las dependencias

## Lineamientos de diseño
- Layout de 3 columnas iguales para las cards de estadísticas
- Card de tareas completadas con borde verde (border-success)
- Card de horas estimadas con borde celeste (border-info)
- Barra de progreso verde (bg-success) que muestra el porcentaje de completado
- Ancho máximo del contenedor: col-sm-4 por card
- Alerta de error en rojo (alert-danger)
- Spinner centrado mientras carga (text-center)
## Criterios 
- Dado que el backend no está disponible,
  cuando el usuario navega al resumen,
  entonces ve el mensaje "No se pudo conectar con el servidor."

- Dado que la URL contiene un projectId inválido (ej. /project/abc/summary),
  cuando el componente inicializa,
  entonces ve el mensaje "El ID del proyecto no es válido."
```