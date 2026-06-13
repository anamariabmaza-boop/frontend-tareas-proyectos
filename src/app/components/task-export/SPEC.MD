# SPEC: Exportar Tareas de un Proyecto a CSV

## Descripción general
El usuario puede exportar las tareas de un proyecto en formato CSV.
Al hacer clic en un botón, el sistema hace un request al backend
y descarga el archivo automáticamente en el navegador.

## Endpoints involucrados
- **GET** `/project/{projectId}/tasks/export`
- Response: 200 OK con array de strings (cada string es una línea del CSV)
- Error 404: proyecto no encontrado

## Restricciones de negocio
- El projectId viene desde la URL
- El backend devuelve un array de strings, no un archivo binario
- El frontend debe convertir ese array en un archivo descargable
- Si no hay tareas, el archivo puede estar vacío

## Lineamientos técnicos
- Standalone component
- Bootstrap 5 para estilos
- HttpClient con método exportTasks() en ProjectService
- El componente se llama TaskExportComponent en src/app/components/task-export/
- El projectId se lee desde la URL con inject(ActivatedRoute)
- URL base desde environment.apiUrl
- Usar inject() en lugar del constructor
- El archivo se descarga usando un elemento <a> dinámico con Blob

## Lineamientos de diseño
- Botón prominente "Exportar CSV" con ícono de descarga
- Spinner mientras se procesa la exportación
- Mensaje de éxito cuando la descarga se inicia
- Alerta de error en rojo si falla el request

## Criterios de aceptación
- Dado que el proyecto tiene tareas,
  cuando el usuario hace clic en "Exportar CSV",
  entonces el navegador descarga un archivo .csv con las tareas.

- Dado que el proyecto no existe,
  cuando el backend devuelve 404,
  entonces ve un mensaje de error indicando que el proyecto no fue encontrado.

- Dado que el backend no está disponible,
  cuando el usuario hace clic en exportar,
  entonces ve el mensaje "No se pudo conectar con el servidor."

## Prompt utilizado
Agente: Claude (claude.ai)
[El prompt se documentará antes del primer commit de código]