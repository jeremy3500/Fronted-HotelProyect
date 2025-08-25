import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { ReservaService } from '../../services/Reserva.service';
import { Reserva } from '../../interfaces/Reserva';
import { splitNsName } from '@angular/compiler';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent {
  private ReservaService = inject(ReservaService)
  public listaReserva: Reserva[] = []
  //public displayedColumns: string[] = ['id', 'fecha_inicio', 'fecha_fin', 'monto_total', 'numero_habitacion', 'tipo_habitacion'];
  
  constructor() {
    this.ReservaService.lista().subscribe({
      next: (data) => {
        if (data.value.length > 0) {
          this.listaReserva = data.value;
        }
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  formatearFecha(fecha: string): string {
    return fecha.split('T')[0] + " " + fecha.split('T')[1];
  }

  getFormattedId(id: string): string {
    return id.padStart(3, '0');
  }
}
