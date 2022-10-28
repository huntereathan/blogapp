import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticleService } from 'src/app/services/articles/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  
  articles: any;
  visible = false;

  constructor(private article: ArticleService, 
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.allarticle();
  }

  //Get all the articles
  allarticle(){
    this.article.allarticlefun()
    .subscribe({
    next: (data) => {
      console.log(data);
      this.articles = data;
      
    },
    error: error => {console.log(error)}
  })
  }


  //Redirect to detail article page
  detail(id:any){
    console.log("HI");
    console.log(id);
    this._router.navigate(['/articles/detailarticle', id])
  }

  //For Filter Button
  toggleCollapse(): void {
    this.visible = !this.visible;
  }

  //Date filter
  onApplyFilter(val: NgForm){
    this.article.datefilterfun(val.form.value.startDate, val.form.value.endDate)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.articles = data;  
        this.toggleCollapse();
      },
      error: error => {console.log(error)}
    })
  }

}
