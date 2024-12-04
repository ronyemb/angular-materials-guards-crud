import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
   ) { }

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this,this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated =>  console.log('Aunthenticated', isAuthenticated)),
        tap( isAuthenticated => {
          if( isAuthenticated ){
            this.router.navigate(['./']);
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log('can match')
    // console.log(route, segments)
    // return true;
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log('can activate')
    // console.log(route, state)
    // return true;
    return this.checkAuthStatus();
  }


}
