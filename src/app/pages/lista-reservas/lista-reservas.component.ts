import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { ReservaService } from '../../services/Reserva.service';
import { Reserva } from '../../interfaces/Reserva';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { ModificReservaRequests } from '../../interfaces/ModificReservaRequests';
import { Router } from '@angular/router';
import { ModalDialogBusqComponent } from '../../components/modal-dialog-busq/modal-dialog-busq.component';
import { ModalViewInfComponent } from '../../components/modal-view-inf/modal-view-inf.component';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, MatButtonModule],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})


export class ListaReservasComponent {
  private router = inject(Router);
  private ReservaService = inject(ReservaService)
  public listaReserva: Reserva[] = []
  //public displayedColumns: string[] = ['id', 'fecha_inicio', 'fecha_fin', 'monto_total', 'numero_habitacion', 'tipo_habitacion'];

  constructor() {
    this.ReservaService.getListaReservasAll().subscribe({
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
    let wFecha = fecha.split('T');
    let wHora = wFecha[1].split(':');
    return wFecha[0] + " " + wHora[0] + ":" + wHora[1];
  }


  readonly dialog = inject(MatDialog);

  openDialog(res: any): void {

    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        reserva: res.id,
        cliente: res.cliente,
        dni: res.dni,
        habitacion: res.numero_habitacion,
        fech_ini: this.formatearFecha(res.fecha_inicio.toString()) + " PM",
        fech_fin: this.formatearFecha(res.fecha_fin.toString()) + " PM",
        monto: res.monto_total,
        estado: res.estado
      },
    }); // this.formatearFecha(res.fech_ini.toString())

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        const objeto: ModificReservaRequests = {
          id_reserva: result.reserva,
          estado_reserva: result.estado
        }
        this.ReservaService.modificarReserva(objeto).subscribe({
          next: (data) => {
            window.location.reload();
          },
          error: (err) => {
            console.log(err.message);
          }
        });
      }
    });
  }

  getFormattedId(id: string): string {
    return id.padStart(3, '0');
  }

  actualizar(): void {
    window.location.reload();
  }

  buscarReserva(): void {
    const dialogRef = this.dialog.open(ModalDialogBusqComponent, {
      data: {
        data: { codigo: '' },
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        let exist = false
        for (let reserva of this.listaReserva) {
          if (reserva.id == result) {
            this.openDialog(reserva)
            exist = true
            break
          }
        }

        if (!exist) {
          const dialogRef = this.dialog.open(ModalViewInfComponent, {
            data: {
              mensaje: "No existe una reserva con ese codigo."
            },
          });
        }

      }
    });
  }

}

export interface DialogData {
  codigo: string;
}

