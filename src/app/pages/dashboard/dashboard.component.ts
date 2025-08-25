import { Component, AfterViewInit, OnInit, inject  } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js';
import { ReservaService } from '../../services/Reserva.service';
import { ResponseDashboard } from '../../interfaces/ResponseDashboard';
import { Dashboard } from '../../interfaces/Dashboard';
import { DataGrafic } from '../../interfaces/DataGrafic';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, MatCardModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  cantTotalResrv = 0
  cantTotalResrvPros = 0

  // CANTIDAD FINAL  INGRESO - CLIENTE - RESERVA
  dataReserva: DataGrafic[] = [];
  numerosFinales: number[] = [];
  numerosActuales: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

  ngOnInit(): void {
    this.numerosFinales.forEach((numero, index) => {
      this.incrementarNumero(numero, index);
    });
  }


  incrementarNumero(numeroFinal: number, index: number): void {
    const incremento = Math.ceil(numeroFinal / 50); // Velocidad del incremento
    const intervalo = setInterval(() => {
      this.numerosActuales[index] += incremento;
      if (this.numerosActuales[index] >= numeroFinal) {
        this.numerosActuales[index] = numeroFinal; // Asegura que no exceda el número final
        clearInterval(intervalo);
      }
    }, 50); // Tiempo entre incrementos en milisegundos
  }


  private DashboardService = inject(ReservaService)
    
  //public displayedColumns: string[] = ['id', 'fecha_inicio', 'fecha_fin', 'monto_total', 'numero_habitacion', 'tipo_habitacion'];
  
  constructor() {
    this.DashboardService.getDataDashboard().subscribe({
      next: (data) => {
        let datos = data.value[0];
        this.numerosFinales[0] = datos.individual
        this.numerosFinales[1] = datos.doble
        this.numerosFinales[2] = datos.suit
        this.numerosFinales[3] = datos.reservas_en_proceso
        this.numerosFinales[4] = datos.reservas_pendientes
        this.numerosFinales[5] = datos.ingresos
        this.numerosFinales[6] = datos.ingresos_pendientes
        this.numerosFinales[7] = datos.cant_clientes
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err.message);
      }
    })

    this.DashboardService.getDataGrafic().subscribe({
      next: (data) => {
        this.dataReserva = data.value;
        for (let data of this.dataReserva){
          this.cantTotalResrv += data.reservado
          this.cantTotalResrvPros += data.procesado
        }
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }
}
