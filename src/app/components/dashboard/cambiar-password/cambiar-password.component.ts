import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  loading= false;
  cambiarPassword: FormGroup;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, { validator: this.checkPassword })
  }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.passwordAnterior.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true};
  }

  guardarPassword(): void {
    console.log(this.cambiarPassword);

    //Objeto con la misma estructura de la clase que tenemos en el backend
    const changePassword: any={
      passwordAnterior:this.cambiarPassword.value.passwordAnterior,
      nuevaPassword:this.cambiarPassword.value.nuevaPassword,
    }
    console.log(changePassword);
    this.loading = true;
    //El objeto creado en este método, se lo mandamos al método changePassword y lo suscribimos para esperar una respuesta
    this.usuarioService.changePassword(changePassword).subscribe(data=>{
      //Si todo sale bien, mandamos un mensaje harcodeado definido desde la API rest
      this.toastr.info(data.message);
      this.router.navigate(['/dashboard']);
    }, error=>{
      //Si algo sale mal, resetamos el formulario y mandamos error
      this.loading=false; //Deshabilitamos los puntos del login
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message,'Error!');
    });
  }

}
