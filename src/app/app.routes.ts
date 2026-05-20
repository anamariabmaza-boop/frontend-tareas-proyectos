import { Routes } from '@angular/router';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';

export const routes: Routes = [
  {
    path: 'project/:projectId/summary',
    component: ProjectSummaryComponent
  },
  {
    path: '',
    redirectTo: 'project/2/summary',
    pathMatch: 'full'
  }
];