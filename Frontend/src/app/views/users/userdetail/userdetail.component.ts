import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { ListFormat } from 'typescript/lib/tsserverlibrary';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  
  id:any;
  userinfo:any;
  followbutton: boolean = true;
  unfollowbutton: boolean = false;
  followarray: any;
  followersarray: any;
  currentuser = JSON.parse(localStorage.getItem('auth-token') || '{}');
  current_id: any;

  constructor(private _user: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe({
      next: (params: Params) => {
        this.id = params['id'];
       this.userdetail(this.id);
      }
    })
    this.current_id = this.currentuser.userinfo._id;
    console.log("currid:");
    
    console.log(this.current_id);
    
    if(this.id == this.current_id){
      this.followbutton = false;
    }
    this.userdetail(this.id);
  }


  userdetail(id: any){
    this._user.userdetail(id)
      .subscribe({
      next: (data: any) => {
        console.log(data);
        this.userinfo = data;
        this.followarray = this.userinfo.following;
        this.followersarray = this.userinfo.followers;
        console.log(this.current_id.role);
        if(this.currentuser.role === 'admin'){
          console.log('hi');
          
          this.followbutton = false;
        }else{
          if(this.id == this.current_id){
            this.followbutton = false;
            this.unfollowbutton = false;
          }else{
            if(this.followersarray.indexOf(this.current_id) !== -1){
                this.followbutton = false;
                this.unfollowbutton = true;
            }
            else{
              this.unfollowbutton = false;
              this.followbutton = true;
            }
          }
        }
        console.log("follow button");
        console.log(this.followbutton);
      },
      error: error => {console.log(error)}
    })
     
  }

  follow(){
    this.followersarray = this.userinfo.followers;
    console.log(this.followersarray);
    console.log(this.followersarray.indexOf(this.current_id));
    if(this.followersarray.indexOf(this.current_id) === -1){
      let val = {
          "followId": this.userinfo._id
      }
      this._user.followuser(val)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.userdetail(this.userinfo._id);
        },
        error: error => {console.log(error)}
      })
    }
  }

  unfollow(){
    console.log(this.userinfo);
    
    this.followersarray = this.userinfo.followers;
    console.log(this.followersarray);
    if(this.followersarray.indexOf(this.current_id) >= 0){
      let val = {
          "followId": this.userinfo._id
      }
      this._user.unfollowuser(val)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.userdetail(this.userinfo._id);
        },
        error: error => {console.log(error)}
      })
    }
  }
}



