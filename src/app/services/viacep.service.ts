import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Viacep } from '../interfaces/viacep';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  private apiUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  buscarCep(cep: string) {
    return this.http.get<Viacep>(`${this.apiUrl}${cep}/json`);
  }

}
