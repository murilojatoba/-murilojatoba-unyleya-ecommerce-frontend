import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './produtos/cadastro/cadastro.component';
import { ProdutosComponent } from './produtos/produtos/produtos.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'produtos',
    component: ProdutosComponent
  },
  {
    path: 'produtos/cadastro',
    component: CadastroComponent
  },  
];
