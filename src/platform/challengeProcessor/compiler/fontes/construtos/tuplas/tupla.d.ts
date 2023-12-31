import { VisitanteComumInterface } from '../../interfaces';
import { Construto } from '../construto';
export declare abstract class Tupla implements Construto {
    linha: number;
    hashArquivo: number;
    valor?: any;
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
