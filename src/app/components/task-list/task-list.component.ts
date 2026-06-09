import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskService, TaskStatus } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);

  tasks = signal<Task[]>([]);
  selectedStatus = signal<TaskStatus>('TODO');
  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  projectId!: number;

  statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'TODO', label: 'Pendiente' },
    { value: 'IN_PROGRESS', label: 'En progreso' },
    { value: 'DONE', label: 'Completada' },
  ];

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.params['projectId'];
    this.loadTasks();
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedStatus.set(select.value as TaskStatus);
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.tasks.set([]);

    this.taskService.getTasksByStatus(this.projectId, this.selectedStatus()).subscribe({
      next: (data) => {
        this.tasks.set(data);
        this.loading.set(false);
      },
      error: (err: {status: number}) => {
        this.loading.set(false);
        if (err.status === 404) {
          this.errorMessage.set('Proyecto no encontrado.');
        } else if (err.status === 400) {
          this.errorMessage.set('Estado de tarea inválido.');
        } else {
          this.errorMessage.set('Ocurrió un error al cargar las tareas.');
        }
      },
    });
  }
}