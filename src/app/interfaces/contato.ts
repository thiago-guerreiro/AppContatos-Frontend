export enum TipoContato {
  TELEFONE = 'TELEFONE',
  CELULAR = 'CELULAR',
  EMAIL = 'EMAIL'
}

export interface Contato {
  id?: number;
  tipoContato: TipoContato;
  contato: string;
  pessoa: {
    id: number;
  };
}
