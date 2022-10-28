import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.scss']
})
export class EditarticleComponent implements OnInit {

  id: any;
  _title = ""
  _description = ""
  updateinfo: any;
  constructor(private route: ActivatedRoute, 
              private article: ArticleService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onStart();
  }

  onStart(){
    this.article.eacharticlefun(this.id).subscribe({
      next: (data: any) => {
        // console.log(data);
        // console.log(typeof data);
        this._title = data.title;
        this._description = data.description;
        // console.log(this._title);
        
      },
      error: error => {console.log(error);}
    })
  }

  onUpdate(val: NgForm ){
      console.log(val.form.value);
      this.updateinfo = val.form.value
      this.article.updatearticlefun(this.id, this.updateinfo).subscribe({
        next: (data: any) => {
          console.log(data);
          this.article.isarticleupdated();
          this.router.navigate(['/articles/detailarticle', this.id])
        },
        error: error => {console.log(error);}
      })
  }

}
