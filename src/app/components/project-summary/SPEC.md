# SPEC: Ver Resumen de un Proyecto

## Descripción general
El usuario puede ver un resumen estadístico de un proyecto existente.
Muestra el total de tareas, cuántas están completadas y el total
de horas estimadas. Es una vista de solo lectura.

## Endpoints involucrados
- **GET** `http://localhost:8080/project/{projectId}/summary`
- Response: 200 OK con `{ totalTasks, doneTasks, totalEstimateHours }`
- Error 404: proyecto no encontrado

## Restricciones de negocio
- El projectId viene desde la URL
- Es una vista de solo lectura, no hay formulario
- Si el proyecto no tiene tareas, los valores deben mostrar 0

## Lineamientos técnicos
- Standalone component
- Bootstrap 5 para estilos
- HttpClient con ProjectService ya existente (agregar método getSummary)
- El componente se llama ProjectSummaryComponent en src/app/components/project-summary/
- El projectId se recibe como parámetro de la URL usando ActivatedRoute
- Manejar estados de carga y error en el template

## Criterios de aceptación
- Dado que el proyecto existe,
  cuando el usuario navega a /project/2/summary,
  entonces ve el total de tareas, tareas completadas y horas estimadas.

- Dado que el proyecto no existe,
  cuando el backend devuelve 404,
  entonces ve un mensaje de error indicando que el proyecto no fue encontrado.

- Dado que el proyecto no tiene tareas,
  cuando el usuario navega al resumen,
  entonces ve los valores en 0.