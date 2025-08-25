import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccesoService } from '../services/acceso.service';
import { catchError, map, of } from 'rxjs';
import { routes } from '../app.routes';

export const authGuard: CanActivateFn = (route, state: RouterStateSnapshot) => {
     const token = localStorage.getItem("token") || "";
     const router = inject(Router);

     const accesoService = inject(AccesoService)

     if (token != "") {
          return accesoService.validarToken(token).pipe(
               map(data => {
                    if (data.isSuccess) {
                         const idUser = localStorage.getItem("IdPerfil");
                         if (route.routeConfig != null) {
                              let ruta = state.url
                              debugger
                              if (ruta == '/home/list-usuarios' || ruta == '/home/list-reservas' || ruta == '/home/dashboard') {
                                   if (idUser == "1") {
                                        return true;
                                   }
                                   else {
                                        router.navigate(['/home'])
                                        return true;
                                   }
                              }
                              else {
                                   return true;
                              }
                         }
                         return true
                    } else {
                         router.navigate([''])
                         return false;
                    }
               }),
               catchError(error => {
                    router.navigate([''])
                    return of(false);
               })
          )
     } else {
          const url = router.createUrlTree([""])
          return url;
     }

};
