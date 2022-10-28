import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { PagesRoutingModule } from './pages-routing.module';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { Page404Component } from './page404/page404.component';
// import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleRoutingModule } from './articles-routing.module';
import { DetailarticleComponent } from './detailarticle/detailarticle.component';
import { UserarticlesComponent } from './userarticles/userarticles.component';
import { NewarticleComponent } from './newarticle/newarticle.component';
import { EditarticleComponent } from './editarticle/editarticle.component';
import { CommentsComponent } from './detailarticle/comments/comments.component';
// import { LikeunlikeComponent } from './detailarticle/likeunlike/likeunlike.component'

import { AlertModule } from '@coreui/angular';

@NgModule({
  declarations: [
    DetailarticleComponent,
    UserarticlesComponent,
    NewarticleComponent,
    EditarticleComponent,
    CommentsComponent,
    // LikeunlikeComponent
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
    ArticleRoutingModule,
    AlertModule
  ]
})
export class ArticlesModule {
}
