"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorPython = void 0;
const construtos_1 = require("../construtos");
const declaracoes_1 = require("../declaracoes");
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
class TradutorPython {
    constructor() {
        this.indentacao = 0;
        this.dicionarioConstrutos = {
            AcessoMetodo: this.trazudirConstrutoAcessoMetodo.bind(this),
            Agrupamento: this.traduzirConstrutoAgrupamento.bind(this),
            Atribuir: this.traduzirConstrutoAtribuir.bind(this),
            Binario: this.traduzirConstrutoBinario.bind(this),
            Chamada: this.traduzirConstrutoChamada.bind(this),
            DefinirValor: this.traduzirConstrutoDefinirValor.bind(this),
            Literal: this.traduzirConstrutoLiteral.bind(this),
            Logico: this.traduzirConstrutoLogico.bind(this),
            Variavel: this.traduzirConstrutoVariavel.bind(this),
            Vetor: this.traduzirConstrutoVetor.bind(this),
            EscrevaMesmaLinha: this.traduzirDeclaracaoEscrevaMesmaLinha.bind(this),
            FormatacaoEscrita: this.traduzirConstrutoFormatacaoEscrita.bind(this),
        };
        this.dicionarioDeclaracoes = {
            Variavel: this.traduzirConstrutoVariavel.bind(this),
            Bloco: this.traduzirDeclaracaoBloco.bind(this),
            Classe: this.traduzirDeclaracaoClasse.bind(this),
            Const: this.traduzirDeclaracaoConst.bind(this),
            Atribuir: this.traduzirConstrutoAtribuir.bind(this),
            Continua: () => 'continue',
            Escreva: this.traduzirDeclaracaoEscreva.bind(this),
            EscrevaMesmaLinha: this.traduzirDeclaracaoEscrevaMesmaLinha.bind(this),
            Expressao: this.traduzirDeclaracaoExpressao.bind(this),
            FuncaoDeclaracao: this.traduzirDeclaracaoFuncao.bind(this),
            Leia: this.traduzirDeclaracaoLeia.bind(this),
            ParaCada: this.traduzirDeclaracaoParaCada.bind(this),
            Retorna: this.traduzirDeclaracaoRetorna.bind(this),
            Se: this.traduzirDeclaracaoSe.bind(this),
            Sustar: () => 'break',
            Tente: this.traduzirDeclaracaoTente.bind(this),
            Var: this.traduzirDeclaracaoVar.bind(this),
        };
    }
    traduzirNomeVariavel(variavel) {
        return variavel.replace(/\.?([A-Z]+)/g, (x, y) => '_' + y.toLowerCase()).replace(/^_/, '');
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
                return 'and';
            case delegua_1.default.EXPONENCIACAO:
                return '**';
            case delegua_1.default.IGUAL:
                return '==';
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
                return 'or';
            case delegua_1.default.SUBTRACAO:
                return '-';
        }
    }
    logicaComumBlocoEscopo(declaracoes) {
        let resultado = '';
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
        resultado += ' '.repeat(this.indentacao) + '\n';
        return resultado;
    }
    traduzirDeclaracaoTente(declaracaoTente) {
        let resultado = 'try:\n';
        this.indentacao += 4;
        resultado += ' '.repeat(this.indentacao);
        for (let condicao of declaracaoTente.caminhoTente) {
            resultado += this.dicionarioDeclaracoes[condicao.constructor.name](condicao) + '\n';
            resultado += ' '.repeat(this.indentacao);
        }
        if (declaracaoTente.caminhoPegue !== null) {
            resultado += '\nexcept:\n';
            resultado += ' '.repeat(this.indentacao);
            if (Array.isArray(declaracaoTente.caminhoPegue)) {
                for (let declaracao of declaracaoTente.caminhoPegue) {
                    resultado += this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao) + '\n';
                }
            }
            else {
                for (let corpo of declaracaoTente.caminhoPegue.corpo) {
                    resultado += this.dicionarioDeclaracoes[corpo.constructor.name](corpo) + '\n';
                }
            }
            resultado += ' '.repeat(this.indentacao);
        }
        if (declaracaoTente.caminhoFinalmente !== null) {
            resultado += '\nfinally:\n';
            resultado += ' '.repeat(this.indentacao);
            for (let finalmente of declaracaoTente.caminhoFinalmente) {
                resultado += this.dicionarioDeclaracoes[finalmente.constructor.name](finalmente) + '\n';
            }
        }
        return resultado;
    }
    traduzirConstrutoLogico(logico) {
        let direita = this.dicionarioConstrutos[logico.direita.constructor.name](logico.direita);
        let operador = this.traduzirSimboloOperador(logico.operador);
        let esquerda = this.dicionarioConstrutos[logico.esquerda.constructor.name](logico.esquerda);
        return `${esquerda} ${operador} ${direita}`;
    }
    traduzirConstrutoLiteral(literal) {
        if (typeof literal.valor === 'string')
            return `'${literal.valor}'`;
        if (typeof literal.valor === 'boolean') {
            return literal.valor ? 'True' : 'False';
        }
        if (typeof literal.valor != 'number')
            return 'None';
        return String(literal.valor);
    }
    trazudirConstrutoAcessoMetodo(acessoMetodo) {
        if (acessoMetodo.objeto instanceof construtos_1.Variavel) {
            let objetoVariavel = acessoMetodo.objeto;
            return `${objetoVariavel.simbolo.lexema}.${acessoMetodo.simbolo.lexema}`;
        }
        return `self.${acessoMetodo.simbolo.lexema}`;
    }
    traduzirDeclaracaoEscreva(declaracaoEscreva) {
        let resultado = 'print(';
        for (const argumento of declaracaoEscreva.argumentos) {
            const valor = this.dicionarioConstrutos[argumento.constructor.name](argumento);
            resultado += valor + ', ';
        }
        resultado = resultado.slice(0, -2);
        resultado += ')';
        return resultado;
    }
    traduzirDeclaracaoEscrevaMesmaLinha(declaracaoEscreva) {
        return this.traduzirDeclaracaoEscreva(declaracaoEscreva);
    }
    traduzirConstrutoFormatacaoEscrita(formatacaoEscrita) {
        if (formatacaoEscrita.expressao.valor)
            return JSON.stringify(String(formatacaoEscrita.expressao.valor));
        if (formatacaoEscrita.expressao instanceof construtos_1.Variavel)
            return formatacaoEscrita.expressao.simbolo.literal;
        return 'SEM VARIVAVEL';
    }
    traduzirDeclaracaoLeia(declaracaoLeia) {
        const variaveis = declaracaoLeia.argumentos.map((variavel) => variavel.simbolo.literal);
        return variaveis
            .join(' = ')
            .concat(' = input()'
                + '\n' + ' '.repeat(this.indentacao)
                + `if(${variaveis[0]}.isnumeric()):`
                + '\n' + ' '.repeat((this.indentacao || 2) * 2)
                + `${variaveis.join('=').concat(`=float(${variaveis[0]})`)}`
                + '\n' + ' '.repeat((this.indentacao || 2) * 2)
                + `if(${variaveis[0]}.is_integer()): ${variaveis.join('=').concat(`=int(${variaveis[0]})`)}`);
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
    traduzirDeclaracaoFuncao(declaracaoFuncao) {
        let resultado = 'def ';
        resultado += declaracaoFuncao.simbolo.lexema + '(';
        for (const parametro of declaracaoFuncao.funcao.parametros) {
            resultado += parametro.nome.lexema + ', ';
        }
        if (declaracaoFuncao.funcao.parametros.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += '):';
        resultado += this.logicaComumBlocoEscopo(declaracaoFuncao.funcao.corpo);
        return resultado;
    }
    traduzirDeclaracaoSe(declaracaoSe, iniciarComIf = true) {
        let resultado = '';
        if (iniciarComIf) {
            resultado += 'if ';
        }
        else {
            resultado += 'elif ';
        }
        const condicao = this.dicionarioConstrutos[declaracaoSe.condicao.constructor.name](declaracaoSe.condicao);
        resultado += condicao;
        resultado += ':\n';
        resultado += this.dicionarioDeclaracoes[declaracaoSe.caminhoEntao.constructor.name](declaracaoSe.caminhoEntao);
        if (declaracaoSe.caminhoSenao !== null) {
            resultado += ' '.repeat(this.indentacao);
            const se = declaracaoSe === null || declaracaoSe === void 0 ? void 0 : declaracaoSe.caminhoSenao;
            if (se === null || se === void 0 ? void 0 : se.caminhoEntao) {
                resultado += 'elif ';
                resultado += this.dicionarioConstrutos[se.condicao.constructor.name](se.condicao, false);
                resultado += ':\n';
                resultado += this.dicionarioDeclaracoes[se.caminhoEntao.constructor.name](se.caminhoEntao);
                resultado += ' '.repeat(this.indentacao);
                if (se === null || se === void 0 ? void 0 : se.caminhoSenao) {
                    if (se.caminhoSenao instanceof declaracoes_1.Bloco) {
                        resultado += 'else:\n';
                        resultado += this.dicionarioDeclaracoes[se.caminhoSenao.constructor.name](se.caminhoSenao, false);
                        return resultado;
                    }
                    else {
                        resultado += this.dicionarioDeclaracoes[se.caminhoSenao.constructor.name](se.caminhoSenao, false);
                        return resultado;
                    }
                }
            }
            resultado += 'else:\n';
            // resultado += ' '.repeat(this.indentacao);
            resultado += this.dicionarioDeclaracoes[declaracaoSe.caminhoSenao.constructor.name](declaracaoSe.caminhoSenao);
        }
        return resultado;
    }
    logicaTraducaoMetodoClasse(metodoClasse) {
        this.indentacao += 4;
        let resultado = ' '.repeat(this.indentacao);
        let temContrutor = metodoClasse.simbolo.lexema === 'construtor';
        resultado += temContrutor ? 'def __init__(' : 'def ' + metodoClasse.simbolo.lexema + '(';
        let temParametros = metodoClasse.funcao.parametros.length;
        resultado += temParametros ? 'self, ' : 'self';
        for (let parametro of metodoClasse.funcao.parametros) {
            resultado += parametro.nome.lexema + ', ';
        }
        if (metodoClasse.funcao.parametros.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += '):\n';
        if (metodoClasse.funcao.corpo.length === 0) {
            resultado += ' '.repeat(this.indentacao + 4);
            resultado += 'pass\n';
            this.indentacao -= 4;
            return resultado;
        }
        resultado += this.logicaComumBlocoEscopo(metodoClasse.funcao.corpo);
        resultado += ' '.repeat(this.indentacao) + '\n';
        this.indentacao -= 4;
        return resultado;
    }
    traduzirDeclaracaoClasse(declaracaoClasse) {
        let resultado = 'class ';
        if (declaracaoClasse.superClasse)
            resultado += `${declaracaoClasse.simbolo.lexema}(${declaracaoClasse.superClasse.simbolo.lexema}):\n`;
        else
            resultado += declaracaoClasse.simbolo.lexema + ':\n';
        if (declaracaoClasse.metodos.length === 0)
            return (resultado += '    pass\n');
        for (let metodo of declaracaoClasse.metodos) {
            resultado += this.logicaTraducaoMetodoClasse(metodo);
        }
        return resultado;
    }
    traduzirConstrutoChamada(chamada) {
        let resultado = '';
        const retorno = `${this.dicionarioConstrutos[chamada.entidadeChamada.constructor.name](chamada.entidadeChamada)}`;
        resultado += retorno;
        resultado += '(';
        for (let parametro of chamada.argumentos) {
            resultado += this.dicionarioConstrutos[parametro.constructor.name](parametro) + ', ';
        }
        if (chamada.argumentos.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ')';
        return resultado;
    }
    traduzirDeclaracaoRetorna(declaracaoRetorna) {
        let resultado = 'return ';
        const nomeConstrutor = declaracaoRetorna.valor.constructor.name;
        return (resultado += this.dicionarioConstrutos[nomeConstrutor](declaracaoRetorna === null || declaracaoRetorna === void 0 ? void 0 : declaracaoRetorna.valor));
    }
    traduzirConstrutoVetor(vetor) {
        if (!vetor.valores.length) {
            return '[]';
        }
        let resultado = '[';
        for (let valor of vetor.valores) {
            resultado += `${this.dicionarioConstrutos[valor.constructor.name](valor)}, `;
        }
        if (vetor.valores.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ']';
        return resultado;
    }
    traduzirConstrutoDefinirValor(definirValor) {
        let resultado = '';
        if (definirValor.objeto instanceof construtos_1.Isto) {
            resultado = 'self.' + definirValor.nome.lexema + ' = ';
        }
        resultado += definirValor.valor.simbolo.lexema;
        return resultado;
    }
    traduzirDeclaracaoVar(declaracaoVar) {
        let resultado = '';
        resultado += this.traduzirNomeVariavel(declaracaoVar.simbolo.lexema);
        resultado += ' = ';
        const inicializador = declaracaoVar.inicializador;
        if (inicializador) {
            if (this.dicionarioConstrutos[inicializador.constructor.name]) {
                resultado += this.dicionarioConstrutos[declaracaoVar.inicializador.constructor.name](declaracaoVar.inicializador);
            }
            else {
                resultado += this.dicionarioDeclaracoes[declaracaoVar.inicializador.constructor.name](declaracaoVar.inicializador);
            }
        }
        else {
            resultado += 'None';
        }
        return resultado;
    }
    traduzirDeclaracaoConst(declaracaoConst) {
        let resultado = '';
        resultado += this.traduzirNomeVariavel(declaracaoConst.simbolo.lexema);
        resultado += ' = ';
        const inicializador = declaracaoConst.inicializador;
        if (inicializador) {
            if (this.dicionarioConstrutos[inicializador.constructor.name]) {
                resultado += this.dicionarioConstrutos[declaracaoConst.inicializador.constructor.name](declaracaoConst.inicializador);
            }
            else {
                resultado += this.dicionarioDeclaracoes[declaracaoConst.inicializador.constructor.name](declaracaoConst.inicializador);
            }
        }
        else {
            resultado += 'None';
        }
        return resultado;
    }
    traduzirDeclaracaoParaCada(declaracaoParaCada) {
        let resultado = `for ${declaracaoParaCada.nomeVariavelIteracao} in `;
        resultado +=
            this.dicionarioConstrutos[declaracaoParaCada.vetor.constructor.name](declaracaoParaCada.vetor) + ':\n';
        resultado += this.dicionarioDeclaracoes[declaracaoParaCada.corpo.constructor.name](declaracaoParaCada.corpo);
        return resultado;
    }
    traduzirConstrutoAtribuir(atribuir) {
        let resultado = atribuir.simbolo.lexema;
        resultado += ' = ' + this.dicionarioConstrutos[atribuir.valor.constructor.name](atribuir.valor);
        return resultado;
    }
    traduzirConstrutoVariavel(variavel) {
        return variavel.simbolo.lexema;
    }
    traduzirDeclaracaoExpressao(declaracaoExpressao) {
        return this.dicionarioConstrutos[declaracaoExpressao.expressao.constructor.name](declaracaoExpressao.expressao);
    }
    traduzirDeclaracaoBloco(declaracaoBloco) {
        return this.logicaComumBlocoEscopo(declaracaoBloco.declaracoes);
    }
    traduzirConstrutoAgrupamento(agrupamento) {
        return this.dicionarioConstrutos[agrupamento.constructor.name](agrupamento.expressao || agrupamento);
    }
    traduzir(declaracoes) {
        let resultado = '';
        for (const declaracao of declaracoes) {
            resultado += `${this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao)} \n`;
        }
        return resultado.replace(/\n{2,}/g, '\n');
    }
}
exports.TradutorPython = TradutorPython;
//# sourceMappingURL=tradutor-python.js.map