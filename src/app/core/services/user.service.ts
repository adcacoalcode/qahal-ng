import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.vars';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  rota: string = '/users';

  constructor(private http: HttpClient)  {}

  getAll(): Observable<User[]> {
    return this.http.get(`${API_URL}${this.rota}`) as Observable<User[]>;
  }

  getAllByIgrejagrupo(idIgrejaGrupo: number): Observable<User[]> {
    return this.http.get(`${API_URL}${this.rota}/igrejagrupo/${idIgrejaGrupo}`) as Observable<User[]>;
  }

  get(id: number): Observable<User> {
    return this.http.get(`${API_URL}${this.rota}/${id}`) as Observable<User>;
  }

  post(user: User): Observable<User> {
    return this.http.post(`${API_URL}${this.rota}`, user) as Observable<User>;
  }

  put(user: User): Observable<User> {
    return this.http.put(`${API_URL}${this.rota}/${user.id}`, user) as Observable<User>;
  }

  delete(id: number): Observable<User> {
    return this.http.delete(`${API_URL}${this.rota}/${id}`) as Observable<User>;
  }


}
