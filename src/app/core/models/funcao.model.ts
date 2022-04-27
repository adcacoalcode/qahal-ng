import { Igrejagrupo } from "./igrejagrupo.model";
import { Membro } from "./membro.model";

export class Funcao {
  id?: number;
  nome?: string;
  membros?: Membro[];
  igrejagrupo?: Igrejagrupo;
  //reunioes?: Reuniao[];
  //eventos?: Evento[];
  //programacoes?: Programacao[];
}
