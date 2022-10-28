import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/articles/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userarticles',
  templateUrl: './userarticles.component.html',
  styleUrls: ['./userarticles.component.scss']
})
export class UserarticlesComponent implements OnInit {
  // @ViewChild('del') dele: any;
  // role = JSON.parse(localStorage.getItem('auth-token') || '{}');
  // edit = false;
  articles:any
  showdelbtn:boolean = true;
  delarticles: string[] = [];
  del = {
    "deleteid":this.delarticles
  };
  constructor(private article: ArticleService, private _router: Router) {
    // this.role = this.role.role;
    // if(this.role){}
  }
  

  ngOnInit(): void {
    this.userarticles()
    
    
  }

  userarticles(){
    this.article.userarticlefun().subscribe({
      next: (data) => {
        console.log(data);
        this.articles = data;
        if(this.articles.length === 0){
          this.showdelbtn = false;
        }
      },
      error: error => {console.log(error);}
    })
  }

  detail(id:any){
    console.log("HI");
    console.log(id);
    this._router.navigate(['/articles/detailarticle', id])
  }

  edit(id: any){
    this._router.navigate(['/articles/editarticle', id])
  }

  delete(id: any){
    this.article.deletearticle(id).subscribe({
      next: (data) => {
        console.log(data);
        this.userarticles()
        // this.articles = data;
      },
      error: error => {console.log(error);}
    })
  }

  onChange(event: any, id: any){
    if(event.target.checked){
      this.delarticles.push(id);
    }else{
      this.delarticles = this.delarticles.filter( m => m != id)
    }
    console.log(this.delarticles);
  }


  selectdel(){
    this.del.deleteid = this.delarticles;
    console.log('thissssssssssssssssssssss',this.del);
    
    this.article.delmularticle(this.del).subscribe({
      next: (data) => {
        console.log('deleteeeeeeeeeeee',data);
        this.userarticles();
      },
      error: error => {console.log(error);}
    })
  }
}
