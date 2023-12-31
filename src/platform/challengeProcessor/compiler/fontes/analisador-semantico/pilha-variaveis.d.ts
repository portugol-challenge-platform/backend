import { VariavelInterface } from '../interfaces';
import { PilhaInterface } from '../interfaces';
export declare class PilhaVariaveis implements PilhaInterface<{
    [nomeVariavel: string]: VariavelInterface;
}> {
    pilha: {
        [nomeVariavel: string]: VariavelInterface;
    }[];
    constructor();
    empilhar(item: {
        [nomeVariavel: string]: VariavelInterface;
    }): void;
    eVazio(): boolean;
    topoDaPilha(): {
        [nomeVariavel: string]: VariavelInterface;
    };
    removerUltimo(): {
        [nomeVariavel: string]: VariavelInterface;
    };
}
