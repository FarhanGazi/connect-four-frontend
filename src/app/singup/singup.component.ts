import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.less']
})
export class SingupComponent implements OnInit {

  public errmessage = undefined;
  public user = { username: '', mail: '', password: '' };

  constructor( public auth: AuthService, public router: Router ) { }

  ngOnInit(): void {
  }

  signup() {
    this.auth.signup(this.user).subscribe(
      (response) => {
        console.log('Registration ok: ' + JSON.stringify(response));
        this.errmessage = undefined;
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Signup error: ' + JSON.stringify(error.error.errormessage));
        this.errmessage = error.error.errormessage || error.error.message;
      });
  }
}
