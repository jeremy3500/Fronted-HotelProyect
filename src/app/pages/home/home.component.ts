import { Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
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
  botonActivo: string = ''; // por defecto
  private AccesoService = inject(AccesoService);

  ngOnInit(): void {
    this.AccesoService.getDataUser(Number(localStorage.getItem("IdUser"))).subscribe({
      next: (data) => {
        if (data.detail[0].ID_PERFIL == 1) {
          this.title = 'Administrador';
          this.esAdministrador = true;
        }
        this.NombreUsuario = data.detail[0].NOMBRES;
      },
      error: (err) => {
        console.log(err.message);
      }
    });

    this.botonActivo = localStorage.getItem('modulActiv') ?? '';
    // Cambia el título
  }
  

  setActivo(nombre: string) {
    this.botonActivo = nombre;
    localStorage.setItem("modulActiv", nombre)
    // Puedes también ejecutar otras acciones aquí
  }

  cerrarSesion() {
    localStorage.setItem("token", '')
    localStorage.setItem("IdUser", '')
    this.router.navigate(['/'])
  }


  inicio() {
    this.router.navigate(['/home/inicio'])
  }
  // reserva() {
  //   this.router.navigate(['/home/reserva'])
  // }
  mis_reserva() {
    this.router.navigate(['/home/mis-reservas'])
  }
  realizar_reserva() {
    this.router.navigate(['/home/realizar-reservas'])
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
