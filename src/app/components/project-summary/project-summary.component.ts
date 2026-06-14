import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProjectService, ProjectSummary } from '../../services/project.service';

@Component({
  selector: 'app-project-summary',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './project-summary.component.html',
})
export class ProjectSummaryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  summary: ProjectSummary | null = null;
  loading = false;
  error: string | null = null;

  get progressPercentage(): number {
    if (!this.summary || this.summary.totalTask === 0) return 0;
    return (this.summary.doneTask / this.summary.totalTask) * 100;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('projectId');

    if (!idParam || isNaN(Number(idParam))) {
      this.error = 'El ID del proyecto no es válido.';
      return;
    }

    const projectId = Number(idParam);
    this.loading = true;
    this.error = null;

    this.projectService.getSummary(projectId).subscribe({
      next: (data) => {
        this.summary = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 404) {
          this.error = 'Proyecto no encontrado.';
        } else if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor.';
        } else {
          this.error = 'Ocurrió un error al cargar el resumen.';
        }
      },
    });
  }
}