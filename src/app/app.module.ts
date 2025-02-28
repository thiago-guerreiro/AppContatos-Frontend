import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { ListagemPessoasComponent } from './pages/listagem-pessoas/listagem-pessoas.component';
import { ContatoService } from './services/contato.service';
import { PessoaService } from './services/pessoa.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HerosectionComponent,
    ListagemPessoasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PessoaService,
    ContatoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
