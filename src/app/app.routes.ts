import { Routes } from '@angular/router';
// import { CreateProjectComponent } from './components/create-project/create-projects.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

export const routes: Routes = [
  // { path: 'proyectos/crear', component: CreateProjectComponent },
  { path: 'projects/:projectId/tasks/create', component: CreateTaskComponent },
  { path: '', redirectTo: 'projects/1/tasks/create', pathMatch: 'full' }
];