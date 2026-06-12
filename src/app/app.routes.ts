import { Routes } from '@angular/router';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

export const routes: Routes = [
  {
    path: 'project/:projectId/summary',
    component: ProjectSummaryComponent
  },
  {
    path: 'projects/:projectId/tasks/create',
    component: CreateTaskComponent
  },
  {
    path: '',
    redirectTo: 'proyectos/crear',
    pathMatch: 'full'
  }

];