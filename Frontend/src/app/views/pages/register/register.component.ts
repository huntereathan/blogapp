import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // constructor() { }
  myForm: FormGroup;
  @ViewChild('nameInput') repeatpassword: ElementRef | undefined;
  successMessage: string = "";
  error:boolean = false;
  errorMessage: string = ''
  val:any;
  repassword: boolean = false;
  emptyerrorshow: boolean = false;
  issubmitted: boolean = false;
  constructor(private _register: AuthService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      username: new FormControl(null, Validators.required),
      mobileno: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      about: new FormControl(null)
    })
  }

  ngOnInit(): void {
  
  }


  register(){
    this.issubmitted= true;
    if(this.myForm.status === 'INVALID'){
      this.emptyerrorshow = true
    }else{ 
      console.log(this.myForm.value)     
      if(this.myForm.valid){ 
        this._register.submitRegister(this.myForm.value)
        .subscribe({
          next: data => {
            this.successMessage = "Registration Success";
            console.log(data);
            console.log("SuccessMessage: " + this.successMessage)
            localStorage.setItem('auth-token', JSON.stringify(data))
            this._router.navigate(['dashboard']);

          },
          error: errors => {this.successMessage = "Some Error;"
          console.log("Error: ",errors.error.message);
          this.errorMessage = errors.error.message;
          
          this.error = true;
          
          }
        })
      }
     
    }
  }


}



// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms'
// import { RegisterService } from '../register.service';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   myForm: FormGroup;
//   successMessage: string = "";
//   constructor(private _register: RegisterService,
//               private _router: Router,
//               private _activatedRoute: ActivatedRoute) { 
//     this.myForm = new FormGroup({
//       email: new FormControl(null, Validators.email),
//       username: new FormControl(null, Validators.required),
//       mobileno: new FormControl(null, Validators.required),
//       password: new FormControl(null, Validators.required),
//       about: new FormControl(null)
//     })
//   }

//   ngOnInit(): void {
//   }

//   register(){
//     console.log(this.myForm.value)
//     if(this.myForm.valid){ 
//       this._register.submitRegister(this.myForm.value)
//       .subscribe({
//         next: data => {
//           this.successMessage = "Registration Success";
//           this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
//         },
//         error: error => this.successMessage = "Some Error;"
//       })
//     }
//   }

// }

