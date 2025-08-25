import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { ReservaService } from '../../services/Reserva.service';
import { Reserva } from '../../interfaces/Reserva';
import { Usuario } from '../../interfaces/Usuario';
import { ResponseUsuario } from '../../interfaces/ResponseUsuario';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {

  private ReservaService = inject(ReservaService)
  public listaUsuario: ResponseUsuario[] = []

  constructor() {
    this.ReservaService.getListaUsuarios().subscribe({

      next: (data) => {
        if (data.detail.length > 0) {
          this.listaUsuario = data.detail;
        }
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  formatearFecha(fecha: string): string {
    return fecha.split('T')[0];
  }

}
