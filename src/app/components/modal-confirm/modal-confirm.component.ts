import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

export interface DialogData {
  mensaje: string;
}
@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [MatSelectModule ,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.css'
})
export class ModalConfirmComponent {
  readonly dialogRef = inject(MatDialogRef<ModalConfirmComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly ok = model(this.data.animal);
  readonly ok = model(this.data);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
