import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html'
})
export class Admin {

  produtos: any[] = [];

  modalNovo = false;
  modalEditar = false;
  modalExcluir = false;

  novo: any = {};
  editando: any = {};

  // agora armazenamos o id do produto
  idSelecionado = -1;

  motivo: string = '';

  constructor(private service: ProdutoService) {}

  ngOnInit() {

    this.carregarProdutos();
  }

  //listagem dos pdrodutos contidos na API
  carregarProdutos() {

    this.service.getProdutos().subscribe((dados: any[]) => {

      this.produtos = dados;

    });
  }

  // -----------------> ABRIR MODAIS <-----------------

  abrirNovo() {

    this.novo = {};

    this.modalNovo = true;
  }

  abrirEditar(produto: any) {

  this.idSelecionado = produto.id;

  this.editando = { ...produto };

  this.modalEditar = true;
}

  abrirExcluir(produto: any) {

    // salva o id do produto selecionado
    this.idSelecionado = produto.id;;

    this.modalExcluir = true;
  }

  fecharModal() {

    this.modalNovo = false;
    this.modalEditar = false;
    this.modalExcluir = false;
  }

  // -----------------> CREATE <-----------------

  salvarNovo() {

    if (!this.novo.nome || !this.novo.preco) return;

    this.service.adicionarProduto(this.novo).subscribe(() => {

      // recarrega os produtos após adicionar
      this.carregarProdutos();

      this.novo = {};

      this.fecharModal();
    });
  }

  // -----------------> UPDATE <-----------------

  salvarEdicao() {

    this.service.atualizarProduto(
      this.idSelecionado,
      this.editando
    ).subscribe(() => {

      // atualiza lista após edição
      this.carregarProdutos();

      this.fecharModal();
    });
  }

  // -----------------> DELETE <-----------------

  confirmarExclusao() {

    this.service.excluirProduto(
      this.idSelecionado
    ).subscribe(() => {

      // atualiza lista após exclusão
      this.carregarProdutos();

      this.fecharModal();
    });
  }

  // -----------------> UPLOAD NOVO PRODUTO <-----------------

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      this.novo.imagem = reader.result;
    };

    reader.readAsDataURL(file);
  }

  // -----------------> EDITAR IMAGEM DO PRODUTO <-----------------

  onFileSelectedEditar(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      this.editando.imagem = reader.result;
    };

    reader.readAsDataURL(file);
  }
  trackByProduto(index: number, produto: any): number {
  return produto.id;
}
}