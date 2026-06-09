import { Routes } from '@angular/router';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';

export const routes: Routes = [
  {
    path: 'project/:projectId/summary',
    component: ProjectSummaryComponent
  },
  { path: '', redirectTo: 'proyectos/crear', pathMatch: 'full' }
];