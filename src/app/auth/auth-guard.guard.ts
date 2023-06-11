import { inject } from "@angular/core";
import { GuardServiceService } from "./guard-service.service";
import { Router } from "@angular/router";
import { take, tap } from "rxjs";


export const AuthGuard = () => {

  const authService = inject(GuardServiceService);
  const router = inject(Router);

  return authService.isAuthenticated$().pipe(
    take(1),
    tap((isLoggedIn) => !isLoggedIn ? router.navigate(['login']) : true)
  );
}
