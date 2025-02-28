import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarContatoComponent } from './salvar-contato.component';

describe('SalvarContatoComponent', () => {
  let component: SalvarContatoComponent;
  let fixture: ComponentFixture<SalvarContatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalvarContatoComponent]
    });
    fixture = TestBed.createComponent(SalvarContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
