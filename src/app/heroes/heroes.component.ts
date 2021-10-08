import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mock-heroes';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})

export class HeroesComponent implements OnInit {

  heroes = HEROES;
  selectedHero?: Hero;
  public errmessage = undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.login('admin@postmessages.it', 'admin');
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  login(email: string, password: string) {
    this.authService.login({email: email, password: password}).subscribe((d) => {
      console.log('Login granted: ' + JSON.stringify(d));
      console.log('User service token: ' + this.authService.get_token());
      this.errmessage = undefined;
    }, (err) => {
      console.log('Login error: ' + JSON.stringify(err));
      this.errmessage = err.message;

    });

  }
}