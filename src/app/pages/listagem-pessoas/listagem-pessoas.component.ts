import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TipoContato } from 'src/app/interfaces/contato';
import { Pessoa } from 'src/app/interfaces/pessoa';
import { Response } from 'src/app/interfaces/response';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-listagem-pessoas',
  templateUrl: './listagem-pessoas.component.html',
  styleUrls: ['./listagem-pessoas.component.css']
})
export class ListagemPessoasComponent {

  pessoas: Pessoa[] = [];
  TipoContato = TipoContato;
  currentPage = 0;
  pageSize = 10;
  totalPages = 3;

  constructor(private pessoaService: PessoaService, private router: Router) {}

  ngOnInit() {
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.pessoaService.listarPessoas(this.currentPage, this.pageSize).subscribe({
      next: (response: Response<Pessoa>) => {
        this.pessoas = response.content;
        this.totalPages = response.totalPages;
        console.log(response);
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  getCelular(pessoa: Pessoa): string {
    const contatoCelular = pessoa.contatos.find(contato => contato.tipoContato === TipoContato.CELULAR);
    return contatoCelular ? contatoCelular.contato : '';
  }

  getEmail(pessoa: Pessoa): string {
    const contatoEmail = pessoa.contatos.find(contato => contato.tipoContato === TipoContato.EMAIL);
    return contatoEmail ? contatoEmail.contato : '';
  }

  mudarPagina(pagina: number) {
    if (pagina >= 0 && pagina < this.totalPages) {
      this.currentPage = pagina;
      this.carregarPessoas();
    }
  }

  editarPessoa(id: number): void {
    this.router.navigate(['/pessoas/editar', id]);
  }

  excluirPessoa(id: number): void {
    if (confirm('Deseja realmente excluir esta pessoa?')) {
      this.pessoaService.excluir(id).subscribe(() => {
        this.carregarPessoas();
      });
    }
  }

}
