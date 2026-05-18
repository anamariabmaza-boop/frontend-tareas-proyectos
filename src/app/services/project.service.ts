import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'CLOSED';

export interface CreateProjectRequest {
  name: string;
  startDate: string;   // formato ISO: 'YYYY-MM-DD'
  endDate: string;     // formato ISO: 'YYYY-MM-DD'
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

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Angular 21: HttpClient está provisto en el root injector por defecto.
  // No necesitás agregar provideHttpClient() en app.config.ts.
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  createProject(payload: CreateProjectRequest): Observable<ProjectResponse> {
    return this.http
      .post<ProjectResponse>(`${this.baseUrl}/project`, payload)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let apiError: ProjectApiError;

    if (error.status === 409) {
      apiError = {
        type: 'DUPLICATE_NAME',
        message: 'Ya existe un proyecto con ese nombre. Por favor, elige otro.'
      };
    } else if (error.status === 400) {
      apiError = {
        type: 'INVALID_DATA',
        message: 'Los datos enviados son inválidos. Revisá el formulario.'
      };
    } else {
      apiError = {
        type: 'UNKNOWN',
        message: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.'
      };
    }

    return throwError(() => apiError);
  }
}