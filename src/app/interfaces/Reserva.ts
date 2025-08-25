import { Time } from "@angular/common";

export interface Reserva {
     id:number,
     fecha_inicio:string,
     fecha_fin:string,
     monto_total:number,
     numero_habitacion:number,
     tipo_habitacion:string,
     cliente:string,
     dni:string,
     estado:string,
}
