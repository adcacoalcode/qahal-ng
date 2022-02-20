import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.vars';
import { Igrejagrupo } from '../models/igrejagrupo.model';

@Injectable({
  providedIn: 'root'
})
export class IgrejagrupoService {

  rota: string = '/igrejagrupos';

  constructor(private http: HttpClient)  {}

  getAll(): Observable<Igrejagrupo[]> {
    return this.http.get(`${API_URL}${this.rota}`) as Observable<Igrejagrupo[]>;
  }

  get(id: number): Observable<Igrejagrupo> {
    return this.http.get(`${API_URL}${this.rota}/${id}`) as Observable<Igrejagrupo>;
  }

  post(igrejagrupo: Igrejagrupo): Observable<Igrejagrupo> {
    return this.http.post(`${API_URL}${this.rota}`, igrejagrupo) as Observable<Igrejagrupo>;
  }

  put(igrejagrupo: Igrejagrupo): Observable<Igrejagrupo> {
    return this.http.put(`${API_URL}${this.rota}/${igrejagrupo.id}`, igrejagrupo) as Observable<Igrejagrupo>;
  }

  delete(id: number): Observable<Igrejagrupo> {
    return this.http.delete(`${API_URL}${this.rota}/${id}`) as Observable<Igrejagrupo>;
  }


}
