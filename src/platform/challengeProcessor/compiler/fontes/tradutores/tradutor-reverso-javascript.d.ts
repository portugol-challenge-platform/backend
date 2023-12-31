import { ArrayExpression, BinaryExpression, ClassDeclaration, Directive, DoWhileStatement, ForInStatement, ForOfStatement, ForStatement, Identifier, IfStatement, Literal, MemberExpression, ModuleDeclaration, NewExpression, ReturnStatement, Statement, SwitchStatement, TryStatement, UpdateExpression, VariableDeclaration, WhileStatement } from 'estree';
import { TradutorInterface } from '../interfaces';
/**
 * Esse tradutor traduz de JavaScript para Delégua.
 */
export declare class TradutorReversoJavaScript implements TradutorInterface<Statement | Directive | ModuleDeclaration> {
    indentacao: number;
    constructor();
    traduzirSimboloOperador(operador: any): string;
    traduzirFuncoesNativas(metodo: string): string;
    traduzirConstrutoVetor(vetor: ArrayExpression): string;
    traduzirIdentificador(identificador: Identifier): string;
    traduzirAtualizacaoVariavel(atualizarVariavel: UpdateExpression): string;
    traduzirNovo(novo: NewExpression): string;
    traduzirExpressao(expressao: MemberExpression): string;
    traduzirConstrutoLogico(logico: any): string;
    dicionarioConstrutos: {
        AssignmentExpression: any;
        ArrayExpression: any;
        ArrowFunctionExpression: any;
        BinaryExpression: any;
        CallExpression: any;
        Identifier: any;
        Literal: any;
        LogicalExpression: any;
        MemberExpression: any;
        NewExpression: any;
        ThisExpression: () => string;
        UpdateExpression: any;
    };
    traduzirConstrutoChamada(chamada: any): string;
    traduzirConstrutoAtribuir(atribuir: any): string;
    traduzirExpressaoDeclaracao(declaracao: any): string;
    traduzirConstrutoLiteral(literal: Literal): string;
    traduzirConstrutoBinario(binario: BinaryExpression): string;
    traduzirDeclaracaoVariavel(declaracao: VariableDeclaration): string;
    logicaComumBlocoEscopo(declaracoes: any): string;
    traduzirDeclaracaoPara(declaracao: ForStatement): string;
    traduzirDeclaracaoParaDe(declaracao: ForInStatement | ForOfStatement): string;
    traduzirDeclaracaoFuncao(declaracao: any): string;
    traduzirDeclaracaoClasse(declaracao: ClassDeclaration): string;
    traduzirDeclaracaoRetorna(declaracao: ReturnStatement): string;
    traduzirDeclaracaoEnquanto(declaracao: WhileStatement): string;
    traduzirDeclaracaoFazerEnquanto(declaracao: DoWhileStatement): string;
    traduzirDeclaracaoSe(declaracao: IfStatement): string;
    traduzirDeclaracaoTente(declaracao: TryStatement): string;
    traduzirDeclaracaoEscolha(declaracao: SwitchStatement): string;
    traduzirDeclaracao(declaracao: any): string;
    traduzir(declaracoes: (Statement | Directive | ModuleDeclaration)[]): string;
}
