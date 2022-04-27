import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.vars';
import { Membro } from '../models/membro.model';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  rota: string = '/membros';

  constructor(private http: HttpClient)  {}

  getAll(): Observable<Membro[]> {
    return this.http.get(`${API_URL}${this.rota}`) as Observable<Membro[]>;
  }

  getAllByIgrejagrupo(idIgrejaGrupo: number): Observable<Membro[]> {
    return this.http.get(`${API_URL}${this.rota}/igrejagrupo/${idIgrejaGrupo}`) as Observable<Membro[]>;
  }

  get(id: number): Observable<Membro> {
    return this.http.get(`${API_URL}${this.rota}/${id}`) as Observable<Membro>;
  }

  post(membro: Membro): Observable<Membro> {
    return this.http.post(`${API_URL}${this.rota}`, membro) as Observable<Membro>;
  }

  put(membro: Membro): Observable<Membro> {
    return this.http.put(`${API_URL}${this.rota}/${membro.id}`, membro) as Observable<Membro>;
  }

  delete(id: number): Observable<Membro> {
    return this.http.delete(`${API_URL}${this.rota}/${id}`) as Observable<Membro>;
  }


}
