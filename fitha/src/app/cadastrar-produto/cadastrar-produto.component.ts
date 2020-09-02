import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from './../model/Produto';
import { ProdutoService } from '../service/produto.service';
import { CategoriaModel } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  categoria:CategoriaModel = new CategoriaModel()
  listCategoria: CategoriaModel[]
  idCategoria: number
  
  produto: ProdutoModel = new ProdutoModel()
  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router  ) { }

  ngOnInit() {
    this.findAllCategorias()
    
  }

  cadastrar() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria


    if (this.produto.cor == null || this.produto.descricao == null || this.produto.material == null || this.produto.nome == null ||
      this.produto.preco == null || this.produto.quantidade == null || this.produto.categoria == null) {
      alert("Preencha todos os campos")
    }
    else {
      this.produtoService.postProduto(this.produto).subscribe((resp: ProdutoModel) => {
        this.produto = resp
        this.produto = new ProdutoModel()
        alert('foi rapaz')
       

      })
    }
  }
  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: CategoriaModel) => {
      this.categoria = resp
    })
  }
  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp:CategoriaModel[]) => {
      this.listCategoria = resp
    })
  }
}