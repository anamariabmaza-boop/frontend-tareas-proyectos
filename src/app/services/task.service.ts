import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
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

export interface CreateTaskRequest {
  title: string;
  estimateHours: number;
  assignee?: string;
  status: TaskStatus;
}

export interface TaskResponse {
  id: number;
  title: string;
  estimateHours: number;
  assignee?: string;
  status: TaskStatus;
  finishedAt?: string;
  createdAt: string;
}

export interface TaskError {
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getTasksByStatus(
    projectId: number,
    status: TaskStatus
  ): Observable<Task[]> {
    const params = new HttpParams().set('status', status);

    return this.http.get<Task[]>(
      `${this.baseUrl}/project/${projectId}/tasks`,
      { params }
    );
  }

  createTask(
    projectId: number,
    task: CreateTaskRequest
  ): Observable<TaskResponse> {
    return this.http
      .post<TaskResponse>(`${this.baseUrl}/project/${projectId}/task`, task)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Ocurrió un error inesperado.';

    if (error.status === 400) {
      message = 'Datos inválidos. Revisá los campos del formulario.';
    } else if (error.status === 404) {
      message = 'Proyecto no encontrado.';
    } else if (error.status === 409) {
      message =
        'No se pueden agregar tareas: el proyecto está CERRADO (CLOSED).';
    } else if (error.status === 0) {
      message =
        'No se pudo conectar con el servidor. Verificá que el backend esté corriendo.';
    }

    return throwError(() => ({ status: error.status, message } as TaskError));
  }
}