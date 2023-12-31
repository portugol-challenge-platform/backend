import { VisitanteComumInterface } from '../interfaces';
import { Bloco } from './bloco';
import { Declaracao } from './declaracao';
export declare class ParaCada extends Declaracao {
    nomeVariavelIteracao: string;
    vetor: any;
    corpo: Bloco;
    posicaoAtual: number;
    constructor(hashArquivo: number, linha: number, nomeVariavelIteracao: string, vetor: any, corpo: Bloco);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
