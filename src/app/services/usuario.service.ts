//Para crear el servicio es ng g s carpeta/nombreservicio

import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  myAppUrl: string;
  myApiURL: string;
  constructor(private http: HttpClient) {
    this.myAppUrl= environment.endpoint; //Puerto de la API declarado desde el enviorment
    this.myApiURL='/api/Usuario';
  }

  //Método post
  saveUser(usuario: Usuario): Observable<any>{
    return this.http.post(this.myAppUrl+this.myAppUrl, usuario); //Método post, que necesita la URL completa y el body (el objeto a enviar a la api)
  }

  //Método put con el controlador anidad de cambiarpassword
  changePassword(changePassword): Observable<any>{
    return this.http.put(this.myAppUrl+this.myApiURL+'/CambiarPassword', changePassword);
  }
}
