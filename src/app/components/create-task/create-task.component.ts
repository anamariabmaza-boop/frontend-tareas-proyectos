import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, TaskResponse, TaskError } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  projectId!: number;
  taskForm!: FormGroup;

  // Estados de la UI
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  createdTask: TaskResponse | null = null;

  readonly statusOptions = [
    { value: 'TODO', label: 'Por hacer' },
    { value: 'IN_PROGRESS', label: 'En progreso' },
    { value: 'DONE', label: 'Finalizada' },
  ];

  ngOnInit(): void {
    // Leer el projectId desde la URL: /projects/:projectId/tasks/create
    const idParam = this.route.snapshot.paramMap.get('projectId');
    this.projectId = Number(idParam);

    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      estimateHours: [null, [Validators.required, Validators.min(0.1)]],
      assignee: [''],
      status: ['TODO', Validators.required],
    });
  }

  // Getters para acceder fácilmente a los controles en el template
  get title() { return this.taskForm.get('title')!; }
  get estimateHours() { return this.taskForm.get('estimateHours')!; }
  get assignee() { return this.taskForm.get('assignee')!; }
  get status() { return this.taskForm.get('status')!; }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched(); // Muestra errores en todos los campos
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;
    this.createdTask = null;

    const { title, estimateHours, assignee, status } = this.taskForm.value;

    this.taskService
      .createTask(this.projectId, {
        title,
        estimateHours: Number(estimateHours),
        assignee: assignee || undefined,
        status,
      })
      .subscribe({
        next: (task: TaskResponse) => {
          this.isLoading = false;
          this.createdTask = task;
          this.successMessage = `¡Tarea "${task.title}" creada exitosamente!`;
          this.taskForm.reset({ status: 'TODO' });
        },
        error: (err: TaskError) => {
          this.isLoading = false;
          this.errorMessage = err.message;
        },
      });
  }

  onReset(): void {
    this.taskForm.reset({ status: 'TODO' });
    this.successMessage = null;
    this.errorMessage = null;
    this.createdTask = null;
  }
}