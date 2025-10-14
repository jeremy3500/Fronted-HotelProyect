import { Component, inject, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Login } from '../../interfaces/Login';
import { ModalViewInfComponent } from '../../components/modal-view-inf/modal-view-inf.component';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

     private accesoService = inject(AccesoService);
     private router = inject(Router);
     public formBuild = inject(FormBuilder);

     regist: boolean = false;

     public formRegistro: FormGroup = this.formBuild.group({
          nombre: ['',Validators.required],
          apellidos: ['',Validators.required],
          telefono: ['',Validators.required],
          documento: ['',Validators.required],
          email: ['',Validators.required],
          password: ['',Validators.required],
     })

     ngOnInit(): void{
          this.regist = false
     }
     readonly dialog = inject(MatDialog);
     registrarse(){
          if(this.formRegistro.invalid) return;

          const objeto:Usuario = {
               ID_PERFIL: 2,
               NOMBRES: this.formRegistro.value.nombre,
               APELLIDOS: this.formRegistro.value.apellidos,
               TELEFONO: this.formRegistro.value.telefono,
               TIPO_DOCUMENTO_ID: 1,
               DOCUMENTO: this.formRegistro.value.documento,
               EMAIL: this.formRegistro.value.email,
               PASSWORD: this.formRegistro.value.password
          }

          this.accesoService.registrarse(objeto).subscribe({
               next: (data) =>{
                    if(data.success){
                         let wData = data.detail
                         localStorage.setItem("token",data.token)
                         localStorage.setItem("IdUser",wData[0].ID.toString())
                         this.router.navigate(['home'])
                    }else{
                         const dialogRef = this.dialog.open(ModalViewInfComponent, {
                              data: {
                                   mensaje: "Ya existe un usuario con estos datos."
                              },
                         });
                         // alert("El Usuario ya existe.")
                    }
               }, error:(error) =>{
                    console.log(error.message);
               }
          })

     }

     volver(){
          this.router.navigate([''])
     }

     continuar(){
          this.regist = true
     }
     Regresar(){
          this.regist = false
     }

     soloLetras(event: KeyboardEvent) {
          const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
          const inputChar = event.key;

          if (!pattern.test(inputChar)) {
          event.preventDefault(); // bloquea el carácter
          }
     }

     soloNumeros(event: KeyboardEvent) {
     const pattern = /^[0-9]+$/;
     const inputChar = event.key;

     // Permitir teclas especiales como borrar, tab, flechas
     if (
     event.key === 'Backspace' ||
     event.key === 'ArrowLeft' ||
     event.key === 'ArrowRight' ||
     event.key === 'Tab'
     ) {
     return;
     }

     // Si no es número, bloquea la entrada
     if (!pattern.test(inputChar)) {
     event.preventDefault();
     }
     }

}
