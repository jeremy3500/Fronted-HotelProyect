import { ResponseUsuario } from "./ResponseUsuario";

export interface ResponseAcceso{
     isSuccess:boolean,
     token:string,
     detail: Array<ResponseUsuario>
}