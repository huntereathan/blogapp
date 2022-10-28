import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ; 
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UserslistComponent } from './userslist/userslist.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
// import { DetailarticleComponent } from './detailarticle/detailarticle.component';
// import { UserarticlesComponent } from './userarticles/userarticles.component'

@NgModule({
  declarations: [
    UserslistComponent,
    UserdetailComponent
  ],
  imports: [
    CommonModule,
    // PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule, 
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    NgbModule
  ]
})
export class UsersModule {
}
