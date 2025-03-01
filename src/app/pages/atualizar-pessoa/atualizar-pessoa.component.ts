import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato, TipoContato } from 'src/app/interfaces/contato';
import { Viacep } from 'src/app/interfaces/viacep';
import { ContatoService } from 'src/app/services/contato.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ViacepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-atualizar-pessoa',
  templateUrl: './atualizar-pessoa.component.html',
  styleUrls: ['./atualizar-pessoa.component.css']
})
export class AtualizarPessoaComponent implements OnInit {

  pessoaForm: FormGroup;
  contatosFormArray: FormArray;
  tiposContato = Object.values(TipoContato);
  viacep: Viacep | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private contatoService: ContatoService,
    private viacepService: ViacepService,
    private fb: FormBuilder
  )
  {
    this.pessoaForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      contatos: this.fb.array([])
    });

    this.contatosFormArray = this.pessoaForm.get('contatos') as FormArray;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.pessoaService.getPessoa(id).subscribe(pessoa => {
        this.pessoaForm.patchValue({
          id: pessoa.id,
          nome: pessoa.nome,
          endereco: pessoa.endereco,
          cep: pessoa.cep,
          cidade: pessoa.cidade,
          uf: pessoa.uf
        });

        pessoa.contatos.forEach(contato => {
          this.adicionarContato(contato);
        });
      });
    }
  }

  buscarCep(): void {
    if (this.pessoaForm.get('cep')?.value) {
      this.viacepService.buscarCep(this.pessoaForm.get('cep')?.value).subscribe(viacep => {
        this.viacep = viacep;
        this.pessoaForm.patchValue({
          endereco: viacep.logradouro,
          cidade: viacep.localidade,
          uf: viacep.uf
        });
      });
    }
  }

  adicionarContato(contato: Contato = { tipoContato: TipoContato.CELULAR, contato: '', pessoa: { id: this.pessoaForm.get('id')?.value } }): void {
    const contatoGroup = this.fb.group({
      tipoContato: [contato.tipoContato, Validators.required],
      contato: [contato.contato, [Validators.required, Validators.minLength(5)]],
      pessoa: [contato.pessoa]
    });
    this.contatosFormArray.push(contatoGroup);
  }

  removerContato(index: number): void {
    this.contatosFormArray.removeAt(index);
  }

  salvar(): void {
    if (this.pessoaForm.valid) {
      this.pessoaService.atualizarPessoa(this.pessoaForm.get('id')?.value, this.pessoaForm.value).subscribe(pessoaAtualizada => {
        const contatos: Contato[] = this.pessoaForm.get('contatos')?.value;
        contatos.forEach((contato: Contato) => {
          contato.pessoa = { id: pessoaAtualizada.id };
          if (contato.id) {
            this.contatoService.atualizarContato(contato.id, contato).subscribe();
          } else {
            this.contatoService.salvarContato(contato).subscribe();
          }
        });

        this.router.navigate(['/pessoas']);
      });
    }
  }

}
