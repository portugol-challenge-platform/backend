"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorAssemblyScript = void 0;
const construtos_1 = require("../construtos");
const declaracoes_1 = require("../declaracoes");
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
class TradutorAssemblyScript {
    constructor() {
        this.indentacao = 0;
        this.dicionarioConstrutos = {
            AcessoIndiceVariavel: this.traduzirAcessoIndiceVariavel.bind(this),
            AcessoMetodo: this.trazudirConstrutoAcessoMetodo.bind(this),
            Agrupamento: this.traduzirConstrutoAgrupamento.bind(this),
            AtribuicaoPorIndice: this.traduzirConstrutoAtribuicaoPorIndice.bind(this),
            Atribuir: this.traduzirConstrutoAtribuir.bind(this),
            Binario: this.traduzirConstrutoBinario.bind(this),
            Chamada: this.traduzirConstrutoChamada.bind(this),
            DefinirValor: this.traduzirConstrutoDefinirValor.bind(this),
            FuncaoConstruto: this.traduzirFuncaoConstruto.bind(this),
            Isto: () => 'this',
            Literal: this.traduzirConstrutoLiteral.bind(this),
            Logico: this.traduzirConstrutoLogico.bind(this),
            TipoDe: this.traduzirConstrutoTipoDe.bind(this),
            Unario: this.traduzirConstrutoUnario.bind(this),
            Variavel: this.traduzirConstrutoVariavel.bind(this),
            Vetor: this.traduzirConstrutoVetor.bind(this),
        };
        this.dicionarioDeclaracoes = {
            Bloco: this.traduzirDeclaracaoBloco.bind(this),
            Enquanto: this.traduzirDeclaracaoEnquanto.bind(this),
            Continua: () => 'continue',
            Escolha: this.traduzirDeclaracaoEscolha.bind(this),
            Expressao: this.traduzirDeclaracaoExpressao.bind(this),
            Fazer: this.traduzirDeclaracaoFazer.bind(this),
            Falhar: this.traduzirDeclaracaoFalhar.bind(this),
            FuncaoDeclaracao: this.traduzirDeclaracaoFuncao.bind(this),
            Importar: this.traduzirDeclaracaoImportar.bind(this),
            Leia: this.traduzirDeclaracaoLeia.bind(this),
            Para: this.traduzirDeclaracaoPara.bind(this),
            ParaCada: this.traduzirDeclaracaoParaCada.bind(this),
            Retorna: this.traduzirDeclaracaoRetorna.bind(this),
            Se: this.traduzirDeclaracaoSe.bind(this),
            Sustar: () => 'break',
            Classe: this.traduzirDeclaracaoClasse.bind(this),
            Tente: this.traduzirDeclaracaoTente.bind(this),
            Const: this.traduzirDeclaracaoConst.bind(this),
            Var: this.traduzirDeclaracaoVar.bind(this),
            Escreva: this.traduzirDeclaracaoEscreva.bind(this),
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
                return '!==';
            case delegua_1.default.DIVISAO:
                return '/';
            case delegua_1.default.E:
                return '&&';
            case delegua_1.default.EXPONENCIACAO:
                return '**';
            case delegua_1.default.IGUAL:
                return '=';
            case delegua_1.default.IGUAL_IGUAL:
                return '===';
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
                return '||';
            case delegua_1.default.SUBTRACAO:
                return '-';
        }
    }
    traduzirFuncoesNativas(metodo) {
        switch (metodo.toLowerCase()) {
            case 'adicionar':
            case 'empilhar':
                return 'push';
            case 'concatenar':
                return 'concat';
            case 'fatiar':
                return 'slice';
            case 'inclui':
                return 'includes';
            case 'inverter':
                return 'reverse';
            case 'juntar':
                return 'join';
            case 'ordenar':
                return 'sort';
            case 'removerprimeiro':
                return 'shift';
            case 'removerultimo':
                return 'pop';
            case 'tamanho':
                return 'length';
            case 'maiusculo':
                return 'toUpperCase';
            case 'minusculo':
                return 'toLowerCase';
            case 'substituir':
                return 'replace';
            default:
                return metodo;
        }
    }
    traduzirDeclaracaoEscreva(declaracaoEscreva) {
        let resultado = 'console.log(';
        for (const argumento of declaracaoEscreva.argumentos) {
            const valor = this.dicionarioConstrutos[argumento.constructor.name](argumento);
            resultado += valor + ', ';
        }
        resultado = resultado.slice(0, -2);
        resultado += ')';
        return resultado;
    }
    traduzirConstrutoLiteral(literal) {
        if (typeof literal.valor === 'string')
            return `'${literal.valor}'`;
        return literal.valor;
    }
    resolveTipoDeclaracaoVarEContante(tipo) {
        switch (tipo) {
            case 'texto':
                return ': string';
            case 'inteiro':
            case 'real':
                return ': f64';
            case 'logico':
                return ': bool';
            case 'nulo':
                return ': null';
            case 'inteiro[]':
            case 'real[]':
                return ': f64[]';
            case 'texto[]':
                return ': string[]';
            case 'logico[]':
                return ': bool[]';
            default:
                return ': any';
        }
    }
    traduzirDeclaracaoVar(declaracaoVar) {
        let resultado = 'let ';
        resultado += declaracaoVar.simbolo.lexema;
        resultado += this.resolveTipoDeclaracaoVarEContante(declaracaoVar.tipo);
        if (!(declaracaoVar === null || declaracaoVar === void 0 ? void 0 : declaracaoVar.inicializador))
            resultado += ';';
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
    traduzirDeclaracaoConst(declaracaoConst) {
        let resultado = 'const ';
        resultado += declaracaoConst.simbolo.lexema;
        resultado += this.resolveTipoDeclaracaoVarEContante(declaracaoConst.tipo);
        if (!(declaracaoConst === null || declaracaoConst === void 0 ? void 0 : declaracaoConst.inicializador))
            resultado += ';';
        else {
            resultado += ' = ';
            if (this.dicionarioConstrutos[declaracaoConst.inicializador.constructor.name]) {
                resultado += this.dicionarioConstrutos[declaracaoConst.inicializador.constructor.name](declaracaoConst.inicializador);
            }
            else {
                resultado += this.dicionarioDeclaracoes[declaracaoConst.inicializador.constructor.name](declaracaoConst.inicializador);
            }
            resultado += ';';
        }
        return resultado;
    }
    traduzirDeclaracaoTente(declaracaoTente) {
        let resultado = 'try {\n';
        this.indentacao += 4;
        resultado += ' '.repeat(this.indentacao);
        for (let condicao of declaracaoTente.caminhoTente) {
            resultado += this.dicionarioDeclaracoes[condicao.constructor.name](condicao) + '\n';
            resultado += ' '.repeat(this.indentacao);
        }
        resultado += '}';
        if (declaracaoTente.caminhoPegue !== null) {
            resultado += '\ncatch {\n';
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
            resultado += '}';
        }
        if (declaracaoTente.caminhoFinalmente !== null) {
            resultado += '\nfinally {\n';
            for (let finalmente of declaracaoTente.caminhoFinalmente) {
                resultado += this.dicionarioDeclaracoes[finalmente.constructor.name](finalmente) + '\n';
            }
            resultado += ' '.repeat(this.indentacao);
            resultado += '}';
        }
        return resultado;
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
    logicaTraducaoMetodoClasse(metodoClasse) {
        this.indentacao += 4;
        let resultado = ' '.repeat(this.indentacao);
        resultado += metodoClasse.simbolo.lexema === 'construtor' ? 'constructor(' : metodoClasse.simbolo.lexema + '(';
        for (let parametro of metodoClasse.funcao.parametros) {
            resultado += parametro.nome.lexema + ', ';
        }
        if (metodoClasse.funcao.parametros.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ') ';
        resultado += this.logicaComumBlocoEscopo(metodoClasse.funcao.corpo);
        resultado += ' '.repeat(this.indentacao) + '\n';
        this.indentacao -= 4;
        return resultado;
    }
    traduzirDeclaracaoClasse(declaracaoClasse) {
        let resultado = 'export class ';
        if (declaracaoClasse.superClasse)
            resultado += `${declaracaoClasse.simbolo.lexema} extends ${declaracaoClasse.superClasse.simbolo.lexema} {\n`;
        else
            resultado += declaracaoClasse.simbolo.lexema + ' {\n';
        for (let metodo of declaracaoClasse.metodos) {
            resultado += this.logicaTraducaoMetodoClasse(metodo);
        }
        resultado += '}';
        return resultado;
    }
    traduzirDeclaracaoSe(declaracaoSe) {
        let resultado = 'if (';
        const condicao = this.dicionarioConstrutos[declaracaoSe.condicao.constructor.name](declaracaoSe.condicao);
        resultado += condicao;
        resultado += ')';
        resultado += this.dicionarioDeclaracoes[declaracaoSe.caminhoEntao.constructor.name](declaracaoSe.caminhoEntao);
        if (declaracaoSe.caminhoSenao !== null) {
            resultado += ' '.repeat(this.indentacao);
            resultado += 'else ';
            const se = declaracaoSe === null || declaracaoSe === void 0 ? void 0 : declaracaoSe.caminhoSenao;
            if (se === null || se === void 0 ? void 0 : se.caminhoEntao) {
                resultado += 'if (';
                resultado += this.dicionarioConstrutos[se.condicao.constructor.name](se.condicao);
                resultado += ')';
                resultado += this.dicionarioDeclaracoes[se.caminhoEntao.constructor.name](se.caminhoEntao);
                resultado += ' '.repeat(this.indentacao);
                if (se === null || se === void 0 ? void 0 : se.caminhoSenao) {
                    resultado += 'else ';
                    resultado += this.dicionarioDeclaracoes[se.caminhoSenao.constructor.name](se.caminhoSenao);
                    return resultado;
                }
            }
            resultado += this.dicionarioDeclaracoes[declaracaoSe.caminhoSenao.constructor.name](declaracaoSe.caminhoSenao);
        }
        return resultado;
    }
    traduzirDeclaracaoRetorna(declaracaoRetorna) {
        let resultado = 'return ';
        const nomeConstrutor = declaracaoRetorna.valor.constructor.name;
        return (resultado += this.dicionarioConstrutos[nomeConstrutor](declaracaoRetorna === null || declaracaoRetorna === void 0 ? void 0 : declaracaoRetorna.valor));
    }
    traduzirDeclaracaoParaCada(declaracaoParaCada) {
        let resultado = `for (let ${declaracaoParaCada.nomeVariavelIteracao} of `;
        resultado +=
            this.dicionarioConstrutos[declaracaoParaCada.vetor.constructor.name](declaracaoParaCada.vetor) + ') ';
        resultado += this.dicionarioDeclaracoes[declaracaoParaCada.corpo.constructor.name](declaracaoParaCada.corpo);
        return resultado;
    }
    traduzirDeclaracaoPara(declaracaoPara) {
        let resultado = 'for (';
        if (declaracaoPara.inicializador.constructor.name === 'Array') {
            resultado +=
                this.dicionarioDeclaracoes[declaracaoPara.inicializador[0].constructor.name](declaracaoPara.inicializador[0]) + ' ';
        }
        else {
            resultado +=
                this.dicionarioDeclaracoes[declaracaoPara.inicializador.constructor.name](declaracaoPara.inicializador) + ' ';
        }
        resultado += !resultado.includes(';') ? ';' : '';
        resultado +=
            this.dicionarioConstrutos[declaracaoPara.condicao.constructor.name](declaracaoPara.condicao) + '; ';
        resultado +=
            this.dicionarioConstrutos[declaracaoPara.incrementar.constructor.name](declaracaoPara.incrementar) + ') ';
        resultado += this.dicionarioDeclaracoes[declaracaoPara.corpo.constructor.name](declaracaoPara.corpo);
        return resultado;
    }
    traduzirDeclaracaoImportar(declaracaoImportar) {
        return `'importar() não é suportado por este padrão de JavaScript'`;
    }
    traduzirDeclaracaoLeia(declaracaoLeia) {
        return `'leia() não é suportado por este padrão de JavaScript.'`;
    }
    traduzirDeclaracaoFuncao(declaracaoFuncao) {
        let resultado = 'function ';
        resultado += declaracaoFuncao.simbolo.lexema + ' (';
        for (const parametro of declaracaoFuncao.funcao.parametros) {
            resultado += parametro.nome.lexema + ', ';
        }
        if (declaracaoFuncao.funcao.parametros.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ') ';
        resultado += this.logicaComumBlocoEscopo(declaracaoFuncao.funcao.corpo);
        return resultado;
    }
    traduzirDeclaracaoFalhar(falhar) {
        return `throw '${falhar.explicacao}'`;
    }
    traduzirDeclaracaoFazer(declaracaoFazer) {
        let resultado = 'do ';
        resultado += this.dicionarioDeclaracoes[declaracaoFazer.caminhoFazer.constructor.name](declaracaoFazer.caminhoFazer);
        resultado +=
            'while (' +
                this.dicionarioConstrutos[declaracaoFazer.condicaoEnquanto.constructor.name](declaracaoFazer.condicaoEnquanto) +
                ') ';
        return resultado;
    }
    traduzirDeclaracaoExpressao(declaracaoExpressao) {
        return this.dicionarioConstrutos[declaracaoExpressao.expressao.constructor.name](declaracaoExpressao.expressao);
    }
    logicaComumCaminhosEscolha(caminho) {
        var _a, _b, _c;
        let resultado = '';
        this.indentacao += 4;
        resultado += ' '.repeat(this.indentacao);
        if ((_a = caminho === null || caminho === void 0 ? void 0 : caminho.condicoes) === null || _a === void 0 ? void 0 : _a.length) {
            for (let condicao of caminho.condicoes) {
                resultado += 'case ' + this.dicionarioConstrutos[condicao.constructor.name](condicao) + ':\n';
                resultado += ' '.repeat(this.indentacao);
            }
        }
        if ((_b = caminho === null || caminho === void 0 ? void 0 : caminho.declaracoes) === null || _b === void 0 ? void 0 : _b.length) {
            for (let declaracao of caminho.declaracoes) {
                resultado += ' '.repeat(this.indentacao + 4);
                if (((_c = declaracao === null || declaracao === void 0 ? void 0 : declaracao.simboloChave) === null || _c === void 0 ? void 0 : _c.lexema) === 'retorna') {
                    resultado +=
                        'return ' + this.dicionarioConstrutos[declaracao.valor.constructor.name](declaracao.valor);
                }
                resultado += this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao) + '\n';
            }
            resultado += ' '.repeat(this.indentacao + 4);
            resultado += 'break' + '\n';
        }
        this.indentacao -= 4;
        return resultado;
    }
    traduzirDeclaracaoEscolha(declaracaoEscolha) {
        let resultado = 'switch (';
        resultado +=
            this.dicionarioConstrutos[declaracaoEscolha.identificadorOuLiteral.constructor.name](declaracaoEscolha.identificadorOuLiteral) + ') {\n';
        for (let caminho of declaracaoEscolha.caminhos) {
            resultado += this.logicaComumCaminhosEscolha(caminho);
        }
        if (declaracaoEscolha.caminhoPadrao) {
            resultado += ' '.repeat(4);
            resultado += 'default:\n';
            resultado += this.logicaComumCaminhosEscolha(declaracaoEscolha.caminhoPadrao);
        }
        resultado += '}\n';
        return resultado;
    }
    traduzirDeclaracaoEnquanto(declaracaoEnquanto) {
        let resultado = 'while (';
        resultado +=
            this.dicionarioConstrutos[declaracaoEnquanto.condicao.constructor.name](declaracaoEnquanto.condicao) + ') ';
        resultado += this.dicionarioDeclaracoes[declaracaoEnquanto.corpo.constructor.name](declaracaoEnquanto.corpo);
        return resultado;
    }
    traduzirDeclaracaoBloco(declaracaoBloco) {
        return this.logicaComumBlocoEscopo(declaracaoBloco.declaracoes);
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
    traduzirConstrutoVariavel(variavel) {
        return variavel.simbolo.lexema;
    }
    traduzirConstrutoUnario(unario) {
        var _a, _b;
        let resultado = '';
        if ([delegua_1.default.INCREMENTAR, delegua_1.default.DECREMENTAR].includes(unario.operador.tipo)) {
            resultado += (_a = unario.operando.valor) !== null && _a !== void 0 ? _a : unario.operando.simbolo.lexema;
            resultado += unario.operador.tipo === delegua_1.default.INCREMENTAR ? '++' : '--';
        }
        else {
            resultado += this.traduzirSimboloOperador(unario.operador);
            resultado += (_b = unario.operando.valor) !== null && _b !== void 0 ? _b : unario.operando.simbolo.lexema;
        }
        return resultado;
    }
    traduzirConstrutoTipoDe(tipoDe) {
        let resultado = 'typeof ';
        if (typeof tipoDe.valor === 'string')
            resultado += `'${tipoDe.valor}'`;
        else if (tipoDe.valor instanceof construtos_1.Vetor)
            resultado += this.traduzirConstrutoVetor(tipoDe.valor);
        else
            resultado += tipoDe.valor;
        return resultado;
    }
    traduzirConstrutoLogico(logico) {
        let direita = this.dicionarioConstrutos[logico.direita.constructor.name](logico.direita);
        let operador = this.traduzirSimboloOperador(logico.operador);
        let esquerda = this.dicionarioConstrutos[logico.esquerda.constructor.name](logico.esquerda);
        return `${direita} ${operador} ${esquerda}`;
    }
    traduzirFuncaoConstruto(funcaoConstruto) {
        let resultado = 'function(';
        for (const parametro of funcaoConstruto.parametros) {
            const tipoParametro = this.resolveTipoDeclaracaoVarEContante(parametro.tipoDado.tipo);
            resultado += `${parametro.nome.lexema}${tipoParametro}, `;
        }
        if (funcaoConstruto.parametros.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ') ';
        resultado += this.logicaComumBlocoEscopo(funcaoConstruto.corpo);
        return resultado;
    }
    traduzirConstrutoDefinirValor(definirValor) {
        let resultado = '';
        if (definirValor.objeto instanceof construtos_1.Isto) {
            resultado = 'this.' + definirValor.nome.lexema + ' = ';
        }
        resultado += definirValor.valor.simbolo.lexema;
        return resultado;
    }
    traduzirConstrutoChamada(chamada) {
        let resultado = '';
        const retorno = `${this.dicionarioConstrutos[chamada.entidadeChamada.constructor.name](chamada.entidadeChamada)}`;
        const instanciaClasse = this.declaracoesDeClasses.some((declaracao) => { var _a; return ((_a = declaracao === null || declaracao === void 0 ? void 0 : declaracao.simbolo) === null || _a === void 0 ? void 0 : _a.lexema) === retorno; });
        if (instanciaClasse) {
            const classe = this.declaracoesDeClasses.find((declaracao) => { var _a; return ((_a = declaracao === null || declaracao === void 0 ? void 0 : declaracao.simbolo) === null || _a === void 0 ? void 0 : _a.lexema) === retorno; });
            if (classe.simbolo.lexema === retorno)
                resultado += `new ${retorno}`;
        }
        else {
            resultado += retorno;
        }
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
    traduzirConstrutoAtribuir(atribuir) {
        let resultado = atribuir.simbolo.lexema;
        resultado += ' = ' + this.dicionarioConstrutos[atribuir.valor.constructor.name](atribuir.valor);
        return resultado;
    }
    traduzirConstrutoAtribuicaoPorIndice(AtribuicaoPorIndice) {
        var _a, _b;
        let resultado = '';
        resultado += AtribuicaoPorIndice.objeto.simbolo.lexema + '[';
        resultado +=
            this.dicionarioConstrutos[AtribuicaoPorIndice.indice.constructor.name](AtribuicaoPorIndice.indice) + ']';
        resultado += ' = ';
        if ((_b = (_a = AtribuicaoPorIndice === null || AtribuicaoPorIndice === void 0 ? void 0 : AtribuicaoPorIndice.valor) === null || _a === void 0 ? void 0 : _a.simbolo) === null || _b === void 0 ? void 0 : _b.lexema) {
            resultado += `${AtribuicaoPorIndice.valor.simbolo.lexema}`;
        }
        else {
            resultado += this.dicionarioConstrutos[AtribuicaoPorIndice.valor.constructor.name](AtribuicaoPorIndice.valor);
        }
        return resultado;
    }
    traduzirConstrutoAgrupamento(agrupamento) {
        return this.dicionarioConstrutos[agrupamento.constructor.name](agrupamento.expressao || agrupamento);
    }
    trazudirConstrutoAcessoMetodo(acessoMetodo) {
        if (acessoMetodo.objeto instanceof construtos_1.Variavel) {
            let objetoVariavel = acessoMetodo.objeto;
            return `${objetoVariavel.simbolo.lexema}.${this.traduzirFuncoesNativas(acessoMetodo.simbolo.lexema)}`;
        }
        return `this.${acessoMetodo.simbolo.lexema}`;
    }
    traduzirAcessoIndiceVariavel(acessoIndiceVariavel) {
        let resultado = '';
        resultado += this.dicionarioConstrutos[acessoIndiceVariavel.entidadeChamada.constructor.name](acessoIndiceVariavel.entidadeChamada);
        resultado += `[${this.dicionarioConstrutos[acessoIndiceVariavel.indice.constructor.name](acessoIndiceVariavel.indice)}]`;
        return resultado;
    }
    traduzir(declaracoes) {
        let resultado = '';
        this.declaracoesDeClasses = declaracoes.filter((declaracao) => declaracao instanceof declaracoes_1.Classe);
        for (const declaracao of declaracoes) {
            resultado += `${this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao)} \n`;
        }
        return resultado;
    }
}
exports.TradutorAssemblyScript = TradutorAssemblyScript;
//# sourceMappingURL=tradutor-assemblyscript.js.map