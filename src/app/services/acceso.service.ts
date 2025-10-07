import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Usuario } from '../interfaces/Usuario';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';
import { Login } from '../interfaces/Login';
import { ResponseUsuario } from '../interfaces/ResponseUsuario';
import { ResponseDataUsuario } from '../interfaces/ResponseDataUsuario';

@Injectable({
     providedIn: 'root'
})
export class AccesoService {

     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;

     constructor() { }

     registrarse(objeto: Usuario): Observable<ResponseAcceso> {
          return this.http.post<ResponseAcceso>(`${this.baseUrl}Acceso/REGISTER`, objeto)
     }

     login(objeto: Login): Observable<ResponseAcceso> {
          return this.http.post<ResponseAcceso>(`${this.baseUrl}Acceso/LOGIN`, objeto)
     }

     validarToken(token: string): Observable<ResponseAcceso> {
          return this.http.get<ResponseAcceso>(`${this.baseUrl}Acceso/VALIDATION_TOKEN?token=${token}`)
     }

     getDataUser(idUsuario: number): Observable<ResponseDataUsuario> {
          return this.http.get<ResponseDataUsuario>(`${this.baseUrl}Acceso/GET_USER_BY_ID?Id=${idUsuario}`)
     }
}
