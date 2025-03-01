import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { CadastrarPessoaComponent } from './pages/cadastrar-pessoa/cadastrar-pessoa.component';
import { ListagemPessoasComponent } from './pages/listagem-pessoas/listagem-pessoas.component';
import { ContatoService } from './services/contato.service';
import { PessoaService } from './services/pessoa.service';
import { SalvarContatoComponent } from './pages/salvar-contato/salvar-contato.component';
import { AtualizarPessoaComponent } from './pages/atualizar-pessoa/atualizar-pessoa.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HerosectionComponent,
    ListagemPessoasComponent,
    CadastrarPessoaComponent,
    SalvarContatoComponent,
    AtualizarPessoaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PessoaService,
    ContatoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
