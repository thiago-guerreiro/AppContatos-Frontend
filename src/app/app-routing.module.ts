import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HerosectionComponent } from './components/herosection/herosection.component';
import { ListagemPessoasComponent } from './pages/listagem-pessoas/listagem-pessoas.component';

const routes: Routes = [
  {
    path: '', component: HerosectionComponent
  },
  {
    path: 'pessoas', component: ListagemPessoasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
