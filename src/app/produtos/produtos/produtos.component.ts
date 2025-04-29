import { firstValueFrom } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto.service';
import { TopoComponent } from '../../shared/topo/topo.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TopoComponent],
  providers: [HttpClient, ProdutoService],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos = [] as Produto[];
  
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
}
