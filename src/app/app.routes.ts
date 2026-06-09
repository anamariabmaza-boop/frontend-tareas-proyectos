import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: 'project/:projectId/tasks', component: TaskListComponent },
  { path: '', redirectTo: 'project/2/tasks', pathMatch: 'full' }
];