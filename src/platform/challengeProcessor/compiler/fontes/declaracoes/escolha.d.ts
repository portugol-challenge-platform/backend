import { Construto } from '../construtos';
import { VisitanteComumInterface } from '../interfaces';
import { CaminhoEscolha } from '../interfaces/construtos';
import { Declaracao } from './declaracao';
/**
 * Declaração de escolha de caminho a executar de acordo com literal ou identificador.
 */
export declare class Escolha extends Declaracao {
    identificadorOuLiteral: Construto;
    caminhos: CaminhoEscolha[];
    caminhoPadrao: CaminhoEscolha;
    constructor(identificadorOuLiteral: Construto, caminhos: CaminhoEscolha[], caminhoPadrao: CaminhoEscolha);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
