import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login {
  tipo: string = 'cliente';
  email: string = '';
  senha: string = '';

usuarios = [ // Simulação de tipos de login
{
email: 'adminvida@email.com',
senha:  'admin1234',
tipo:  'admin'
},
{
email: 'clientevida@gmail.com',
senha: 'cliente1234',
tipo:  'cliente'

}
];

  constructor(private router: Router) {}

  entrar() {

    // Validação de campos

    if (!this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

// Adição de verificador de usuário

    const usuarioLocalizado = this.usuarios.find(
      usuario => 
      usuario.email === this.email && 
      usuario.senha === this.senha
    );

//Adição da busca do tipo de usuário
  if (!usuarioLocalizado) {
    alert('Email ou senha inválidos!');
    return;
  }

//Adição do verificador de acesso

  if (usuarioLocalizado.tipo !== this.tipo) {
    alert('Tipo de acesso inválido!');
    return;
  }
    // salva login (simulação)
    localStorage.setItem('usuario', this.email);
    localStorage.setItem('tipo', this.tipo);

    // redirecionamento
    if (this.tipo === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
