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

  listar(id: number): Observable<Produto> {
    return this.http.get<Produto>(this.endpoint + id);
  }

  cadastrar(produto: Produto): Observable<Produto> {
    try {
      return this.http.post<Produto>(this.endpoint, produto);

    } catch(error){
      throw new Error('Houve erro ao cadastrar o produto');
    }
  }

  excluir(id: number): Observable<void> {
    try {
      return this.http.delete<void>(this.endpoint + id);

    } catch(error){
      throw new Error('Houve erro ao excluir o produto');
    }
  }

  editar(produto: Produto): Observable<Produto> {
    try {
      return this.http.put<Produto>(this.endpoint + produto.id, produto);

    } catch(error){
      throw new Error('Houve erro ao editar o produto');
    }
  }

}
