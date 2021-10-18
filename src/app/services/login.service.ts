import { Usuario } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   myAppUrl: string;
   myApiUrl: string;

   //En el constructor siempre importamos el HttpClient e inicializamos la url
  constructor(private http: HttpClient) {
    this.myAppUrl=environment.endpoint;
    this.myApiUrl="/api/Login";
  }

  login(usuario: Usuario): Observable<any>{
    return this.http.post(this.myAppUrl+this.myApiUrl,usuario);
  }

  //Función para guardar el token con el nombre que ingresa el usuario en la página de login y mostrarlo en otra pantalla
  setLocalStorage(data): void{
    localStorage.setItem('token',data);
  }

  //Obtención del nombre del usuario
 /* getNombreUsuario():string{
    return  localStorage.getItem('nombreUsuario');
  }*/

  getTokenDecoded(): any{
    const helper= new JwtHelperService();
    //Defodificación de mi token, lo obtengo mediante el local storage y se lo paso en el método decodeToken()
    const decodedToken= helper.decodeToken(localStorage.getItem('token'));
   return decodedToken; //Retorno del token decodificado
  }

  //Eliminación del localstorage para cuándo salimos de la página
  removeLocalStorage(): void{
    localStorage.removeItem('token');
  }
}

