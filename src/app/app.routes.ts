import { Routes } from '@angular/router';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskExportComponent } from './components/task-export/task-export.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: 'project/:projectId/summary', component: ProjectSummaryComponent },
  { path: 'project/:projectId/tasks/create', component: CreateTaskComponent },
  { path: 'project/:projectId/export', component: TaskExportComponent },
  { path: 'project/:projectId/tasks', component: TaskListComponent },
  { path: '', redirectTo: 'project/2/tasks', pathMatch: 'full' }
];