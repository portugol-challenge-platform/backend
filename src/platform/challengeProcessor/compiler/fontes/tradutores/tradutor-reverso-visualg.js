"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorReversoVisuAlg = void 0;
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
/**
 * Este tradutor reverso traduz de VisuAlg para Delégua.
 */
class TradutorReversoVisuAlg {
    constructor() {
        this.indentacao = 0;
        this.dicionarioConstrutos = {
            Agrupamento: this.traduzirConstrutoAgrupamento.bind(this),
            Binario: this.traduzirConstrutoBinario.bind(this),
            FimPara: this.traduzirConstrutoFimPara.bind(this),
            Literal: this.traduzirConstrutoLiteral.bind(this),
            Logico: this.traduzirConstrutoLogico.bind(this),
            Variavel: this.traduzirConstrutoVariavel.bind(this),
        };
        this.dicionarioDeclaracoes = {
            Atribuir: this.traduzirDeclaracaoAtribuir.bind(this),
            Bloco: this.traduzirDeclaracaoBloco.bind(this),
            EscrevaMesmaLinha: this.tradzirDeclaracaoEscrevaMesmaLinha.bind(this),
            Escolha: this.traduzirDeclaracaoEscolha.bind(this),
            Escreva: this.traduzirDeclaracaoEscreva.bind(this),
            Leia: this.traduzirDeclaracaoLeia.bind(this),
            Para: this.traduzirDeclaracaoPara.bind(this),
            Se: this.traduzirDeclaracaoSe.bind(this),
            Var: this.traduzirDeclaracaoVar.bind(this),
        };
    }
    traduzirSimboloOperador(operador) {
        switch (operador.tipo) {
            case delegua_1.default.ADICAO:
                return '+';
            case delegua_1.default.BIT_AND:
                return '&';
            case delegua_1.default.BIT_OR:
                return '|';
            case delegua_1.default.BIT_XOR:
                return '^';
            case delegua_1.default.BIT_NOT:
                return '~';
            case delegua_1.default.DIFERENTE:
                return '!=';
            case delegua_1.default.DIVISAO:
                return '/';
            case delegua_1.default.E:
                return 'e';
            case delegua_1.default.EXPONENCIACAO:
                return '**';
            case delegua_1.default.IGUAL:
                return '=';
            case delegua_1.default.IGUAL_IGUAL:
                return '==';
            case delegua_1.default.MAIOR:
                return '>';
            case delegua_1.default.MAIOR_IGUAL:
                return '>=';
            case delegua_1.default.MENOR:
                return '<';
            case delegua_1.default.MENOR_IGUAL:
                return '<=';
            case delegua_1.default.MODULO:
                return '%';
            case delegua_1.default.MULTIPLICACAO:
                return '*';
            case delegua_1.default.OU:
                return 'ou';
            case delegua_1.default.SUBTRACAO:
                return '-';
        }
    }
    traduzirConstrutoAgrupamento(agrupamento) {
        return this.dicionarioConstrutos[agrupamento.constructor.name](agrupamento.expressao || agrupamento);
    }
    traduzirDeclaracaoAtribuir(atribuir) {
        let resultado = atribuir.simbolo.lexema;
        resultado += ' = ' + this.dicionarioConstrutos[atribuir.valor.constructor.name](atribuir.valor);
        return resultado;
    }
    traduzirConstrutoBinario(binario) {
        let resultado = '';
        if (binario.esquerda.constructor.name === 'Agrupamento')
            resultado += '(' + this.dicionarioConstrutos[binario.esquerda.constructor.name](binario.esquerda) + ')';
        else
            resultado += this.dicionarioConstrutos[binario.esquerda.constructor.name](binario.esquerda);
        let operador = this.traduzirSimboloOperador(binario.operador);
        resultado += ` ${operador} `;
        if (binario.direita.constructor.name === 'Agrupamento')
            resultado += '(' + this.dicionarioConstrutos[binario.direita.constructor.name](binario.direita) + ')';
        else
            resultado += this.dicionarioConstrutos[binario.direita.constructor.name](binario.direita);
        return resultado;
    }
    traduzirConstrutoFimPara(fimPara) {
        if (fimPara.incremento === null || fimPara.incremento === undefined) {
            return '';
        }
        const expressao = fimPara.incremento;
        const atribuir = expressao.expressao;
        const variavel = atribuir.simbolo.lexema;
        return `${variavel}++`;
    }
    traduzirConstrutoLiteral(literal) {
        if (typeof literal.valor === 'string')
            return `'${literal.valor}'`;
        return literal.valor;
    }
    traduzirConstrutoVariavel(variavel) {
        return variavel.simbolo.lexema;
    }
    logicaComumBlocoEscopo(declaracoes) {
        let resultado = '{\n';
        this.indentacao += 4;
        if (typeof declaracoes[Symbol.iterator] === 'function') {
            for (const declaracaoOuConstruto of declaracoes) {
                resultado += ' '.repeat(this.indentacao);
                const nomeConstrutor = declaracaoOuConstruto.constructor.name;
                if (this.dicionarioConstrutos.hasOwnProperty(nomeConstrutor)) {
                    resultado += this.dicionarioConstrutos[nomeConstrutor](declaracaoOuConstruto);
                }
                else {
                    resultado += this.dicionarioDeclaracoes[nomeConstrutor](declaracaoOuConstruto);
                }
                resultado += '\n';
            }
        }
        this.indentacao -= 4;
        resultado += ' '.repeat(this.indentacao) + '}\n';
        return resultado;
    }
    traduzirDeclaracaoBloco(declaracaoBloco) {
        return this.logicaComumBlocoEscopo(declaracaoBloco.declaracoes);
    }
    logicaComumCaminhosEscolha(caminho) {
        var _a, _b;
        let resultado = '';
        this.indentacao += 4;
        resultado += ' '.repeat(this.indentacao);
        if ((_a = caminho === null || caminho === void 0 ? void 0 : caminho.condicoes) === null || _a === void 0 ? void 0 : _a.length) {
            for (let condicao of caminho.condicoes) {
                resultado += 'caso ' + this.dicionarioConstrutos[condicao.constructor.name](condicao) + ':\n';
                resultado += ' '.repeat(this.indentacao);
            }
        }
        if ((_b = caminho === null || caminho === void 0 ? void 0 : caminho.declaracoes) === null || _b === void 0 ? void 0 : _b.length) {
            for (let declaracao of caminho.declaracoes) {
                resultado += ' '.repeat(this.indentacao + 4);
                resultado += this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao) + '\n';
            }
            resultado += ' '.repeat(this.indentacao + 4);
        }
        this.indentacao -= 4;
        return resultado;
    }
    traduzirDeclaracaoEscolha(declaracaoEscolha) {
        let resultado = 'escolha (';
        resultado +=
            this.dicionarioConstrutos[declaracaoEscolha.identificadorOuLiteral.constructor.name](declaracaoEscolha.identificadorOuLiteral) + ') {\n';
        for (let caminho of declaracaoEscolha.caminhos) {
            resultado += this.logicaComumCaminhosEscolha(caminho);
        }
        if (declaracaoEscolha.caminhoPadrao) {
            resultado += ' '.repeat(4);
            resultado += 'padrao:\n';
            resultado += this.logicaComumCaminhosEscolha(declaracaoEscolha.caminhoPadrao);
        }
        resultado += '}\n';
        return resultado;
    }
    traduzirDeclaracaoEscreva(declaracaoEscreva) {
        let resultado = 'escreva(';
        for (const argumento of declaracaoEscreva.argumentos) {
            const valor = this.dicionarioConstrutos[argumento.expressao.constructor.name](argumento.expressao);
            resultado += valor + ', ';
        }
        resultado = resultado.slice(0, -2);
        resultado += ')';
        return resultado;
    }
    traduzirDeclaracaoLeia(declaracaoLeia) {
        let resultado = '';
        for (const parametro of declaracaoLeia.argumentos) {
            resultado += `${this.dicionarioConstrutos[parametro.constructor.name](parametro)} = leia()\n`;
        }
        return resultado;
    }
    traduzirDeclaracaoPara(declaracaoPara) {
        let resultado = 'para (';
        resultado +=
            this.dicionarioDeclaracoes[declaracaoPara.inicializador.constructor.name](declaracaoPara.inicializador) +
                ' ';
        resultado += !resultado.includes(';') ? ';' : '';
        resultado +=
            this.dicionarioConstrutos[declaracaoPara.condicao.constructor.name](declaracaoPara.condicao) + '; ';
        resultado +=
            this.dicionarioDeclaracoes[declaracaoPara.incrementar.constructor.name](declaracaoPara.incrementar) + ') ';
        resultado += this.dicionarioDeclaracoes[declaracaoPara.corpo.constructor.name](declaracaoPara.corpo);
        return resultado;
    }
    traduzirDeclaracaoSe(declaracaoSe) {
        let resultado = 'se (';
        const condicao = this.dicionarioConstrutos[declaracaoSe.condicao.constructor.name](declaracaoSe.condicao);
        resultado += condicao;
        resultado += ')';
        resultado += this.dicionarioDeclaracoes[declaracaoSe.caminhoEntao.constructor.name](declaracaoSe.caminhoEntao);
        if (declaracaoSe.caminhoSenao !== null) {
            resultado += ' '.repeat(this.indentacao);
            resultado += 'senao ';
            resultado += this.dicionarioDeclaracoes[declaracaoSe.caminhoSenao.constructor.name](declaracaoSe.caminhoSenao);
        }
        return resultado;
    }
    traduzirDeclaracaoVar(declaracaoVar) {
        let resultado = 'var ';
        resultado += declaracaoVar.simbolo.lexema;
        if (!(declaracaoVar === null || declaracaoVar === void 0 ? void 0 : declaracaoVar.inicializador))
            resultado += ';';
        else if (Array.isArray(declaracaoVar === null || declaracaoVar === void 0 ? void 0 : declaracaoVar.inicializador.valor))
            resultado += ' = []';
        else {
            resultado += ' = ';
            if (this.dicionarioConstrutos[declaracaoVar.inicializador.constructor.name]) {
                resultado += this.dicionarioConstrutos[declaracaoVar.inicializador.constructor.name](declaracaoVar.inicializador);
            }
            else {
                resultado += this.dicionarioDeclaracoes[declaracaoVar.inicializador.constructor.name](declaracaoVar.inicializador);
            }
            resultado += ';';
        }
        return resultado;
    }
    tradzirDeclaracaoEscrevaMesmaLinha(declaracaoEscreva) {
        return this.traduzirDeclaracaoEscreva(declaracaoEscreva);
    }
    traduzirConstrutoLogico(logico) {
        let direita = this.dicionarioConstrutos[logico.direita.constructor.name](logico.direita);
        let operador = this.traduzirSimboloOperador(logico.operador);
        let esquerda = this.dicionarioConstrutos[logico.esquerda.constructor.name](logico.esquerda);
        return `${direita} ${operador} ${esquerda}`;
    }
    traduzir(declaracoes) {
        let resultado = '';
        for (const declaracao of declaracoes) {
            resultado += `${this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao)} \n`;
        }
        return resultado;
    }
}
exports.TradutorReversoVisuAlg = TradutorReversoVisuAlg;
//# sourceMappingURL=tradutor-reverso-visualg.js.map