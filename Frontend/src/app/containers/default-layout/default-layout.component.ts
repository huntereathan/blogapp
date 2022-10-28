import { Component } from '@angular/core';

import { navItems,adminNavItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  data: any;
  public navItems:any;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
    
   
    this.data = JSON.parse(localStorage.getItem('auth-token') || '{}');
    console.log("data",this.data.role)

    if(this.data.role === 'admin') {
      this.navItems = adminNavItems;
    } else {
      this.navItems =navItems;
    }
  
  }

   

}
