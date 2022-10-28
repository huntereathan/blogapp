import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  
  constructor(private _authService: AuthService, 
              private _router: Router){}
  
  canActivate(): boolean{
    if(this._authService.loggedIn()){
      return true;
    }else{
      this._router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(): boolean{
    return this.canActivate();
  }
  
}
