"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorPortugolIpt = void 0;
const espaco_variaveis_1 = require("../../../espaco-variaveis");
const estruturas_1 = require("../../../estruturas");
const excecoes_1 = require("../../../excecoes");
const quebras_1 = require("../../../quebras");
const pilha_escopos_execucao_1 = require("../../pilha-escopos-execucao");
const portugol_ipt_1 = __importDefault(require("../../../tipos-de-simbolos/portugol-ipt"));
const inferenciador_1 = require("../../inferenciador");
class InterpretadorPortugolIpt {
    constructor(diretorioBase, funcaoDeRetorno = null, funcaoDeRetornoMesmaLinha = null) {
        this.funcaoDeRetorno = null;
        this.funcaoDeRetornoMesmaLinha = null;
        this.resultadoInterpretador = [];
        this.diretorioBase = diretorioBase;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.funcaoDeRetornoMesmaLinha = funcaoDeRetornoMesmaLinha || process.stdout.write.bind(process.stdout);
        this.erros = [];
        this.declaracoes = [];
        this.pilhaEscoposExecucao = new pilha_escopos_execucao_1.PilhaEscoposExecucao();
        const escopoExecucao = {
            declaracoes: [],
            declaracaoAtual: 0,
            ambiente: new espaco_variaveis_1.EspacoVariaveis(),
            finalizado: false,
            tipo: 'outro',
            emLacoRepeticao: false,
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
    }
    visitarExpressaoTipoDe(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoFalhar(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoParaCada(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoLiteral(expressao) {
        return expressao.valor;
    }
    async avaliar(expressao) {
        // Descomente o código abaixo quando precisar detectar expressões undefined ou nulas.
        // Por algum motivo o depurador do VSCode não funciona direito aqui
        // com breakpoint condicional.
        if (expressao === null || expressao === undefined) {
            console.log('Aqui');
        }
        return await expressao.aceitar(this);
    }
    visitarExpressaoAgrupamento(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoUnaria(expressao) {
        throw new Error('Método não implementado');
    }
    /**
     * Verifica se operandos são números, que podem ser tanto variáveis puras do JavaScript
     * (neste caso, `number`), ou podem ser variáveis de Delégua com inferência (`VariavelInterface`).
     * @param operador O símbolo do operador.
     * @param direita O operando direito.
     * @param esquerda O operando esquerdo.
     * @returns Se ambos os operandos são números ou não.
     */
    verificarOperandosNumeros(operador, direita, esquerda) {
        const tipoDireita = direita.tipo ? direita.tipo : typeof direita === 'number' ? 'número' : String(NaN);
        const tipoEsquerda = esquerda.tipo
            ? esquerda.tipo
            : typeof esquerda === 'number'
                ? 'número'
                : String(NaN);
        if (tipoDireita === 'número' && tipoEsquerda === 'número')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operadores precisam ser números.', operador.linha);
    }
    eIgual(esquerda, direita) {
        if (esquerda === null && direita === null)
            return true;
        if (esquerda === null)
            return false;
        return esquerda === direita;
    }
    async visitarExpressaoBinaria(expressao) {
        try {
            const esquerda = await this.avaliar(expressao.esquerda);
            const direita = await this.avaliar(expressao.direita);
            const valorEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('valor')) ? esquerda.valor : esquerda;
            const valorDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('valor')) ? direita.valor : direita;
            const tipoEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('tipo'))
                ? esquerda.tipo
                : (0, inferenciador_1.inferirTipoVariavel)(esquerda);
            const tipoDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('tipo')) ? direita.tipo : (0, inferenciador_1.inferirTipoVariavel)(direita);
            switch (expressao.operador.tipo) {
                case portugol_ipt_1.default.EXPONENCIACAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Math.pow(valorEsquerdo, valorDireito);
                case portugol_ipt_1.default.MAIOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) > Number(valorDireito);
                case portugol_ipt_1.default.MAIOR_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) >= Number(valorDireito);
                case portugol_ipt_1.default.MENOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) < Number(valorDireito);
                case portugol_ipt_1.default.MENOR_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) <= Number(valorDireito);
                case portugol_ipt_1.default.SUBTRACAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) - Number(valorDireito);
                case portugol_ipt_1.default.ADICAO:
                    if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                        return Number(valorEsquerdo) + Number(valorDireito);
                    }
                    else {
                        return String(valorEsquerdo) + String(valorDireito);
                    }
                case portugol_ipt_1.default.DIVISAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) / Number(valorDireito);
                case portugol_ipt_1.default.DIVISAO_INTEIRA:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Math.floor(Number(valorEsquerdo) / Number(valorDireito));
                case portugol_ipt_1.default.MULTIPLICACAO:
                    if (tipoEsquerdo === 'texto' || tipoDireito === 'texto') {
                        // Sem ambos os valores resolvem como texto, multiplica normal.
                        // Se apenas um resolve como texto, o outro repete o
                        // texto n vezes, sendo n o valor do outro.
                        if (tipoEsquerdo === 'texto' && tipoDireito === 'texto') {
                            return Number(valorEsquerdo) * Number(valorDireito);
                        }
                        if (tipoEsquerdo === 'texto') {
                            return valorEsquerdo.repeat(Number(valorDireito));
                        }
                        return valorDireito.repeat(Number(valorEsquerdo));
                    }
                    return Number(valorEsquerdo) * Number(valorDireito);
                case portugol_ipt_1.default.MODULO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) % Number(valorDireito);
                case portugol_ipt_1.default.DIFERENTE:
                    return !this.eIgual(valorEsquerdo, valorDireito);
                case portugol_ipt_1.default.IGUAL:
                    return this.eIgual(valorEsquerdo, valorDireito);
            }
        }
        catch (erro) {
            return Promise.reject(erro);
        }
    }
    visitarExpressaoDeChamada(expressao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoDeAtribuicao(expressao) {
        throw new Error('Método não implementado');
    }
    procurarVariavel(simbolo) {
        return this.pilhaEscoposExecucao.obterValorVariavel(simbolo);
    }
    visitarExpressaoDeVariavel(expressao) {
        return this.procurarVariavel(expressao.simbolo);
    }
    visitarDeclaracaoDeExpressao(declaracao) {
        throw new Error('Método não implementado');
    }
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    async visitarExpressaoLeia(expressao) {
        const mensagem = expressao.argumentos && expressao.argumentos[0] ? expressao.argumentos[0].valor : '> ';
        return new Promise((resolucao) => this.interfaceEntradaSaida.question(mensagem, (resposta) => {
            resolucao(resposta);
        }));
    }
    visitarExpressaoLeiaMultiplo(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoLogica(expressao) {
        throw new Error('Método não implementado');
    }
    eVerdadeiro(objeto) {
        if (objeto === null)
            return false;
        if (typeof objeto === 'boolean')
            return Boolean(objeto);
        if (objeto.hasOwnProperty('valor')) {
            return Boolean(objeto.valor);
        }
        return true;
    }
    /**
     * Executa uma expressão Se, que tem uma condição, pode ter um bloco
     * Senão, e múltiplos blocos Senão-se.
     * @param declaracao A declaração Se.
     * @returns O resultado da avaliação do bloco cuja condição é verdadeira.
     */
    async visitarDeclaracaoSe(declaracao) {
        if (this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
            return await this.executar(declaracao.caminhoEntao);
        }
        if (declaracao.caminhoSenao !== null) {
            return await this.executar(declaracao.caminhoSenao);
        }
        return null;
    }
    visitarDeclaracaoPara(declaracao) {
        return Promise.reject('Método não implementado');
    }
    visitarExpressaoFimPara(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoFazer(declaracao) {
        throw new Error('Método não implementado');
    }
    async visitarExpressaoFormatacaoEscrita(declaracao) {
        let resultado = '';
        const conteudo = await this.avaliar(declaracao.expressao);
        const valorConteudo = (conteudo === null || conteudo === void 0 ? void 0 : conteudo.hasOwnProperty('valor')) ? conteudo.valor : conteudo;
        const tipoConteudo = conteudo.hasOwnProperty('tipo') ? conteudo.tipo : typeof conteudo;
        resultado = valorConteudo;
        if (['número', 'number'].includes(tipoConteudo) && declaracao.casasDecimais > 0) {
            resultado = valorConteudo.toLocaleString('pt', { maximumFractionDigits: declaracao.casasDecimais });
        }
        if (declaracao.espacos > 0) {
            resultado += ' '.repeat(declaracao.espacos);
        }
        return resultado;
    }
    visitarDeclaracaoEscolha(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoTente(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoEnquanto(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoImportar(declaracao) {
        throw new Error('Método não implementado');
    }
    async avaliarArgumentosEscreva(argumentos) {
        let formatoTexto = '';
        for (const argumento of argumentos) {
            const resultadoAvaliacao = await this.avaliar(argumento);
            let valor = (resultadoAvaliacao === null || resultadoAvaliacao === void 0 ? void 0 : resultadoAvaliacao.hasOwnProperty('valor')) ? resultadoAvaliacao.valor : resultadoAvaliacao;
            formatoTexto += `${this.paraTexto(valor)} `;
        }
        return formatoTexto.trimEnd();
    }
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    async visitarDeclaracaoEscreva(declaracao) {
        try {
            const formatoTexto = await this.avaliarArgumentosEscreva(declaracao.argumentos);
            this.funcaoDeRetorno(formatoTexto);
            return null;
        }
        catch (erro) {
            this.erros.push({
                erroInterno: erro,
                linha: declaracao.linha,
                hashArquivo: declaracao.hashArquivo,
            });
        }
    }
    async visitarExpressaoEscrevaMesmaLinha(declaracao) {
        try {
            const formatoTexto = await this.avaliarArgumentosEscreva(declaracao.argumentos);
            this.funcaoDeRetornoMesmaLinha(formatoTexto);
            return null;
        }
        catch (erro) {
            this.erros.push({
                erroInterno: erro,
                linha: declaracao.linha,
                hashArquivo: declaracao.hashArquivo,
            });
        }
    }
    executarBloco(declaracoes, ambiente) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoBloco(declaracao) {
        throw new Error('Método não implementado');
    }
    async avaliacaoDeclaracaoVar(declaracao) {
        let valorOuOutraVariavel = null;
        if (declaracao.inicializador !== null) {
            valorOuOutraVariavel = await this.avaliar(declaracao.inicializador);
        }
        let valorFinal = null;
        if (valorOuOutraVariavel !== null && valorOuOutraVariavel !== undefined) {
            valorFinal = valorOuOutraVariavel.hasOwnProperty('valor')
                ? valorOuOutraVariavel.valor
                : valorOuOutraVariavel;
        }
        return valorFinal;
    }
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    async visitarDeclaracaoVar(declaracao) {
        const valorFinal = await this.avaliacaoDeclaracaoVar(declaracao);
        let subtipo;
        if (declaracao.tipo !== undefined) {
            subtipo = declaracao.tipo;
        }
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, valorFinal, subtipo);
        return null;
    }
    visitarDeclaracaoVarMultiplo(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoConst(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoConstMultiplo(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoContinua(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoSustar(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoRetornar(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoDeleguaFuncao(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoAtribuicaoPorIndice(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoAcessoIndiceVariavel(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoDefinirValor(expressao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoDefinicaoFuncao(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarDeclaracaoClasse(declaracao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoAcessoMetodo(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoIsto(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoDicionario(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoVetor(expressao) {
        throw new Error('Método não implementado');
    }
    visitarExpressaoSuper(expressao) {
        throw new Error('Método não implementado');
    }
    paraTexto(objeto) {
        if (objeto === null || objeto === undefined)
            return 'nulo';
        if (typeof objeto === 'boolean') {
            return objeto ? 'verdadeiro' : 'falso';
        }
        if (objeto instanceof Date) {
            const formato = Intl.DateTimeFormat('pt', {
                dateStyle: 'full',
                timeStyle: 'full',
            });
            return formato.format(objeto);
        }
        if (Array.isArray(objeto))
            return objeto;
        if (objeto.valor instanceof estruturas_1.ObjetoPadrao)
            return objeto.valor.paraTexto();
        if (typeof objeto === 'object')
            return JSON.stringify(objeto);
        return objeto.toString();
    }
    /**
     * Efetivamente executa uma declaração.
     * @param declaracao A declaração a ser executada.
     * @param mostrarResultado Se resultado deve ser mostrado ou não. Normalmente usado
     *                         pelo modo LAIR.
     */
    async executar(declaracao, mostrarResultado = false) {
        const resultado = await declaracao.aceitar(this);
        if (mostrarResultado) {
            this.funcaoDeRetorno(this.paraTexto(resultado));
        }
        if (resultado || typeof resultado === 'boolean') {
            this.resultadoInterpretador.push(this.paraTexto(resultado));
        }
        return resultado;
    }
    /**
     * Executa o último escopo empilhado no topo na pilha de escopos do interpretador.
     * Esse método pega exceções, mas apenas as devolve.
     *
     * O tratamento das exceções é feito de acordo com o bloco chamador.
     * Por exemplo, em `tente ... pegue ... finalmente`, a exceção é capturada e tratada.
     * Em outros blocos, pode ser desejável ter o erro em tela.
     * @param manterAmbiente Se verdadeiro, ambiente do topo da pilha de escopo é copiado para o ambiente imediatamente abaixo.
     * @returns O resultado da execução do escopo, se houver.
     */
    async executarUltimoEscopo(manterAmbiente = false) {
        const ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
        try {
            let retornoExecucao;
            for (; !(retornoExecucao instanceof quebras_1.Quebra) && ultimoEscopo.declaracaoAtual < ultimoEscopo.declaracoes.length; ultimoEscopo.declaracaoAtual++) {
                retornoExecucao = await this.executar(ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual]);
            }
            return retornoExecucao;
        }
        catch (erro) {
            return Promise.reject(erro);
        }
        finally {
            this.pilhaEscoposExecucao.removerUltimo();
            if (manterAmbiente) {
                const escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
                escopoAnterior.ambiente.valores = Object.assign(escopoAnterior.ambiente.valores, ultimoEscopo.ambiente.valores);
            }
        }
    }
    async interpretar(declaracoes, manterAmbiente) {
        this.erros = [];
        const escopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            ambiente: new espaco_variaveis_1.EspacoVariaveis(),
            finalizado: false,
            tipo: 'outro',
            emLacoRepeticao: false,
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        try {
            const retornoOuErro = await this.executarUltimoEscopo(manterAmbiente);
            if (retornoOuErro instanceof excecoes_1.ErroEmTempoDeExecucao) {
                this.erros.push(retornoOuErro);
            }
        }
        catch (erro) {
            this.erros.push(erro);
        }
        finally {
            const retorno = {
                erros: this.erros,
                resultado: this.resultadoInterpretador,
            };
            this.resultadoInterpretador = [];
            return retorno;
        }
    }
}
exports.InterpretadorPortugolIpt = InterpretadorPortugolIpt;
//# sourceMappingURL=interpretador-portugol-ipt.js.map