import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  
  
  currentuser = JSON.parse(localStorage.getItem('auth-token') || '{}');
  currentUserID: any;
  isAdmin: boolean = false
  constructor(private classToggler: ClassToggleService, public _router: Router, 
              public _authService: AuthService) { 
    super();
    console.log("user: ",this.currentuser);
    this.currentUserID = this.currentuser.userinfo._id;
    if(this.currentuser.role === 'admin'){
      this.isAdmin = true;
    }
    console.log("id: ",this.currentUserID);
    
  }
}
