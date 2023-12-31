"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorReversoPython = void 0;
const antlr4ts_1 = require("antlr4ts");
const python3_parser_1 = require("./python/python3-parser");
const ParseTreeWalker_1 = require("antlr4ts/tree/ParseTreeWalker");
const python3_lexer_1 = require("./python/python3-lexer");
/**
 * Tradutor reverso de Python para Delégua.
 * Utiliza o ecossistema do ANTLR para percorrer código em
 * Python e traduzir para Delégua.
 */
class TradutorReversoPython {
    /**
     * Aqui é preciso contar se o contexto tem filhos.
     * Há alguns casos em que este código é executado mais
     * de uma vez por algum motivo.
     * @param ctx O contexto da atribuição.
     */
    enterSimple_assign(ctx) {
        if (ctx.childCount > 0) {
            this.resultado += ' = ';
        }
    }
    /**
     * Aparentemente é o melhor lugar para escrever quebras de linha.
     * @param ctx Contexto da instrução.
     */
    exitStmt(ctx) {
        this.resultado += ctx.stop.text;
    }
    enterExpr_stmt(ctx) {
        // console.log(ctx.start.text);
    }
    enterExpr(ctx) {
        switch (ctx.start.text) {
            case 'input':
                this.resultado += 'leia(';
                break;
            case 'print':
                this.resultado += 'escreva(';
                break;
            default:
                this.resultado += ctx.start.text;
                break;
        }
    }
    exitExpr(ctx) {
        switch (ctx.start.text) {
            case 'input':
            case 'print':
                this.resultado += ')';
                break;
            default:
                break;
        }
    }
    traduzir(codigo) {
        this.inputStream = antlr4ts_1.CharStreams.fromString(codigo);
        this.lexer = new python3_lexer_1.Python3Lexer(this.inputStream);
        this.tokenStream = new antlr4ts_1.CommonTokenStream(this.lexer);
        this.parser = new python3_parser_1.Python3Parser(this.tokenStream);
        this.resultado = '';
        // Aqui achei três bons pontos de entrada:
        // single_input, file_input e eval_input. O que funcionou melhor foi o file_input.
        let tree = this.parser.file_input();
        ParseTreeWalker_1.ParseTreeWalker.DEFAULT.walk(this, tree);
        return this.resultado;
    }
}
exports.TradutorReversoPython = TradutorReversoPython;
//# sourceMappingURL=tradutor-reverso-python.js.map