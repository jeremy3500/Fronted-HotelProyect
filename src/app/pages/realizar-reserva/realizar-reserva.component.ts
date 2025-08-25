import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { ReservaService } from '../../services/Reserva.service';
import { Habitacion } from '../../interfaces/Habitacion';
import { SolitHabitacionRequests } from '../../interfaces/SolitHabitacionRequests';
import { InsertReservaRequests } from '../../interfaces/InsertReservaRequests';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { ModalViewInfComponent } from '../../components/modal-view-inf/modal-view-inf.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-realizar-reserva',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  imports: [MatCardModule, MatTableModule, CommonModule, MatSelectModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './realizar-reserva.component.html',
  styleUrl: './realizar-reserva.component.css'
})

export class RealizarReservaComponent {
  today: Date = new Date();
  selectedValue: string = '';

  tipo_habitacion: Food[] = [
    { value: 'Individual', viewValue: 'Individual' },
    { value: 'Doble', viewValue: 'Doble' },
    { value: 'Suite', viewValue: 'Suite' },
  ];

  private router = inject(Router);
  public formBuild = inject(FormBuilder);


  public formHabitaciones: FormGroup = this.formBuild.group({
    tipoHab: ['', Validators.required],
    fechaIni: ['', Validators.required],
    fechaFin: ['', Validators.required]
  });

  public formReservas: FormGroup = this.formBuild.group({
    codHabitacion: ['', Validators.required]
  });


  constructor(private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.formHabitaciones = this.fb.group({
      tipoHabitacion: [''],
      fechaInicio: [''],
      fechaFin: ['']
    });
    this.formReservas = this.fb.group({
      codHabitacion: ['']
    });
  }

  private ReservaService = inject(ReservaService);
  public listaHabitacion: Habitacion[] = [];

  verHabitaciones() {
    if (this.formHabitaciones.valid) {
      const objeto: SolitHabitacionRequests = this.returnobjHabit();
      if (objeto.fecha_inicio > objeto.fecha_fin) {
        const dialogRef = this.dialog.open(ModalViewInfComponent, {
          data: {
            mensaje: "La fecha de inicio no puede ser mayor a la fecha de salida."
          },
        });
      }
      
      // let fechHoy = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      // if (!fechHoy) { return; }
      
      // else if (objeto.fecha_inicio < fechHoy) {
      //   const dialogRef = this.dialog.open(ModalViewInfComponent, {
      //     data: {
      //       mensaje: "La fecha de inicio no puede ser menor a la fecha de hoy."
      //     },
      //   });
      // }
      else {
        this.ReservaService.listaHabitacion(objeto).subscribe({
          next: (data) => {
            console.log('Datos recibidos:', data);
            
            if (data.habitaciones.length > 0) {
              this.listaHabitacion = data.habitaciones;
            }
          },
          error: (err) => {
            console.log(err.message);
          }
        });
      }

    } else {
      console.log('Formulario inválido');
    }
  }


  formatearFecha(fecha: string): string {
    return fecha.split('T')[0];
  }

  returnobjHabit(): SolitHabitacionRequests {
    const reservaData = this.formHabitaciones.value;
    // Formatear la fecha usando DatePipe
    const fechaInicioFormateada = this.datePipe.transform(reservaData.fechaInicio, 'yyyy-MM-dd');
    const fechaFinFormateada = this.datePipe.transform(reservaData.fechaFin, 'yyyy-MM-dd');

    if (!fechaInicioFormateada || !fechaFinFormateada) {
      console.error('Error al formatear las fechas');
      return {} as SolitHabitacionRequests;
    }

    const objeto: SolitHabitacionRequests = {
      fecha_inicio: fechaInicioFormateada,
      fecha_fin: fechaFinFormateada,
      tipo_habitacion: reservaData.tipoHabitacion
    }
    return objeto;
  }

  limpiarCampos(): void {
    this.formHabitaciones.reset();  // Limpia el formulario de habitaciones
    this.formReservas.reset();      // Limpia el formulario de reservas
    this.listaHabitacion = [];
  }

  readonly dialog = inject(MatDialog);
  realizarReserva(habit: any): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        mensaje: "Seguro que desea realizar la reserva?"
      },
    }); // this.formatearFecha(res.fech_ini.toString())

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        const objetoHabit: SolitHabitacionRequests = this.returnobjHabit();

        const objeto: InsertReservaRequests = {
          id_usuario: Number(localStorage.getItem("IdUser")),
          id_habitacion: habit.id,
          fecha_inicio: objetoHabit.fecha_inicio,
          fecha_fin: objetoHabit.fecha_fin
        }
        this.ReservaService.realizarReserva(objeto).subscribe({
          next: (data) => {
            console.log('Datos recibidos:', data);
            if (data.isSuccess) {
              this.limpiarCampos();
              // alert("Reserva realizada con exito.");
            }
          },
          error: (err) => {
            console.log(err.message);
          }
        });

      }
    });
  }

}
