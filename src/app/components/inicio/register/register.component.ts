import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  loading=false;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router,
    private toastr: ToastrService) {
    this.register = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, { validator: this.checkPassword });
  }

  ngOnInit(): void {
  }

  registrarUsuario(): void{
    console.log(this.register);
    const usuario : Usuario={
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password
    };
    this.loading=true;
    //Nos suscribimos al método saveUser para esperar una respuesta
    this.usuarioService.saveUser(usuario).subscribe(data=>{
      console.log(data);
      //Le mandamos un mensaje al usuario de que ha sido registrado, nos regresamos a la página de inicio y reiniciamos el loading
      this.toastr.success('El usuario '+usuario.nombreUsuario+' fue registrado con éxito!', 'Usuario Registrado!');
      this.router.navigate(['/inicio/login']);
      this.loading=false;
    }, error=>{
      //Por si nos suelta un error en el registro
      this.loading=false;
      console.log(error);
      this.toastr.error(error.error.message,'Error!');
      this.register.reset();
    })
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true};
  }

}
