import { VisitanteComumInterface } from '../../../interfaces';
declare const _default: {
    cabeça: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    cauda: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    contém: (interpretador: VisitanteComumInterface, texto: string, caractere: string) => Promise<any>;
    descarte: (interpretador: VisitanteComumInterface, texto: string, posicao: number) => Promise<any>;
    descarte_enquanto: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    divida: (interpretador: VisitanteComumInterface, texto: string, separador?: string) => Promise<any>;
    injete: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    insira: (interpretador: VisitanteComumInterface, texto: string, posicao: number, elemento: string) => Promise<any>;
    inteiro: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    inverta: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    junte: (interpretador: VisitanteComumInterface, texto: string, separador: string) => Promise<any>;
    lista: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    maiúsculo: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    minúsculo: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    ordene: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    qual_tipo: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    pegue: (interpretador: VisitanteComumInterface, texto: string, caracteres: number) => Promise<any>;
    pegue_enquanto: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    posição: (interpretador: VisitanteComumInterface, texto: string, caractere: string) => Promise<any>;
    real: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    remova: (interpretador: VisitanteComumInterface, texto: string, posicao: number) => Promise<any>;
    selecione: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    tamanho: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
    último: (interpretador: VisitanteComumInterface, texto: string) => Promise<any>;
};
export default _default;
