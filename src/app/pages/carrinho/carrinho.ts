import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrinho.html'
})
export class Carrinho {

  carrinho: any[] = [];
  total: number = 0;
  busca: string = '';

  constructor(private service: ProdutoService) {}

  ngOnInit() {
    this.carrinho = this.service.getCarrinho();
    this.calcularTotal();
  }

  remover(i: number) {
    this.service.removerCarrinho(i);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.carrinho.reduce((acc, item) => acc + item.preco, 0);
  }

  finalizar() {
    alert('Compra finalizada!');
    this.carrinho = [];
    this.total = 0;
  }

  buscarProduto() {
    alert('Busca disponível na página de produtos');
  }
}
