import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Usuario } from './usuario';  
  
 @Injectable({  
  providedIn: 'root'  
})  
  
export class UsuarioService {  
  url = 'http://localhost:53590/Api/Usuario';  
  constructor(private http: HttpClient) { }  
  
  Mostra(): Observable<Usuario[]> {  
    return this.http.get<Usuario[]>(this.url + '/Mostra');  
  } 

  MostraById(usuarioId: string): Observable<Usuario> {  
    return this.http.get<Usuario>(this.url + '/MostraById/' + usuarioId);  
  }

  Grava(usuario: Usuario): Observable<Usuario> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Usuario>(this.url + '/Gravar/', usuario, httpOptions);  
  } 

  Atualiza(usuario: Usuario): Observable<Usuario> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Usuario>(this.url + '/Atualiza/', usuario, httpOptions);  
  }  
  Apaga(usuarioid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/Apaga?id=' +usuarioid, httpOptions);  
  }  
}  