import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Construto } from './construto';
export declare class Unario implements Construto {
    linha: number;
    hashArquivo: number;
    operador: SimboloInterface;
    operando: any;
    incidenciaOperador: 'ANTES' | 'DEPOIS';
    constructor(hashArquivo: number, operador: SimboloInterface, operando: any, incidenciaOperador?: 'ANTES' | 'DEPOIS');
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
