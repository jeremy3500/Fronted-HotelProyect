import { Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { InicioComponent } from '../inicio/inicio.component';
import { ReservasComponent } from '../reservas/reservas.component';
import { RouterOutlet } from '@angular/router';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatTableModule, RouterOutlet], //InicioComponent, ReservasComponent,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title: string = 'Cliente';  // Título inicial
  NombreUsuario: string = '';
  esAdministrador: boolean = false;
  private router = inject(Router);

  private AccesoService = inject(AccesoService);

  ngOnInit(): void {
    this.AccesoService.getDataUser(Number(localStorage.getItem("IdUser"))).subscribe({
      next: (data) => {
        if (data.detail[0].id_Perfil == 1) {
          this.title = 'Modulo Administrador';
          this.esAdministrador = true;
        }
        this.NombreUsuario = data.detail[0].nombres;
      },
      error: (err) => {
        console.log(err.message);
      }
    });
    // Cambia el título
  }


  cerrarSesion() {
    localStorage.setItem("token", '')
    localStorage.setItem("IdUser", '')
    this.router.navigate(['/'])
  }


  inicio() {
    this.router.navigate(['/home/inicio'])
  }
  reserva() {
    this.router.navigate(['/home/reserva'])
  }
  contacto() {
    this.router.navigate(['/home/ubicanos'])
  }

  dirig_listuser(){
    this.router.navigate(['/home/list-usuarios'])
  }
  dirig_listreserv(){
    this.router.navigate(['/home/list-reservas'])
  }
  dirig_dashboard(){
    this.router.navigate(['/home/dashboard'])
  }


  selectedLink: string = ''; // Variable para guardar el enlace seleccionado

  // Función para seleccionar un enlace
  selectLink(link: string) {
    this.selectedLink = link; // Cambiar el enlace seleccionado
  }
}
