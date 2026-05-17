import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  // URL da API do JSON Server
  apiUrl = 'http://localhost:3000/produtos';

  carrinho: any[] = [];

  constructor(private http: HttpClient) {

    this.carregarCarrinho();
  }

  // -----------------> CRUDS DOS PRODUTOS DO SITE <-----------------

  // os produtos vêm da API
  getProdutos(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);
  }

  // adiciona produto na API
  adicionarProduto(p: any) {

    return this.http.post(this.apiUrl, p);
  }

  // atualiza produto pelo id
  atualizarProduto(id: number, novo: any) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      novo
    );
  }

  // remove produto pelo id
  excluirProduto(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  // -----------------> OPERAÇÕES DO CARRINHO <-----------------

  carregarCarrinho() {

    const dados = localStorage.getItem('carrinho');

    if (dados) {

      this.carrinho = JSON.parse(dados);
    }
  }

  salvarCarrinho() {

    localStorage.setItem(
      'carrinho',
      JSON.stringify(this.carrinho)
    );
  }

  adicionarCarrinho(p: any) {

    this.carrinho.push(p);

    this.salvarCarrinho();
  }

  getCarrinho() {

    return this.carrinho;
  }

  removerCarrinho(i: number) {

    this.carrinho.splice(i, 1);

    this.salvarCarrinho();
  }

  limparCarrinho() {

    this.carrinho = [];

    this.salvarCarrinho();
  }
}