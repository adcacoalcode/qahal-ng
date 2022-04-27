import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.vars';
import { Cargo } from '../models/cargo.model';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  rota: string = '/cargos';

  constructor(private http: HttpClient)  {}

  getAll(): Observable<Cargo[]> {
    return this.http.get(`${API_URL}${this.rota}`) as Observable<Cargo[]>;
  }

  getAllByIgrejagrupo(idIgrejaGrupo: number): Observable<Cargo[]> {
    return this.http.get(`${API_URL}${this.rota}/igrejagrupo/${idIgrejaGrupo}`) as Observable<Cargo[]>;
  }

  get(id: number): Observable<Cargo> {
    return this.http.get(`${API_URL}${this.rota}/${id}`) as Observable<Cargo>;
  }

  post(cargo: Cargo): Observable<Cargo> {
    return this.http.post(`${API_URL}${this.rota}`, cargo) as Observable<Cargo>;
  }

  put(cargo: Cargo): Observable<Cargo> {
    return this.http.put(`${API_URL}${this.rota}/${cargo.id}`, cargo) as Observable<Cargo>;
  }

  delete(id: number): Observable<Cargo> {
    return this.http.delete(`${API_URL}${this.rota}/${id}`) as Observable<Cargo>;
  }


}
