import { Cargo } from "./cargo.model";
import { Funcao } from "./funcao.model";
import { Grupo } from "./grupo.model";
import { Igrejagrupo } from "./igrejagrupo.model";
import { Membro } from "./membro.model";

export class Reuniao {
    id?: number;
    titulo?: string;
    assunto?: string;
    conteudo?: string;
    data?: string;
    horarioIni?: string;
    horarioFim?: string;
    prensencaAberta?: boolean;

    responsavel?: Membro;
    //presencas?: Presenca[];
    cargo?: Cargo;
    funcao?: Funcao;
    grupo?: Grupo;
    igrejagrupo?: Igrejagrupo;
}
