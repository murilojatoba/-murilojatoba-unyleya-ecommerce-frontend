import { firstValueFrom } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  providers: [ProdutoService],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  produto = {} as Produto;

  constructor(
    private router: Router,
    private produtoService: ProdutoService
  ) {}

  async cadastrar() {
    const novo = await firstValueFrom(this.produtoService.cadastrar(this.produto));

    if (novo.id) {
      alert(`Produto cadatrado com id ${novo.id}`);
      this.produto = {} as Produto;
    }
  }

  cancelar(): void {
    this.router.navigateByUrl('/produtos');
  }
}
