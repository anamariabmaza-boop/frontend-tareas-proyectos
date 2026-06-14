import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'CLOSED';

export interface CreateProjectRequest {
  name: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  description?: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  description?: string;
}

export interface ProjectApiError {
  type: 'DUPLICATE_NAME' | 'INVALID_DATA' | 'UNKNOWN';
  message: string;
}

export interface ProjectSummary {
  idProject: number;
  nameProject: string;
  totalTask: number;
  doneTask: number;
  totalEstimateHours: number;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  createProject(payload: CreateProjectRequest): Observable<ProjectResponse> {
    return this.http
      .post<ProjectResponse>(`${this.baseUrl}/project`, payload)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  getSummary(projectId: number): Observable<ProjectSummary> {
    return this.http.get<ProjectSummary>(
      `${this.baseUrl}/project/${projectId}/summary`
    );
  }

  exportTasks(projectId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.baseUrl}/project/${projectId}/tasks/export`
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 409) {
      return throwError(() => ({
        type: 'DUPLICATE_NAME',
        message: 'Ya existe un proyecto con ese nombre. Por favor, elige otro.'
      }));
    }
    if (error.status === 400) {
      return throwError(() => ({
        type: 'INVALID_DATA',
        message: 'Los datos enviados son inválidos. Revisá el formulario.'
      }));
    }
    return throwError(() => ({
      type: 'UNKNOWN',
      message: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.'
    }));
  }
}