import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlsComponent } from './ui/controls/controls.component';
import { ChartsComponent } from './ui/charts/charts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ControlsComponent, ChartsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
