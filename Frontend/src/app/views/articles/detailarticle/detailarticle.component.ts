import { Component, OnInit, OnDestroy } from '@angular/core';
import { getStyle, rgbToHex } from '@coreui/utils/src';
import { ArticleService } from 'src/app/services/articles/article.service';
import { Params, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-detailarticle',
  templateUrl: './detailarticle.component.html',
  styleUrls: ['./detailarticle.component.scss']
})
export class DetailarticleComponent implements OnInit, OnDestroy {

  article:any;
  id:any;
  likecount: any;
  likebutton: boolean = true;
  unlikebutton: boolean = false;
  currentuser = JSON.parse(localStorage.getItem('auth-token') || '{}');
  current_id: any;
  noofcomments: any;
  

  visible = true;
  dismissible = true;

  constructor(public eacharticle:ArticleService, private route: ActivatedRoute) {
    this.current_id = this.currentuser.userinfo._id;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.likecountfunc();
    this.showarticle();
  }

  onVisibleChange(eventValue: boolean) {
    this.visible = eventValue;
  }

  showarticle(){
    this.eacharticle.getlikeinfofunc(this.id)
      .subscribe({
        next: (data:any) => {
          console.log("likeinfo: ", data);
          if(data.length !== 0){
            this.unlikebutton = true;
            this.likebutton = false;
          }else{
            this.unlikebutton = false;
            this.likebutton = true;
          }
          console.log("get like info: ");
          console.log(this.likebutton);
          console.log(this.unlikebutton);  
          
        this.eacharticle.eacharticlefun(this.id)
          .subscribe({
            next: (data: any) => {
              console.log(data);
              // console.log("currentuserid: ",  this.current_id);
              // console.log("articleid: ",  data.author_id._id);
              if(this.currentuser.role === 'admin'){
                this.likebutton = false;
              }else{
                if(this.current_id === data.author_id._id){
                  console.log("Hello");
                  this.likebutton = false;
                  this.unlikebutton = false;
                }
              } 
              console.log("show article: ");
              console.log(this.likebutton);
              console.log(this.unlikebutton);
              
              this.article = data;
              
            },
            error: error => {console.log(error)}
          }) 
        },
        error: (error:any) => { console.log(error);}
      })
    
    
  }

  likecountfunc(){
    // console.log("like");
    this.eacharticle.likecountfun(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.likecount = data;
        this.likebutton = false;
        this.unlikebutton = true;
        console.log("inside like count: ");
        console.log(this.likebutton);
        console.log(this.unlikebutton);  
        
      },
      error: (err) => {console.log(err);
      }
    })
  }


  likedfunc(){
    this.eacharticle.likearticle(this.id).subscribe({
      next: data => {
        console.log(data);
        this.likecountfunc();
        this.showarticle();
      },
      error: (err) => {console.log(err);
      }
    });
  }

  unlikefunc(){
    console.log('del');
    
    this.eacharticle.unlikearticle(this.id).subscribe({
      next: data => {
        console.log(data);
        // this.getlikeinfo();
        this.likecountfunc();
        this.showarticle();
      },
      error: (err) => {console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.eacharticle.articleupdated = false;
  }
  

  getNoofComments(commentcount: any){
    this.noofcomments = commentcount;
  }
}
