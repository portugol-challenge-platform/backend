import { SimboloInterface } from '../interfaces';
import { DeleguaClasse } from './delegua-classe';
export declare class ObjetoDeleguaClasse {
    classe: DeleguaClasse;
    campos: any;
    constructor(classe: any);
    obter(simbolo: SimboloInterface): any;
    definir(simbolo: SimboloInterface, valor: any): void;
    toString(): string;
}
