import { Contato } from "./contato";

export interface Pessoa {
  id: number;
  nome: string;
  endereco: string;
  cep: string;
  cidade: string;
  uf: string;
  contatos: Contato[];
}
