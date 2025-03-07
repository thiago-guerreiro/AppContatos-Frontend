import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Pessoa } from '../interfaces/pessoa';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiUrl = 'http://localhost:8080/api/pessoas';

  constructor(private http: HttpClient) { }

  listarPessoas(page: number = 0, size: number = 10): Observable<Response<Pessoa>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Response<Pessoa>>(this.apiUrl, { params });
  }

  salvarPessoa(pessoa: Partial<Pessoa>) {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  atualizarPessoa(id: number, pessoa: Partial<Pessoa>): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoa);
  }

  excluir(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
