import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ─── Interfaces ───────────────────────────────────────────────────────────────
// Tipamos exactamente lo que devuelve el backend.
// TypeScript usará esto para autocompletado y detección de errores.

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: number;
  title: string;
  estimateHours: number;
  assignee: string;
  status: TaskStatus;
  finishedAt: string | null; // null si la tarea no está terminada
  createdAt: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────
// @Injectable({ providedIn: 'root' }) registra el servicio en el inyector raíz,
// lo que significa que Angular crea UNA sola instancia para toda la app
// (patrón Singleton). No hace falta declararlo en ningún módulo.
@Injectable({ providedIn: 'root' })
export class TaskService {
  // inject() es la forma moderna de inyectar dependencias en Angular 14+.
  // Equivale a declarar "private http: HttpClient" en el constructor,
  // pero funciona fuera de constructores también (en signals, funciones, etc.).
  private http = inject(HttpClient);

  // La URL base viene del archivo environment, así en producción
  // solo cambiás environment.ts sin tocar el código.
  private apiUrl = environment.apiUrl;

  /**
   * Obtiene las tareas de un proyecto filtradas por estado.
   *
   * @param projectId - ID del proyecto (viene de la URL)
   * @param status    - Estado a filtrar: TODO | IN_PROGRESS | DONE
   * @returns Observable<Task[]> — Angular lo maneja de forma reactiva.
   *          El componente se suscribe con subscribe() o el pipe async.
   */
  getTasksByStatus(projectId: number, status: TaskStatus): Observable<Task[]> {
    // HttpParams construye el query string de forma segura (?status=TODO).
    // Nunca concatenes strings a mano para los query params.
    const params = new HttpParams().set('status', status);

    return this.http.get<Task[]>(
      `${this.apiUrl}/project/${projectId}/tasks`,
      { params }
    );
  }
}