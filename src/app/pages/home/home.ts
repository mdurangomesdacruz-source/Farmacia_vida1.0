import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './home.html'
})
export class Home {

  // array inicializado vazio para evitar erros de undefined
  produtos: any[] = [];

  busca: string = '';

  constructor(
    private service: ProdutoService,
    private router: Router
  ) {}

  ngOnInit() {

    // os produtos vem diretamente da API,
    // então precisamos usar subscribe()
    this.service.getProdutos().subscribe((dados: any[]) => {

      console.log(dados);

      // pega apenas os 4 primeiros produtos cadastrados para mostrar na home
      this.produtos = dados.slice(0, 6);

    });
  }

  comprar(p: any) {

    this.service.adicionarCarrinho(p);
  }

  irParaProdutos() {

    this.router.navigate(['/produtos']);
  }

  buscarProduto() {

    this.router.navigate(['/produtos']);
  }
  trackByProduto(index: number, produto: any): number {
  return produto.id;
}
}