import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {


  constructor(private http: HttpClient)  {}

  get(cep: string): Observable<Endereco> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`) as Observable<Endereco>;
  }

  getUfs(): Observable<any> {
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`) as Observable<any>;
  }

}
