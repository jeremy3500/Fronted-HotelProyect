import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalViewInfComponent } from '../../components/modal-view-inf/modal-view-inf.component';

@Component({
     selector: 'app-login',
     standalone: true,
     imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
     templateUrl: './login.component.html',
     styleUrl: './login.component.css'
})
export class LoginComponent {

     private accesoService = inject(AccesoService);
     private router = inject(Router);
     public formBuild = inject(FormBuilder);

     public formLogin: FormGroup = this.formBuild.group({
          correo: ['', Validators.required],
          clave: ['', Validators.required]
     })

     
     readonly dialog = inject(MatDialog);
     iniciarSesion() {
          if (this.formLogin.invalid) return;

          const objeto: Login = {
               correo: this.formLogin.value.correo,
               clave: this.formLogin.value.clave
          }
          this.accesoService.login(objeto).subscribe({
               next: (data) => {
                    if (data.isSuccess) {

                         let wData = data.detail
                         localStorage.setItem("token", data.token)
                         localStorage.setItem("IdUser", wData[0].id.toString())
                         localStorage.setItem("IdPerfil", wData[0].id_Perfil.toString())
                         this.router.navigate(['home'])
                    } else {
                         const dialogRef = this.dialog.open(ModalViewInfComponent, {
                              data: {
                                   mensaje: "Las credenciales ingresadas son incorrectas."
                              },
                         });
                         // alert("Credenciales son incorrectas")
                    }
               },
               error: (error) => {
                    console.log(error.message);
               }
          })
     }

     registrarse() {
          this.router.navigate(['registro'])
     }
}
