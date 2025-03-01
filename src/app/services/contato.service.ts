import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contato } from '../interfaces/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = 'http://localhost:8080/api/contatos';  ///api/contatos/pessoa/

  constructor(private http: HttpClient) { }

  listarContatos() {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  salvarContato(contato: Contato) {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  atualizarContato(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato);
  }

}
