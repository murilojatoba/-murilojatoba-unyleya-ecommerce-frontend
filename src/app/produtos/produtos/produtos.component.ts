import { firstValueFrom } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto.service';
import { TopoComponent } from '../../shared/topo/topo.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatIconModule, TopoComponent],
  providers: [HttpClient, ProdutoService],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos = [] as Produto[];
  displayedColumns: string[] = ['acoes', 'codigo', 'nome', 'preco'];
  
  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ){}
  
  async ngOnInit() {
    this.produtos = await firstValueFrom(this.produtoService.listarTodos());
  }

  novo(): void {
    this.router.navigateByUrl('/produtos/cadastro');
  }

  async excluir(id: number) {
    try {
      await firstValueFrom(this.produtoService.excluir(id));
      alert(`Produto excluído com sucesso!`);

      this.ngOnInit();

    } catch (error: any) {
      alert(`Houve erro ao excluir o produto: ${error.error.message}`);
    }
  }

  editar(id: number): void {
    this.router.navigateByUrl(`/produtos/cadastro/${id}`);
  }
}
