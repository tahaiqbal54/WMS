//mport { UsersService } from './../_services/users.service';
import  swal  from 'sweetalert2';
import { user_pass } from './../_models/user_pass';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../_services';

@Component({
  templateUrl: 'signin.component.html',
  providers: [AuthenticationService]
})

export class SigninComponent implements OnInit {

  returnUrl: string;
  loading = false;
  submitted = false;
  email: string;
  password: string;
  error: string;
  forget_pass: user_pass;
  inserted: any;
  message: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
              ) {
  }

  ngOnInit() {

    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
      return;
    }
    // reset signin status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = (this.route.snapshot.queryParams['returnUrl']) ? this.route.snapshot.queryParams['returnUrl'] : '/';
  }

  // forgetPass(){
  //   this.forget_pass = new user_pass();
  //   this.forget_pass.email = this.email;
  //  this.authenticationService.forgetpass(this.forget_pass)
  //  .subscribe(
  //   (data: any) => {
  //     if (data.success) {
  //       swal(
  //         "Change Password link has been email to user."
  //     )
  //     }
  //   },
  //   (error: any) => {
  //     swal(
  //       error.error.message
  //   )
  //     this.inserted = 'failure';
  //     this.message = error.error.message;
  //   }
  // );
  // }

  onSubmit() {
    this.error = '';
    this.submitted = true;

    // stop here if form is invalid
    /*if (this.loginForm.invalid) {
      return;
    }*/

    this.loading = true;

    this.authenticationService.login(this.email, this.password)
    /*.pipe(first()
  
  )*/
      .subscribe(
        (data: any) => {
          console.log(data);
          //console.log('returnUrl: ', this.returnUrl);
          //if(data.role_id != 4){
          this.router.navigate(['/dashboard']);
        //} else {
          //this.router.navigate(['/retail-outlets/list']);
        //}
        },
        (error: any) => {
          /*this.alertService.error(error);*/
          console.log(error);
          this.error = error.error;
          this.loading = false;
        });
  }

}
