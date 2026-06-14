import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-export',
  standalone: true,
  imports: [],
  templateUrl: './task-export.component.html',
})
export class TaskExportComponent {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  projectId = Number(this.route.snapshot.paramMap.get('projectId'));
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  exportTasks(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.projectService.exportTasks(this.projectId).subscribe({
      next: (lines: string[]) => {
        const csvContent = lines.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `tareas-proyecto-${this.projectId}.csv`;
        anchor.click();
        URL.revokeObjectURL(url);
        this.successMessage.set('Archivo CSV descargado correctamente.');
        this.loading.set(false);
      },
      error: (err: {status: number}) => {
        if (err.status === 404) {
          this.errorMessage.set('Proyecto no encontrado.');
        } else if (err.status === 0) {
          this.errorMessage.set('No se pudo conectar con el servidor.');
        } else {
          this.errorMessage.set('Error al exportar las tareas. Intentá de nuevo.');
        }
        this.loading.set(false);
      },
    });
  }
}