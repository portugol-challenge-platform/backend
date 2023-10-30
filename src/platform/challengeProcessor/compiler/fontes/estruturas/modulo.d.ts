import { Chamavel } from './chamavel';
export declare class DeleguaModulo {
    nome: string;
    componentes: {
        [nome: string]: Chamavel;
    };
    constructor(nome?: string);
    toString(): string;
}
