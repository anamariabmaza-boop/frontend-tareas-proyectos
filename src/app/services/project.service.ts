import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ProjectSummary {
  totalTasks: number;
  doneTasks: number;
  totalEstimateHours: number;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);

  getSummary(projectId: number): Observable<ProjectSummary> {
    return this.http.get<ProjectSummary>(
      `${environment.apiUrl}/project/${projectId}/summary`
    );
  }

  exportTasks(projectId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.apiUrl}/project/${projectId}/tasks/export`
    );
  }
}