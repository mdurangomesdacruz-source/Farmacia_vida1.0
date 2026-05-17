import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './produtos.html'
})
export class Produtos {

  // arrays inicializados vazios para evitar erros de undefined no HTML
  produtos: any[] = [];
  produtosFiltrados: any[] = [];

  busca: string = '';
  mensagem: string = '';

  constructor(
    private service: ProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    // os produtos vem diretamente da API,
    // então precisamos usar subscribe()
    this.service.getProdutos().subscribe((dados: any[]) => {

      this.produtos = dados;
      this.produtosFiltrados = dados;

    });
  }

  comprar(p: any) {

    this.service.adicionarCarrinho(p);

    this.mensagem = 'Item adicionado ao carrinho!';
    this.cdr.detectChanges(); // força a atualização da view para mostrar a mensagem após a ação de compra

    setTimeout(() => {

      this.mensagem = '';
      this.cdr.detectChanges();

    }, 2000);

    // foi necessário a criação deste trecho porque antes,
    // a mensagem não saia da tela, com esse trecho, a mensagem desaparece após 2 segundos,
    // uma vez que é forçado a atualização da view
  }

  buscarProduto() {

    // converte o termo de busca para minúsculas assim evitando problemas de case-sensitive
    const termo = this.busca.toLowerCase();

    this.produtosFiltrados = this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
  }

  trackByProduto(index: number, produto: any): number {
  return produto.id;
}
}