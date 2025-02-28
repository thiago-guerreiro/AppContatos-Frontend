import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato, TipoContato } from 'src/app/interfaces/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-salvar-contato',
  templateUrl: './salvar-contato.component.html',
  styleUrls: ['./salvar-contato.component.css']
})
export class SalvarContatoComponent {

  pessoaId: number | null = null;
  contatoForm: FormGroup;
  tiposContato = Object.values(TipoContato);
  contatoSalvoCelular: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router,
    private fb: FormBuilder
  )
  {
    this.contatoForm = this.fb.group({
      tipoContato: [TipoContato.CELULAR, Validators.required],
      contato: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.pessoaId = Number(this.route.snapshot.paramMap.get('pessoaId'));
    if (this.pessoaId) {
      this.contatoForm.patchValue({
        pessoa: { id: this.pessoaId }
      });
    }
  }

  salvarContato() {
    if (this.contatoForm.valid) {
      const contato: Contato = this.contatoForm.value;

      contato.pessoa = { id: this.pessoaId || 0 };

      this.contatoService.salvarContato(contato).subscribe(
        (contatoSalvo) => {
          console.log('Contato salvo:', contatoSalvo);
          if (contato.tipoContato === TipoContato.CELULAR) {
            this.contatoSalvoCelular = true;
            this.contatoForm.reset({
              tipoContato: TipoContato.EMAIL,
              contato: ''
            });
          } else {
            this.router.navigate(['/pessoas']);
          }
        },
        (erro) => {
          console.error('Erro ao salvar contato:', erro);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  exibirFormularioEmail(): boolean {
    return this.contatoSalvoCelular && this.contatoForm.get('tipoContato')?.value === TipoContato.EMAIL;
  }

}
