import { Routes } from '@angular/router';
import { CreateProjectComponent } from './components/create-project/create-projects.component';

export const routes: Routes = [
  { path: 'proyectos/crear', component: CreateProjectComponent },
  { path: '', redirectTo: 'proyectos/crear', pathMatch: 'full' }
];