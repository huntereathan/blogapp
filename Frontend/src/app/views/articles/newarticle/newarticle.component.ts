import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ArticleService } from 'src/app/services/articles/article.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.scss']
})
export class NewarticleComponent implements OnInit {

  newarticleform: FormGroup;
  newArticleArray: {title: string, description: string}[] = [];
  showAddedArticleList: boolean = false;

  auth_id = JSON.parse(localStorage.getItem('auth-token') || '{}');
  constructor(private article: ArticleService, private _router: Router) {
    this.auth_id = this.auth_id.userinfo._id;
    this.newarticleform = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      // author_id: new FormControl(Validators.required)
    })
   }

  ngOnInit(): void {
    if(this.newArticleArray.length){
      this.showAddedArticleList = true;
    }else{
      this.showAddedArticleList = false;
    }
  }

  create(){
    console.log(this.newarticleform.value)
    if(this.newarticleform.valid){ 
      this.article.createnewpost(this.newarticleform.value)
      .subscribe({ 
        next: (data) => {
          console.log(data);
          this._router.navigate(['/dashboard'])
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }

  addNewArticle(){
    if(this.newarticleform.valid){
      this.newArticleArray.push(this.newarticleform.value)
      this.showAddedArticleList = true;
    }
  }

  createMultipleArticle(){
    console.log(this.newArticleArray);
    
    this.article.createmultiplearticles(this.newArticleArray)
    .subscribe({
      next: data => {
        console.log(data);
        
        this._router.navigate(['/dashboard'])
      },
      error: err => {
        console.log();
        
      }
    })
  }

  removeArticle(index: any){
    this.newArticleArray.splice(index, 1);
  }

}
