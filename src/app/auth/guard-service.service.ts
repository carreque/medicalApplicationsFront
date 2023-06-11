import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardServiceService{

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  isAuthenticated$(): Observable<boolean> {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }
}
