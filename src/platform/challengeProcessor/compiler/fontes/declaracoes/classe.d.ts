import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';
import { FuncaoDeclaracao } from './funcao';
import { PropriedadeClasse } from './propriedade-classe';
export declare class Classe extends Declaracao {
    simbolo: SimboloInterface;
    superClasse: any;
    metodos: FuncaoDeclaracao[];
    propriedades: PropriedadeClasse[];
    constructor(simbolo: SimboloInterface, superClasse: any, metodos: FuncaoDeclaracao[], propriedades?: PropriedadeClasse[]);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
