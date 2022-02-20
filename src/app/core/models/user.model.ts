import { Igrejagrupo } from "./igrejagrupo.model";

export class User {
    id: number;
    nome: string;
    email: string;
    password: string;
    permissoes: any;
    igrejagrupo: Igrejagrupo;
}
