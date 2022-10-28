import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import {CommentService} from 'src/app/services/comments/comment.service' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @ViewChild('com') commentForm: any;
  @Input() article_id: any;
  @Output() noofComment = new EventEmitter<Number>();

  articlecomment: any;
  showdel: any;
  updatebutton = false;
  postbutton = true;
  editcommentid: any;
  editedcommmet: string = '';
  // disablepostbutton: boolean = true

  currentuser_id = JSON.parse(localStorage.getItem('auth-token') || '{}');

  constructor(private commentservice: CommentService, private router: Router) {
    this.currentuser_id = this.currentuser_id.userinfo._id;
    this.showdel =  this.currentuser_id;
   }

  ngOnInit(): void {
    this.getcomments();
  }


  //To delete a commment
  delcom(comid: any){
    this.commentservice.delcommentfunc(comid)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.getcomments();
          },
          error: error => {console.log(error)}
        })
  }


  //Get a single comment by id to show in edit comment box
  getsinglecom(comid: any){
    this.commentservice.getsinglecommentfunc(comid)
        .subscribe({
          next: (data:any) => {
            console.log(data);
            console.log('oooooooooooooo',typeof data);
            this.editcommentid = data._id;
            this.commentForm.setValue({
              comment: data.comment
            })
            this.updatebutton = true;
            this.postbutton = false;
            this.getcomments();
          },
          error: error => {console.log(error)}
        })
  }

  //To update a comment after updating it
  updatecom(){
    this.commentservice.editcomment(this.editcommentid, this.editedcommmet)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.updatebutton = false;
            this.postbutton = true;
            this.commentForm.setValue({
                comment: ""
            })
            this.getcomments();
          },
          error: error => {console.log(error)}
        })
  }

  //Post a new comment for a article
  oncommentsubmit(form:NgForm){
    console.log(form.value);
    this.commentservice.postcommentfunc(form.value, this.article_id)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.commentForm.setValue({
              comment: ""
            })
            this.getcomments();
            this.router.navigate(['/articles/detailarticle', this.article_id])
          },
          error: error => {console.log(error)}
        })
  }

  // To get all the artices from the db
  getcomments(){
    this.commentservice.getcommentfunc(this.article_id)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.articlecomment= data;
            this.noofComment.emit(Object.keys(data).length)
            this.router.navigate(['/articles/detailarticle', this.article_id])
          },
          error: error => {console.log(error)}
        })
  }

}
