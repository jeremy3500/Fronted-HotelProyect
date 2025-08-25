import { Component, inject, model, signal } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


export interface DialogData {
  codigo: string;
}

@Component({
  selector: 'app-modal-dialog-busq',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,],
  templateUrl: './modal-dialog-busq.component.html',
  styleUrl: './modal-dialog-busq.component.css'
})

export class ModalDialogBusqComponent {
  readonly dialogRef = inject(MatDialogRef<ModalDialogBusqComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly ok = model(this.data.animal);
  readonly codigo = model(this.data.codigo);

  onNoClick(): void {
    this.dialogRef.close();
  }

}
