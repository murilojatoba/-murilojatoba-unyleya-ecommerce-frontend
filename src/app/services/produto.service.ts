import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  endpoint = `http://localhost:8080/produtos/`;

  constructor(
    private http: HttpClient
  ) { }

  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.endpoint);
  }

  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.endpoint, produto);
  }
}
