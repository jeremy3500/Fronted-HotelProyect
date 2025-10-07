import { ResponseUsuario } from "./ResponseUsuario";

export interface ResponseAcceso{
     success:boolean,
     message:string,
     token:string,
     detail: Array<ResponseUsuario>
}