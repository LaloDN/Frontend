import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {
  nombreUsuario: string;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    //Cuándo se cargue la página, se manda a ejecutar este método
    this.getNombreUsuario();
  }

  getNombreUsuario(): void{
    this.nombreUsuario=this.loginService.getTokenDecoded().sub; //Sub es el claim con el nombre del usuario
  }

}
