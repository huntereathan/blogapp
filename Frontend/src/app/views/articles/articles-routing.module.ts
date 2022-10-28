import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Page404Component } from './page404/page404.component';
// import { Page500Component } from './page500/page500.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
import { DetailarticleComponent } from './detailarticle/detailarticle.component';
import { UserarticlesComponent } from './userarticles/userarticles.component'
import { NewarticleComponent } from './newarticle/newarticle.component';
import { EditarticleComponent } from './editarticle/editarticle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'detailarticle/:id',
    component: DetailarticleComponent,
    data: {
      title: 'DetailArticle Page'
    }
  },
  {
    path: 'userarticle',
    component: UserarticlesComponent,
    data: {
      title: 'UserArticle Page'
    }
  },
  {
    path: 'createarticle',
    component: NewarticleComponent,
    data: {
      title: 'CreateArticle Page'
    }
  },
  {
    path: 'editarticle/:id',
    component: EditarticleComponent,
    data: {
      title: 'EditArticle Page'
    }
  },
  {
    path: 'allarticles',
    component: DashboardComponent,
    data: {
      title: 'All Article Page'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
