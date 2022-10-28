import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  // constructor() { }

  loginForm: FormGroup;
  error:boolean = false; // show {{errorMessage}} like username doesnot exit when login btn clicked 
  errorMessage: string = '' //show error msg like username doesnot exit when login btn clicked
  showerror: boolean = false; //checks status is VALID or INVALID
  issubmitted: boolean = false;
  constructor(private _login: AuthService, 
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
   }

  ngOnInit(): void {
  }

  login() {
    console.log("forminfo",this.loginForm);
    this.issubmitted = true;
    if(this.loginForm.status === "INVALID"){
      this.showerror = true;
    }else{ 
      console.log(this.loginForm.value)
      if(this.loginForm.valid){ 
        this._login.submitLogin(this.loginForm.value)
        .subscribe({ 
          next: (data) => {
            console.log(data);
            localStorage.setItem('auth-token', JSON.stringify(data))
            this._router.navigate(['/dashboard'])
          },
          error: error => {
            console.log(error.error.message)
            this.errorMessage = error.error.message;
            this.error = true;
          }
        })
      }else{
        console.log("Errorr")
      }
    }
  }


}
