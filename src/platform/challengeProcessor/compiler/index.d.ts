import { Statement, Directive, ModuleDeclaration } from 'estree';
import { AvaliadorSintaticoJavaScript } from './fontes/avaliador-sintatico/traducao/avaliador-sintatico-javascript';
import { LexadorJavaScript } from './fontes/lexador/traducao/lexador-javascript';
import { RetornoAvaliadorSintatico, RetornoLexador } from './fontes/interfaces/retornos';
import { AvaliadorSintaticoInterface, LexadorInterface, SimboloInterface } from './fontes/interfaces';
import { Declaracao } from './fontes/declaracoes';
export interface RetornoImportador<TSimbolo, TDeclaracao> {
    conteudoArquivo: string[];
    nomeArquivo: string;
    hashArquivo: number;
    retornoLexador: RetornoLexador<TSimbolo>;
    retornoAvaliadorSintatico: RetornoAvaliadorSintatico<TDeclaracao>;
}
export interface ImportadorInterface<TSimbolo, TDeclaracao> {
    diretorioBase: string;
    conteudoArquivosAbertos: {
        [identificador: string]: string[];
    };
    importar(caminhoRelativoArquivo: string, importacaoInicial: boolean): RetornoImportador<TSimbolo, TDeclaracao>;
}
export declare class Importador implements ImportadorInterface<SimboloInterface, Declaracao> {
    diretorioBase: string;
    lexador: LexadorInterface<SimboloInterface>;
    avaliadorSintatico: AvaliadorSintaticoInterface<SimboloInterface, Declaracao>;
    arquivosAbertos: {
        [identificador: string]: string;
    };
    conteudoArquivosAbertos: {
        [identificador: string]: string[];
    };
    depuracao: boolean;
    constructor(lexador: LexadorInterface<SimboloInterface>, avaliadorSintatico: AvaliadorSintaticoInterface<SimboloInterface, Declaracao>, arquivosAbertos: {
        [identificador: string]: string;
    }, conteudoArquivosAbertos: {
        [identificador: string]: string[];
    }, depuracao: boolean);
    importar(caminhoRelativoArquivo: string, importacaoInicial?: boolean): RetornoImportador<SimboloInterface, Declaracao>;
}
export declare class ImportadorJavaScript implements ImportadorInterface<(Statement | Directive | ModuleDeclaration), (Statement | Directive | ModuleDeclaration)> {
    diretorioBase: string;
    conteudoArquivosAbertos: {
        [identificador: string]: string[];
    };
    lexador: LexadorJavaScript;
    avaliadorSintatico: AvaliadorSintaticoJavaScript;
    constructor();
    importar(caminhoRelativoArquivo: string, importacaoInicial: boolean): RetornoImportador<(Statement | Directive | ModuleDeclaration), (Statement | Directive | ModuleDeclaration)>;
}
