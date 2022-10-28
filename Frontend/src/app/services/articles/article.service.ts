import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  apiURL = environment.apiURL;
  articleupdated: boolean = false;
  constructor(private _http: HttpClient) { }

  // url = 'http://localhost:3000/'
  
  allarticlefun(){
    return this._http.get(this.apiURL + "article/")
  }

  eacharticlefun(id:any){
    return this._http.get(this.apiURL + "article/" + id);
  }

  userarticlefun(){
    return this._http.get(this.apiURL + "article/" + "userspecific");
  }

  createnewpost(body: any){
    return this._http.post(this.apiURL + "article/", body);
  }

  updatearticlefun(id: any, body: any){
    console.log('------------logggggggg', body);
    
    return this._http.put(this.apiURL + "article/" + id, body);
  }

  deletearticle(id: any){
    return this._http.delete(this.apiURL + "article/" + id);
  }

  delmularticle(del:any){
    console.log('------------deeeeeeeeeeeel', del);
    console.log('------------deeeeeeeeeeeel', typeof del);
    
    return this._http.post(this.apiURL + "article/delete-many", del);
  }


  likecountfun(id: any){
    return this._http.get("/api/likes/"+ id);
  }

  likearticle(id: any){
    return this._http.post("/api/likes/"+ id, null)
  }

  getlikeinfofunc(id: any){
    return this._http.get("/api/likes/getlikeinfo/"+ id);
  }

  unlikearticle(id: any){
    console.log("unlike");
    
    return this._http.delete("/api/likes/"+ id)
  }

  isarticleupdated(){
    this.articleupdated = true;
  }

  datefilterfun(startDate:any, endDate:any){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('startDate', startDate);
    searchParams = searchParams.append('endDate', endDate);
    return this._http.get("/api/article/", {
      params: searchParams
    })
  }

  createmultiplearticles(body: any){
    return this._http.post('/api/article', body)
  }
}
