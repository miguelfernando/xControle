import { Component, OnInit } from '@angular/core';  
import { FormBuilder, Validators, FormControl } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { UsuarioService } from '../usuario.service';  
import { Usuario } from '../usuario';
 
export interface UsuarioTipo {
  value: string;
  viewValue: string;
}

@Component({  
  selector: 'app-usuario',  
  templateUrl: './usuario.component.html',  
  styleUrls: ['./usuario.component.css']  
})  



export class UsuarioComponent implements OnInit {  
  dataSaved = false;  
  usuarioForm: any;  
  allUsuario: Observable<Usuario[]>;  
  usuarioIdUpdate = null;  
  message = null;  
  selectedUsuario: string;
  t_usuario: UsuarioTipo[] = [
    {value: 'ADM', viewValue: 'ADM'},
    {value: 'GP', viewValue: 'GP'},
    {value: 'GA', viewValue: 'GA'}
  ];

  constructor(private formbulider: FormBuilder, private usuarioService:UsuarioService) { }  
  
  ngOnInit() {  
    this.usuarioForm = this.formbulider.group({  
      Nome: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
      Senha: ['', [Validators.required]],  
      SenhaConfirm: ['', [Validators.required]],
      TipoUsuario: ['', [Validators.required]],
      Situacao:['', [Validators.required]]
    });  
    this.loadAllUsuario();  
  }  
  loadAllUsuario() {  
    this.allUsuario = this.usuarioService.Mostra();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const usuario = this.usuarioForm.value;  
    this.CreateUsuario(usuario);  
    this.usuarioForm.reset();  
  }  
  loadUsuarioToEdit(usuarioId: string) {  
    this.usuarioService.MostraById(usuarioId).subscribe(usuario=> {  
    this.message = null;  
    this.dataSaved = false;  
    this.usuarioIdUpdate = usuario.Id;  
    this.usuarioForm.controls['Nome'].setValue(usuario.Nome);  
    this.usuarioForm.controls['Senha'].setValue(usuario.Senha);  
    this.usuarioForm.controls['Email'].setValue(usuario.Email);  
    this.usuarioForm.controls['TipoUsuario'].setValue(usuario.TipoUsuario);
    });  
  
  }  
  CreateUsuario(usuario: Usuario) {  
    if (this.usuarioIdUpdate == null) {  
      this.usuarioService.Grava(usuario).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Record saved Successfully';  
          this.loadAllUsuario();  
          this.usuarioIdUpdate = null;  
          this.usuarioForm.reset();  
        }  
      );  
    } else {  
      usuario.Id = this.usuarioIdUpdate;  
      this.usuarioService.Atualiza(usuario).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Record Updated Successfully';  
        this.loadAllUsuario();  
        this.usuarioIdUpdate = null;  
        this.usuarioForm.reset();  
      });  
    }  
  }   
  deleteUsuario(usuarioId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.usuarioService.Apaga(usuarioId).subscribe(() => {  
      this.dataSaved = true;  
      this.message = 'Record Deleted Succefully';  
      this.loadAllUsuario();  
      this.usuarioIdUpdate = null;  
      this.usuarioForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.usuarioForm.reset();  
    this.message = null;  
    this.dataSaved = false;  
  }  
} 