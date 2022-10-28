import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserslistComponent } from './userslist/userslist.component';

const routes: Routes = [
  {
    path: 'userslist',
    component: UserslistComponent,
    data: {
      title: 'Userslist Page'
    }
  },
  {
    path: 'userdetail/:id',
    component: UserdetailComponent,
    data: {
      title: 'Userdetail Page'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
