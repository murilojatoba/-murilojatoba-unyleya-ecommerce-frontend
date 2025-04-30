import { firstValueFrom } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';

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
export class CadastroComponent implements OnInit {

  produto = {} as Produto;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (!id) {
      return;
    }

    this.produto = await firstValueFrom(this.produtoService.listar(id));
  }

  gravar(): void {
    this.produto.id ? this.editar() : this.cadastrar();
  }

  async cadastrar() {
    try {
      const novo = await firstValueFrom(this.produtoService.cadastrar(this.produto));

      if (novo.id) {
        alert(`Produto cadatrado com sucesso! Id ${novo.id}`);
        this.produto = {} as Produto;
      }
    } catch (error: any) {
      alert(`Houve erro ao cadastrar o produto: ${error.error.message}`);
    }
  }

  async editar() {
    try {
      const editado = await firstValueFrom(this.produtoService.editar(this.produto));

      alert(`Produto editado com sucesso!`);
      this.cancelar();

    } catch (error: any) {
      alert(`Houve erro ao cadastrar o produto: ${error.error.message}`);
    }
  }

  cancelar(): void {
    this.router.navigateByUrl('/produtos');
  }
}
