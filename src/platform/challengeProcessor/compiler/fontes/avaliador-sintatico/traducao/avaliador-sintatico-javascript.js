"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoJavaScript = void 0;
class AvaliadorSintaticoJavaScript {
    consumir(tipo, mensagemDeErro) {
        throw new Error('Método não implementado.');
    }
    erro(simbolo, mensagemDeErro) {
        throw new Error('Método não implementado.');
    }
    verificarTipoSimboloAtual(tipo) {
        throw new Error('Método não implementado.');
    }
    verificarTipoProximoSimbolo(tipo) {
        throw new Error('Método não implementado.');
    }
    estaNoFinal() {
        throw new Error('Método não implementado.');
    }
    avancarEDevolverAnterior() {
        throw new Error('Método não implementado.');
    }
    verificarSeSimboloAtualEIgualA(...argumentos) {
        throw new Error('Método não implementado.');
    }
    primario() {
        throw new Error('Método não implementado.');
    }
    finalizarChamada(entidadeChamada) {
        throw new Error('Método não implementado.');
    }
    chamar() {
        throw new Error('Método não implementado.');
    }
    unario() {
        throw new Error('Método não implementado.');
    }
    exponenciacao() {
        throw new Error('Método não implementado.');
    }
    multiplicar() {
        throw new Error('Método não implementado.');
    }
    adicaoOuSubtracao() {
        throw new Error('Método não implementado.');
    }
    bitShift() {
        throw new Error('Método não implementado.');
    }
    bitE() {
        throw new Error('Método não implementado.');
    }
    bitOu() {
        throw new Error('Método não implementado.');
    }
    comparar() {
        throw new Error('Método não implementado.');
    }
    comparacaoIgualdade() {
        throw new Error('Método não implementado.');
    }
    em() {
        throw new Error('Método não implementado.');
    }
    e() {
        throw new Error('Método não implementado.');
    }
    ou() {
        throw new Error('Método não implementado.');
    }
    atribuir() {
        throw new Error('Método não implementado.');
    }
    blocoEscopo() {
        throw new Error('Método não implementado.');
    }
    expressao() {
        throw new Error('Método não implementado.');
    }
    declaracaoEnquanto() {
        throw new Error('Método não implementado.');
    }
    declaracaoEscreva() {
        throw new Error('Método não implementado.');
    }
    declaracaoExpressao() {
        throw new Error('Método não implementado.');
    }
    declaracaoLeia() {
        throw new Error('Método não implementado.');
    }
    declaracaoPara() {
        throw new Error('Método não implementado.');
    }
    declaracaoSe() {
        throw new Error('Método não implementado.');
    }
    declaracaoSustar() {
        throw new Error('Método não implementado.');
    }
    declaracaoContinua() {
        throw new Error('Método não implementado.');
    }
    declaracaoRetorna() {
        throw new Error('Método não implementado.');
    }
    declaracaoEscolha() {
        throw new Error('Método não implementado.');
    }
    declaracaoImportar() {
        throw new Error('Método não implementado.');
    }
    declaracaoTente() {
        throw new Error('Método não implementado.');
    }
    declaracaoFazer() {
        throw new Error('Método não implementado.');
    }
    resolverDeclaracao() {
        throw new Error('Método não implementado.');
    }
    declaracaoDeConstantes() {
        throw new Error('Método não implementado.');
    }
    declaracaoDeVariaveis() {
        throw new Error('Método não implementado.');
    }
    declaracaoDeVariavel() {
        throw new Error('Método não implementado.');
    }
    funcao(tipo) {
        throw new Error('Método não implementado.');
    }
    corpoDaFuncao(tipo) {
        throw new Error('Método não implementado.');
    }
    declaracaoDeClasse() {
        throw new Error('Método não implementado.');
    }
    resolverDeclaracaoForaDeBloco() {
        throw new Error('Método não implementado.');
    }
    analisar(retornoLexador, hashArquivo) {
        return {
            declaracoes: retornoLexador.simbolos,
            erros: [],
        };
    }
}
exports.AvaliadorSintaticoJavaScript = AvaliadorSintaticoJavaScript;
//# sourceMappingURL=avaliador-sintatico-javascript.js.map