import { VisitanteComumInterface } from '../interfaces';
export declare class Declaracao {
    linha: number;
    hashArquivo: number;
    assinaturaMetodo: string;
    constructor(linha: number, hashArquivo: number);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
