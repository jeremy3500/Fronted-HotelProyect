import { Component, inject, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

     private accesoService = inject(AccesoService);
     private router = inject(Router);
     public formBuild = inject(FormBuilder);

     public formRegistro: FormGroup = this.formBuild.group({
          nombre: ['',Validators.required],
          correo: ['',Validators.required],
          clave: ['',Validators.required],
          dni: ['',Validators.required],
     })


     readonly dialog = inject(MatDialog);
     registrarse(){
          if(this.formRegistro.invalid) return;

          const objeto:Usuario = {
               nombre: this.formRegistro.value.nombre,
               correo: this.formRegistro.value.correo,
               clave: this.formRegistro.value.clave,
               dni: this.formRegistro.value.dni
          }

          this.accesoService.registrarse(objeto).subscribe({
               next: (data) =>{
                    if(data.isSuccess){
                         let wData = data.detail
                         localStorage.setItem("token",data.token)
                         localStorage.setItem("IdUser",wData[0].id.toString())
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


}
