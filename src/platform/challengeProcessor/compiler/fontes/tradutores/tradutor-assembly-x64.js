"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorAssemblyX64 = void 0;
const construtos_1 = require("../construtos");
const declaracoes_1 = require("../declaracoes");
class TradutorAssemblyX64 {
    constructor() {
        this.indentacao = 0;
        this.bss = 'section .bss\n';
        this.data = 'section .data\n';
        this.text = `
section .text
    global _start

_start:`;
        this.dicionarioConstrutos = {
        // AcessoIndiceVariavel: this.traduzirAcessoIndiceVariavel.bind(this),
        // AcessoMetodo: this.trazudirConstrutoAcessoMetodo.bind(this),
        // Agrupamento: this.traduzirConstrutoAgrupamento.bind(this),
        // AtribuicaoPorIndice: this.traduzirConstrutoAtribuicaoPorIndice.bind(this),
        // Atribuir: this.traduzirConstrutoAtribuir.bind(this),
        // Binario: this.traduzirConstrutoBinario.bind(this),
        // Chamada: this.traduzirConstrutoChamada.bind(this),
        // DefinirValor: this.traduzirConstrutoDefinirValor.bind(this),
        // FuncaoConstruto: this.traduzirFuncaoConstruto.bind(this),
        // Isto: () => 'this',
        // Literal: this.traduzirConstrutoLiteral.bind(this),
        // Logico: this.traduzirConstrutoLogico.bind(this),
        // TipoDe: this.traduzirConstrutoTipoDe.bind(this),
        // Unario: this.traduzirConstrutoUnario.bind(this),
        // Variavel: this.traduzirConstrutoVariavel.bind(this),
        // Vetor: this.traduzirConstrutoVetor.bind(this),
        };
        this.dicionarioDeclaracoes = {
            // Bloco: this.traduzirDeclaracaoBloco.bind(this),
            // Enquanto: this.traduzirDeclaracaoEnquanto.bind(this),
            // Continua: () => 'continue',
            // Escolha: this.traduzirDeclaracaoEscolha.bind(this),
            // Expressao: this.traduzirDeclaracaoExpressao.bind(this),
            // Fazer: this.traduzirDeclaracaoFazer.bind(this),
            // Falhar: this.traduzirDeclaracaoFalhar.bind(this),
            // FuncaoDeclaracao: this.traduzirDeclaracaoFuncao.bind(this),
            // Importar: this.traduzirDeclaracaoImportar.bind(this),
            // Leia: this.traduzirDeclaracaoLeia.bind(this),
            // Para: this.traduzirDeclaracaoPara.bind(this),
            // ParaCada: this.traduzirDeclaracaoParaCada.bind(this),
            // Retorna: this.traduzirDeclaracaoRetorna.bind(this),
            // Se: this.traduzirDeclaracaoSe.bind(this),
            // Sustar: () => 'break',
            // Classe: this.traduzirDeclaracaoClasse.bind(this),
            // Tente: this.traduzirDeclaracaoTente.bind(this),
            // Const: this.traduzirDeclaracaoConst.bind(this),
            // Var: this.traduzirDeclaracaoVar.bind(this),
            Escreva: this.traduzirDeclaracaoEscreva.bind(this),
        };
    }
    gerarDigitoAleatorio() {
        let result = '';
        const digits = '0123456789';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            result += digits.charAt(randomIndex);
        }
        return result;
    }
    // traduzirAcessoIndiceVariavel(): void {}
    // trazudirConstrutoAcessoMetodo(): void {}
    // traduzirConstrutoAgrupamento(): void {}
    // traduzirConstrutoAtribuicaoPorIndice(): void {}
    // traduzirConstrutoAtribuir(): void {}
    // traduzirConstrutoBinario(): void {}
    // traduzirConstrutoChamada(): void {}
    // traduzirConstrutoDefinirValor(): void {}
    // traduzirFuncaoConstruto(): void {}
    // traduzirConstrutoLiteral(): void {}
    // traduzirConstrutoLogico(): void {}
    // traduzirConstrutoTipoDe(): void {}
    // traduzirConstrutoUnario(): void {}
    // traduzirConstrutoVariavel(): void {}
    // traduzirConstrutoVetor(): void {}
    // traduzirDeclaracaoBloco(): void {}
    // traduzirDeclaracaoEnquanto(): void {}
    // traduzirDeclaracaoEscolha(): void {}
    // traduzirDeclaracaoExpressao(): void {}
    // traduzirDeclaracaoFazer(): void {}
    // traduzirDeclaracaoFalhar(): void {}
    // traduzirDeclaracaoFuncao(): void {}
    // traduzirDeclaracaoImportar(): void {}
    // traduzirDeclaracaoLeia(): void {}
    // traduzirDeclaracaoPara(): void {}
    // traduzirDeclaracaoParaCada(): void {}
    // traduzirDeclaracaoRetorna(): void {}
    // traduzirDeclaracaoSe(): void {}
    // traduzirDeclaracaoClasse(): void {}
    // traduzirDeclaracaoTente(): void {}
    // traduzirDeclaracaoConst(): void {}
    // traduzirDeclaracaoVar(): void {}
    criaStringLiteral(literal) {
        const varLiteral = `Delegua_${this.gerarDigitoAleatorio()}`;
        this.data += `    ${varLiteral} db '${literal.valor}', 0\n`;
        return varLiteral;
    }
    criaTamanhoNaMemoriaReferenteAVar(nomeStringLiteral) {
        const varTamanho = `tam_${nomeStringLiteral}`;
        this.data += `    ${varTamanho} equ $ - ${nomeStringLiteral}`;
        return varTamanho;
    }
    traduzirDeclaracaoEscreva(declaracaoEscreva) {
        let tam_string_literal = '';
        let nome_string_literal = '';
        if (declaracaoEscreva.argumentos[0] instanceof construtos_1.Literal) {
            nome_string_literal = this.criaStringLiteral(declaracaoEscreva.argumentos[0]);
            tam_string_literal = this.criaTamanhoNaMemoriaReferenteAVar(nome_string_literal);
        }
        this.text += `
    mov edx, ${tam_string_literal}
    mov ecx, ${nome_string_literal}
    mov ebx, 1
    mov eax, 4
    int 0x80
        `;
    }
    saida_sistema() {
        this.text += `
    mov eax, 1
    int 0x80
        `;
    }
    traduzir(declaracoes) {
        let resultado = '';
        this.declaracoesDeClasses = declaracoes.filter((declaracao) => declaracao instanceof declaracoes_1.Classe);
        for (const declaracao of declaracoes) {
            `${this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao)} \n`;
        }
        this.saida_sistema();
        resultado += this.bss + '\n' + this.data + '\n' + this.text;
        console.log(resultado);
        return resultado;
    }
}
exports.TradutorAssemblyX64 = TradutorAssemblyX64;
//# sourceMappingURL=tradutor-assembly-x64.js.map