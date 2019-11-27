import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../_services";
// import {Promise} from 'bluebird';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      const user: any = JSON.parse(localStorage.getItem('currentUser'));
      if (user.accessToken && this.isExpired(user.accessTokenExpiresAt)) {
        console.log('accessToken expired');
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        if (user.refreshToken && !this.isExpired(user.refreshTokenExpiresAt)) {
          console.log('refreshing token');
          return this.refreshToken(user)
            .then((result) => {
              return result;
            })
            .catch((err) => {
              this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
              return err;
            });
        }
      } else if (user.accessToken && !this.isExpired(user.accessTokenExpiresAt)) {
        console.log('accessToken not expired');
        // logged in so return true
        return true;
      }
    }

    // not logged in so redirect to signin page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  isExpired(expiry: string) {
    const expirey_date: any = new Date(expiry);
    const now: any = new Date();
    return (expirey_date - now > 0) ? false : true;
  }

  refreshToken(user) {
    return new Promise((resolve, reject) => {
      this.authenticationService.refreshToken(user.refreshToken)
        .subscribe(
          (data: any) => {
            if (data) {
              console.log('token refreshed');
              // store user details and token in local storage to keep user logged in between page refreshes.
              localStorage.setItem('currentUser', JSON.stringify(data));

              // logged in so return true
              resolve(true);
            }
            reject(false);
          },
          (error: any) => {
            console.log('refreshing token failure');
            reject(false);
          }
        );
    });
  }

}


