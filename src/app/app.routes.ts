import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { authGuard } from './custom/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { Component } from '@angular/core';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { RealizarReservaComponent } from './pages/realizar-reserva/realizar-reserva.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { ListaReservasComponent } from './pages/lista-reservas/lista-reservas.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';

export const routes: Routes = [
     {path:"", component:LoginComponent},
     {path:"registro", component:RegistroComponent},
     {
          path:"home", component:HomeComponent , canActivate:[authGuard],
          children:[
               {path:"", component:InicioComponent},
               {path:"inicio", component:InicioComponent},
               {path:"ubicanos", component:UbicanosComponent},
               {
                    path:"reserva", component:ReservasComponent,
                    children:[
                         {path:"", component:MisReservasComponent},
                         {path:"mis-reservas", component:MisReservasComponent},
                         {path:"realizar-reservas", component:RealizarReservaComponent}
                    ]
               }, // localStorage.getItem("IdUser") == 1
               {path:"list-usuarios", component:ListaUsuariosComponent},
               {path:"list-reservas", component:ListaReservasComponent},
               {path:"dashboard", component:DashboardComponent, canActivate:[authGuard]},
          ]
     }
];
