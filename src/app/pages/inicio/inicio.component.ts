import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon';

@Component({
     selector: 'app-inicio',
     standalone: true,
     imports: [MatIconModule, MatCardModule, MatTableModule],
     templateUrl: './inicio.component.html',
     styleUrl: './inicio.component.css'
})
export class InicioComponent {

     constructor() {
          
     }

}
