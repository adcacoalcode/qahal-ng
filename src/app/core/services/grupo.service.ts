import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.vars';
import { Grupo } from '../models/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  rota: string = '/grupos';

  constructor(private http: HttpClient)  {}

  getAll(): Observable<Grupo[]> {
    return this.http.get(`${API_URL}${this.rota}`) as Observable<Grupo[]>;
  }

  getAllByIgrejagrupo(idIgrejaGrupo: number): Observable<Grupo[]> {
    return this.http.get(`${API_URL}${this.rota}/igrejagrupo/${idIgrejaGrupo}`) as Observable<Grupo[]>;
  }

  get(id: number): Observable<Grupo> {
    return this.http.get(`${API_URL}${this.rota}/${id}`) as Observable<Grupo>;
  }

  post(grupo: Grupo): Observable<Grupo> {
    return this.http.post(`${API_URL}${this.rota}`, grupo) as Observable<Grupo>;
  }

  put(grupo: Grupo): Observable<Grupo> {
    return this.http.put(`${API_URL}${this.rota}/${grupo.id}`, grupo) as Observable<Grupo>;
  }

  delete(id: number): Observable<Grupo> {
    return this.http.delete(`${API_URL}${this.rota}/${id}`) as Observable<Grupo>;
  }


}
