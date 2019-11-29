import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, AuthenticationService} from '../_services';

@Component({
  templateUrl: 'signout.component.html',
  providers: [AuthenticationService]
})

export class SignOutComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

    this.authenticationService.logout();
    console.log(localStorage.getItem('currentUser'));
    console.log('Logged Out');

    this.router.navigate(['/login']);
  }

}
