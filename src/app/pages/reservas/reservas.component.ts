import { Component } from '@angular/core';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, RouterOutlet],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

}
