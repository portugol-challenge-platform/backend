import { PilhaInterface } from '../../../../interfaces';
export declare class PilhaEscopos implements PilhaInterface<any> {
    pilha: any[];
    constructor();
    empilhar(item: any): void;
    eVazio(): boolean;
    topoDaPilha(): any;
    removerUltimo(): any;
}
