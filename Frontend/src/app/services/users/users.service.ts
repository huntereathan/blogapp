import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
   
  apiURL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  ad = "admin/"
  
  allusersfun(){
    // console.log('-------------------tset');
    return this._http.get(this.apiURL + this.ad)
  }

  userdetail(id: any){
    return this._http.get(this.apiURL + "user/" + id);
  }

  deleteuser(id: any){
    return this._http.delete(this.apiURL + this.ad + "user/" + id);
  }

  followuser(body: any){
    return this._http.put(this.apiURL + "user/follow", body);
  }
  unfollowuser(body: any){
    return this._http.put(this.apiURL + "user/unfollow", body);
  }

  paginateduser(offset: any, limit: any){
    let paginationParams = new HttpParams();
    paginationParams = paginationParams.append('offset', offset);
    paginationParams = paginationParams.append('limit', limit);
    return this._http.get("/api/admin/", {
            params: paginationParams
    })
  }
  
}
