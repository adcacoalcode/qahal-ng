import { Igrejagrupo } from "./igrejagrupo.model";
import { Membro } from "./membro.model";

export class Igreja {
  id?: number;
  nome?: string;
  cep?: string; 
  uf?: string;
  localidade?: string;  
  bairro?: string; 
  logradouro?: string; 
  numero?: string;
  igrejagrupo?: Igrejagrupo;
  membros?: Membro[];
}
