import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Produtos } from './pages/produtos/produtos';
import { Carrinho } from './pages/carrinho/carrinho';
import { Admin } from './pages/admin/admin';
import { Contato } from './pages/contato/contato';

export const routes: Routes = [
  { path: '', component: Login }, 
  { path: 'home', component: Home },     
  { path: 'produtos', component: Produtos },
  { path: 'carrinho', component: Carrinho },
  { path: 'admin', component: Admin },
  { path: 'contato', component: Contato },
  { path: 'login', component: Login }
];