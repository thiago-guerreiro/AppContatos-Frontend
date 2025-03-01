import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HerosectionComponent } from './components/herosection/herosection.component';
import { AtualizarPessoaComponent } from './pages/atualizar-pessoa/atualizar-pessoa.component';
import { CadastrarPessoaComponent } from './pages/cadastrar-pessoa/cadastrar-pessoa.component';
import { ListagemPessoasComponent } from './pages/listagem-pessoas/listagem-pessoas.component';
import { SalvarContatoComponent } from './pages/salvar-contato/salvar-contato.component';

const routes: Routes = [
  {
    path: '', component: HerosectionComponent
  },
  {
    path: 'pessoas', component: ListagemPessoasComponent
  },
  {
    path: 'cadastrar-pessoa', component: CadastrarPessoaComponent
  },
  {
    path: 'contatos/:pessoaId', component: SalvarContatoComponent
  },
  {
    path: 'pessoas/editar/:id', component: AtualizarPessoaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
