import {
  Component,
  inject,
  signal,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {
  ProjectService,
  ProjectResponse,
  ProjectApiError
} from '../../services/project.service';
// ─── Validador de grupo: endDate >= startDate ──────────────────────────────────
function endDateAfterStartDate(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startDate')?.value;
  const end   = group.get('endDate')?.value;
  if (!start || !end) return null;
  return new Date(end) >= new Date(start) ? null : { endBeforeStart: true };
}

// ─── Validador de campo: endDate >= hoy ───────────────────────────────────────
function endDateNotInPast(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(control.value) >= today ? null : { endDateInPast: true };
}

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent {
  private readonly fb             = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  // Angular 21 – zoneless: ChangeDetectorRef.markForCheck() es necesario
  // para que la UI se actualice después de operaciones asíncronas (HTTP)
  // cuando se usan Reactive Forms, ya que no disparan CD automáticamente.
  private readonly cdr = inject(ChangeDetectorRef);

  // ── Estados de la UI con Signals (compatibles con zoneless) ───────────────
  isLoading       = signal(false);
  successMsg      = signal('');
  errorMsg        = signal('');
  createdProject  = signal<ProjectResponse | null>(null);

  // ── Opciones de estado del proyecto ───────────────────────────────────────
  readonly statusOptions: { value: string; label: string }[] = [
    { value: 'PLANNED', label: 'Planificado' },
    { value: 'ACTIVE',  label: 'Activo'      },
    { value: 'CLOSED',  label: 'Cerrado'     }
  ];

  // ── Formulario reactivo ────────────────────────────────────────────────────
  form: FormGroup = this.fb.group(
    {
      name:        ['', [Validators.required, Validators.maxLength(100)]],
      startDate:   ['', Validators.required],
      endDate:     ['', [Validators.required, endDateNotInPast]],
      status:      ['PLANNED', Validators.required],
      description: ['']
    },
    { validators: endDateAfterStartDate }
  );

  // ── Acceso rápido a los controles ──────────────────────────────────────────
  get f() { return this.form.controls; }

  // ── Helpers para mostrar errores ───────────────────────────────────────────
  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl.touched);
  }

  hasGroupError(error: string): boolean {
    return !!(
      this.form.errors?.[error] &&
      this.form.get('startDate')?.touched &&
      this.form.get('endDate')?.touched
    );
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.successMsg.set('');
    this.errorMsg.set('');
    this.createdProject.set(null);

    this.projectService.createProject(this.form.value).subscribe({
      next: (project) => {
        this.isLoading.set(false);
        this.createdProject.set(project);
        this.successMsg.set(`¡Proyecto "${project.name}" creado con éxito!`);
        this.form.reset({ status: 'PLANNED' });
        // Notifica al change detector tras la respuesta HTTP (requisito zoneless)
        this.cdr.markForCheck();
      },
      error: (err: ProjectApiError) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.message);

        if (err.type === 'DUPLICATE_NAME') {
          this.f['name'].setErrors({ duplicateName: true });
        }
        // Notifica al change detector tras el error HTTP (requisito zoneless)
        this.cdr.markForCheck();
      }
    });
  }

  onReset(): void {
    this.form.reset({ status: 'PLANNED' });
    this.successMsg.set('');
    this.errorMsg.set('');
    this.createdProject.set(null);
  }
}