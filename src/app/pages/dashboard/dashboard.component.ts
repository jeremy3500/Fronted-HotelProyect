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
  numerosActuales: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
        this.numerosFinales[0] = datos.INDIVIDUAL
        this.numerosFinales[1] = datos.DOBLE
        this.numerosFinales[2] = datos.FAMILIAR
        this.numerosFinales[3] = datos.SUIT
        this.numerosFinales[4] = datos.RESERVAS_EN_PROCESO
        this.numerosFinales[5] = datos.RESERVAS_PENDIENTES
        this.numerosFinales[6] = datos.INGRESOS
        this.numerosFinales[7] = datos.INGRESOS_PENDIENTES
        this.numerosFinales[8] = datos.CANT_CLIENTES
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err.message);
      }
    })
    debugger
    this.DashboardService.getDataGrafic().subscribe({
      next: (data) => {
        this.dataReserva = data.value;
        for (let data of this.dataReserva){
          this.cantTotalResrv += data.RESERVADO
          this.cantTotalResrvPros += data.PROCESADO
        }
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }
}
