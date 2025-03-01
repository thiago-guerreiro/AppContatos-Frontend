import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarPessoaComponent } from './atualizar-pessoa.component';

describe('AtualizarPessoaComponent', () => {
  let component: AtualizarPessoaComponent;
  let fixture: ComponentFixture<AtualizarPessoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizarPessoaComponent]
    });
    fixture = TestBed.createComponent(AtualizarPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
