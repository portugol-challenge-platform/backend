import { CodePointCharStream, CommonTokenStream } from 'antlr4ts';
import { ExprContext, Python3Parser, StmtContext, Expr_stmtContext, Simple_assignContext } from './python/python3-parser';
import { Python3Lexer } from './python/python3-lexer';
import { Python3Listener } from './python/python3-listener';
/**
 * Tradutor reverso de Python para Delégua.
 * Utiliza o ecossistema do ANTLR para percorrer código em
 * Python e traduzir para Delégua.
 */
export declare class TradutorReversoPython implements Python3Listener {
    inputStream: CodePointCharStream;
    lexer: Python3Lexer;
    parser: Python3Parser;
    tokenStream: CommonTokenStream;
    resultado: string;
    /**
     * Aqui é preciso contar se o contexto tem filhos.
     * Há alguns casos em que este código é executado mais
     * de uma vez por algum motivo.
     * @param ctx O contexto da atribuição.
     */
    enterSimple_assign(ctx: Simple_assignContext): void;
    /**
     * Aparentemente é o melhor lugar para escrever quebras de linha.
     * @param ctx Contexto da instrução.
     */
    exitStmt(ctx: StmtContext): void;
    enterExpr_stmt(ctx: Expr_stmtContext): void;
    enterExpr(ctx: ExprContext): void;
    exitExpr(ctx: ExprContext): void;
    traduzir(codigo: string): string;
}
