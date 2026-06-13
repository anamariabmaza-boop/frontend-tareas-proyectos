import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
imports: [RouterOutlet]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}