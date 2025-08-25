import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseReserva } from '../interfaces/ResponseReserva';
import { Observable } from 'rxjs';
import { ResponseHabitacion } from '../interfaces/ResponseHabitacion';
import { SolitHabitacionRequests } from '../interfaces/SolitHabitacionRequests';
import { ModificReservaRequests } from '../interfaces/ModificReservaRequests';
import { InsertReservaRequests } from '../interfaces/InsertReservaRequests';
import { ResponseNuevaReserva } from '../interfaces/ResponseNuevaReserva';
import { ResponseDataUsuario } from '../interfaces/ResponseDataUsuario';
import { ResponseDashboard } from '../interfaces/ResponseDashboard';
import { ResponseDataGrafic } from '../interfaces/ResponseDataGrafic';

@Injectable({
     providedIn: 'root'
})
export class ReservaService {
     private idUser = localStorage.getItem("IdUser")
     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;
     constructor() { }

     lista(): Observable<ResponseReserva> {
          return this.http.get<ResponseReserva>(`${this.baseUrl}Acceso/getReservas?Id=${this.idUser}`)
     }

     listaHabitacion(objeto: SolitHabitacionRequests): Observable<ResponseHabitacion> {
          return this.http.post<ResponseHabitacion>(`${this.baseUrl}Acceso/GetHabitaciones`, objeto)
     }

     realizarReserva(objeto: InsertReservaRequests): Observable<ResponseNuevaReserva> {
          return this.http.post<ResponseNuevaReserva>(`${this.baseUrl}Acceso/InsertReserva`, objeto)
     }

     getListaUsuarios(): Observable<ResponseDataUsuario> {
          return this.http.get<ResponseDataUsuario>(`${this.baseUrl}Acceso/getUsuariosList`)
     }

     getListaReservasAll(): Observable<ResponseReserva> {
          return this.http.get<ResponseReserva>(`${this.baseUrl}Acceso/getReservasList`)
     }

     modificarReserva(objeto: ModificReservaRequests): Observable<ResponseNuevaReserva> {
          return this.http.post<ResponseNuevaReserva>(`${this.baseUrl}Acceso/modificarReserva`, objeto)
     }

     getDataDashboard(): Observable<ResponseDashboard> {
          return this.http.get<ResponseDashboard>(`${this.baseUrl}Acceso/getDataDashboard`)
     }


     getDataGrafic(): Observable<ResponseDataGrafic> {
          return this.http.get<ResponseDataGrafic>(`${this.baseUrl}Acceso/getDatosGrafic`)
     }
}
