import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pessoa } from 'src/app/interfaces/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ViacepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.css']
})
export class CadastrarPessoaComponent {

  pessoaForm: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private viacepService: ViacepService,
    private fb: FormBuilder
  )
  {
    this.pessoaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cep: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required]
    });
  }

  criarPessoa() {
    if (this.pessoaForm.valid) {
      const pessoa: Pessoa = this.pessoaForm.value;
      this.pessoaService.salvarPessoa(pessoa).subscribe(
        (pessoaCriada) => {
          console.log('Pessoa criada:', pessoaCriada);
          this.router.navigate(['/contatos', pessoaCriada.id]);
        },
        (erro) => {
          console.error('Erro ao criar pessoa:', erro);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  buscarCep() {
    const cep = this.pessoaForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.viacepService.buscarCep(cep).subscribe(
        (dadosCep) => {
          this.pessoaForm.patchValue({
            endereco: dadosCep.logradouro,
            cidade: dadosCep.localidade,
            uf: dadosCep.uf
          });
        },
        (erro) => {
          console.error('Erro ao buscar CEP:', erro);
        }
      );
    }
  }

}
