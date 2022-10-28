import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  val: any;

  apiURL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  postcommentfunc(data: any, articleid: any){
    return this._http.post(this.apiURL + "comment/" + articleid, data)
  }

  getcommentfunc(articleid:any){
    return this._http.get(this.apiURL + "comment/" + articleid)
  }

  delcommentfunc(commentid: any){
    return this._http.delete(this.apiURL + "comment/" + commentid);
  }

  getsinglecommentfunc(commentid: any){
    return this._http.get(this.apiURL + "comment/singlecomment/" + commentid)
  }

  editcomment(commentid: any, body: any){
    console.log(body);
    this.val = {
      "comment": body
    }
    return this._http.put(this.apiURL + "comment/" + commentid, this.val);
  }
}
