import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  //Este método remueve el nombre del usuario del local storage y redirige a inicio.
  logOut(): void{
    this.loginService.removeLocalStorage();
    this.router.navigate([('/inicio')]);
  }
}
