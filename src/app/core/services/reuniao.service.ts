import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.vars';
import { Reuniao } from '../models/reuniao.model';

@Injectable({
  providedIn: 'root'
})
export class ReuniaoService {

  rota: string = '/reunioes';

  constructor(private http: HttpClient)  {}

  getAll(): Observable<Reuniao[]> {
    return this.http.get(`${API_URL}${this.rota}`) as Observable<Reuniao[]>;
  }

  getAllByIgrejagrupo(idIgrejaGrupo: number): Observable<Reuniao[]> {
    return this.http.get(`${API_URL}${this.rota}/igrejagrupo/${idIgrejaGrupo}`) as Observable<Reuniao[]>;
  }

  get(id: number): Observable<Reuniao> {
    return this.http.get(`${API_URL}${this.rota}/${id}`) as Observable<Reuniao>;
  }

  post(reuniao: Reuniao): Observable<Reuniao> {
    return this.http.post(`${API_URL}${this.rota}`, reuniao) as Observable<Reuniao>;
  }

  put(reuniao: Reuniao): Observable<Reuniao> {
    return this.http.put(`${API_URL}${this.rota}/${reuniao.id}`, reuniao) as Observable<Reuniao>;
  }

  delete(id: number): Observable<Reuniao> {
    return this.http.delete(`${API_URL}${this.rota}/${id}`) as Observable<Reuniao>;
  }


}
