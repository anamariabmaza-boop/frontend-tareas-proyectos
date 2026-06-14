import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  taskProjectId = signal(2);
  summaryProjectId = signal(2);
  listProjectId = signal(2);
  exportProjectId = signal(2);

  onIdChange(event: Event, signalRef: ReturnType<typeof signal<number>>): void {
    const input = event.target as HTMLInputElement;
    signalRef.set(Number(input.value));
  }
}