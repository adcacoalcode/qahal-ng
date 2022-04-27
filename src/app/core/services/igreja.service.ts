import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.vars';
import { Igreja } from '../models/igreja.model';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {

  rota: string = '/igrejas';

  constructor(private http: HttpClient)  {}

  getAll(): Observable<Igreja[]> {
    return this.http.get(`${API_URL}${this.rota}`) as Observable<Igreja[]>;
  }

  getAllByIgrejagrupo(idIgrejaGrupo: number): Observable<Igreja[]> {
    return this.http.get(`${API_URL}${this.rota}/igrejagrupo/${idIgrejaGrupo}`) as Observable<Igreja[]>;
  }

  get(id: number): Observable<Igreja> {
    return this.http.get(`${API_URL}${this.rota}/${id}`) as Observable<Igreja>;
  }

  post(igreja: Igreja): Observable<Igreja> {
    return this.http.post(`${API_URL}${this.rota}`, igreja) as Observable<Igreja>;
  }

  put(igreja: Igreja): Observable<Igreja> {
    return this.http.put(`${API_URL}${this.rota}/${igreja.id}`, igreja) as Observable<Igreja>;
  }

  delete(id: number): Observable<Igreja> {
    return this.http.delete(`${API_URL}${this.rota}/${id}`) as Observable<Igreja>;
  }


}
