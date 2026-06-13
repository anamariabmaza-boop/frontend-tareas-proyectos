import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ProjectSummary {
  totalTasks: number;
  doneTasks: number;
  totalEstimateHours: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getSummary(projectId: number): Observable<ProjectSummary> {
    return this.http
      .get<ProjectSummary>(`${this.baseUrl}/project/${projectId}/summary`)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => ({ status: error.status }));
  }
}