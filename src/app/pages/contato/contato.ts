import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contato.html'
})
export class Contato {

  nome: string = '';
  email: string = '';
  mensagem: string = '';

  enviar() {

    if (!this.nome || !this.email || !this.mensagem) {
      alert('Preencha todos os campos!');
      return;
    }

    console.log({
      nome: this.nome,
      email: this.email,
      mensagem: this.mensagem
    });

    alert('Mensagem enviada com sucesso!');

    // limpar formulário
    this.nome = '';
    this.email = '';
    this.mensagem = '';
  }
}
