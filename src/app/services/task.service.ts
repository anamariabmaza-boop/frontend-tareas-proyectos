import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: number;
  title: string;
  estimateHours: number;
  assignee: string;
  status: TaskStatus;
  finishedAt: string | null;
  createdAt: string;
}

export interface TaskError {
  status: number;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getTasksByStatus(projectId: number, status: TaskStatus): Observable<Task[]> {
    const params = new HttpParams().set('status', status);
    return this.http
      .get<Task[]>(`${this.apiUrl}/project/${projectId}/tasks`, { params })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let taskError: TaskError;

    if (error.status === 404) {
      taskError = { status: 404, message: 'Proyecto no encontrado.' };
    } else if (error.status === 400) {
      taskError = { status: 400, message: 'Estado de tarea inválido.' };
    } else if (error.status === 0) {
      taskError = { status: 0, message: 'No se pudo conectar con el servidor.' };
    } else {
      taskError = { status: error.status, message: 'Ocurrió un error al cargar las tareas.' };
    }

    return throwError(() => taskError);
  }
}