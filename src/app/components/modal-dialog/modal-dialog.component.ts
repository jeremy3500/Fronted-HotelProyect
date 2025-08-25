import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

export interface DialogData {
  reserva: string;
  cliente: string;
  dni: string;
  habitacion: string;
  fech_ini: string;
  fech_fin: string;
  monto: string;
  estado: string;
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [ MatSelectModule ,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css'
})

export class ModalDialogComponent {
  
  selectedValue: string = '';

  foods: Food[] = [
    {value: 'Pendiente', viewValue: 'Pendiente'},
    {value: 'En Proceso', viewValue: 'En Proceso'},
    {value: 'Finalizado', viewValue: 'Finalizado'},
    {value: 'Cancelado', viewValue: 'Cancelado'},
  ];

  readonly dialogRef = inject(MatDialogRef<ModalDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly ok = model(this.data.animal);
  readonly ok = model(this.data);

  onNoClick(): void {
    this.dialogRef.close();
  }
}


