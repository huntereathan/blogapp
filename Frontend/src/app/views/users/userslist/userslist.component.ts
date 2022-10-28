import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit {
  
  users: any;
  // numbers: any;
  totalCount:number;
  limit:number=5;
  page = 1;
  // itemsPerPage: number;
  // totalItems: any;

  offset: any;

  constructor(private _user: UsersService, public _router: Router, 
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.loadPage(this.page)
    // this.allusers();
  }

  allusers(){
    this._user.allusersfun()
    .subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
      },
      error: error => {console.log(error)}
    })
  }

  deleteuser(id: any){
    this._user.deleteuser(id)
    .subscribe({
      next: (data) => {
        this.allusers();
      },
      error: error => {console.log(error)}
    })
  }


  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    this.loadData(this.offset, this.limit)
  }

  loadData(offsets: any, limits: any){
    this._user.paginateduser(offsets, limits)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        this.totalCount = data.collectionSize;
        this.users = data.paginatedResult;
      },
      error: err => {console.log(err);
      }
    })
  }
}


// itemsPerPage: number;
// totalItems: any;
// page: any;
// previousPage: any;

// ...
// loadPage(page: number) {
//   if (page !== this.previousPage) {
//     this.previousPage = page;
//     this.loadData();
//   }
// }
// ...

// loadData() {
//   this.dataService.query({
//     page: this.page - 1,
//     size: this.itemsPerPage,
//   }).subscribe(
//     (res: Response) => this.onSuccess(res.json(), res.headers),
//     (res: Response) => this.onError(res.json())
//     )
// }