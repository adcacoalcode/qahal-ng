import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.vars';
import { Funcao } from '../models/funcao.model';

@Injectable({
  providedIn: 'root'
})
export class FuncaoService {

  rota: string = '/funcoes';

  constructor(private http: HttpClient)  {}

  getAll(): Observable<Funcao[]> {
    return this.http.get(`${API_URL}${this.rota}`) as Observable<Funcao[]>;
  }

  getAllByIgrejagrupo(idIgrejaGrupo: number): Observable<Funcao[]> {
    return this.http.get(`${API_URL}${this.rota}/igrejagrupo/${idIgrejaGrupo}`) as Observable<Funcao[]>;
  }

  get(id: number): Observable<Funcao> {
    return this.http.get(`${API_URL}${this.rota}/${id}`) as Observable<Funcao>;
  }

  post(funcao: Funcao): Observable<Funcao> {
    return this.http.post(`${API_URL}${this.rota}`, funcao) as Observable<Funcao>;
  }

  put(funcao: Funcao): Observable<Funcao> {
    return this.http.put(`${API_URL}${this.rota}/${funcao.id}`, funcao) as Observable<Funcao>;
  }

  delete(id: number): Observable<Funcao> {
    return this.http.delete(`${API_URL}${this.rota}/${id}`) as Observable<Funcao>;
  }


}
