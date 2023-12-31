"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorBirl = void 0;
const construtos_1 = require("../../../construtos");
const espaco_variaveis_1 = require("../../../espaco-variaveis");
const estruturas_1 = require("../../../estruturas");
const excecoes_1 = require("../../../excecoes");
const quebras_1 = require("../../../quebras");
const birl_1 = __importDefault(require("../../../tipos-de-simbolos/birl"));
const inferenciador_1 = require("../../inferenciador");
const interpretador_base_1 = require("../../interpretador-base");
const pilha_escopos_execucao_1 = require("../../pilha-escopos-execucao");
const comum = __importStar(require("./comum"));
class InterpretadorBirl extends interpretador_base_1.InterpretadorBase {
    constructor(diretorioBase, funcaoDeRetorno = null, funcaoDeRetornoMesmaLinha = null) {
        super(diretorioBase, false, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
        this.funcaoDeRetorno = null;
        this.funcaoDeRetornoMesmaLinha = null;
        this.resultadoInterpretador = [];
        this.regexInterpolacao = /\$\{([a-z_][\w]*)\}/gi;
        this.expressoesStringC = {
            '%d': 'inteiro',
            '%i': 'inteiro',
            '%u': 'inteiro',
            '%f': 'real',
            '%F': 'real',
            '%e': 'real',
            '%E': 'real',
            '%g': 'real',
            '%G': 'real',
            '%x': 'inteiro',
            '%X': 'inteiro',
            '%o': 'inteiro',
            '%s': 'texto',
            '%c': 'texto',
            '%p': 'texto',
        };
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
    async avaliar(expressao) {
        // @todo: Implementar validação mais inteligente.
        // Descomente o código abaixo quando precisar detectar expressões undefined ou nulas.
        // Por algum motivo o depurador do VSCode não funciona direito aqui
        // com breakpoint condicional.
        /* if (expressao === null || expressao === undefined) {
            console.log('Aqui');
        } */
        return await expressao.aceitar(this);
    }
    /**
     * Empilha declarações na pilha de escopos de execução, cria um novo ambiente e
     * executa as declarações empilhadas.
     * Se o retorno do último bloco foi uma exceção (normalmente um erro em tempo de execução),
     * atira a exceção daqui.
     * Isso é usado, por exemplo, em blocos tente ... pegue ... finalmente.
     * @param declaracoes Um vetor de declaracoes a ser executado.
     * @param ambiente O ambiente de execução quando houver, como parâmetros, argumentos, etc.
     */
    async executarBloco(declaracoes, ambiente) {
        const escopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            ambiente: ambiente || new espaco_variaveis_1.EspacoVariaveis(),
            finalizado: false,
            tipo: 'outro',
            emLacoRepeticao: false,
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        const retornoUltimoEscopo = await this.executarUltimoEscopo();
        if (retornoUltimoEscopo instanceof excecoes_1.ErroEmTempoDeExecucao) {
            return Promise.reject(retornoUltimoEscopo);
        }
        return retornoUltimoEscopo;
    }
    async visitarExpressaoAgrupamento(expressao) {
        return await this.avaliar(expressao.expressao);
    }
    verificarOperandoNumero(operador, operando) {
        if (typeof operando === 'number' || operando.tipo === 'número')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operando precisa ser um número.', Number(operador.linha));
    }
    async visitarExpressaoUnaria(expressao) {
        const operando = await this.avaliar(expressao.operando);
        let valor = operando.hasOwnProperty('valor') ? operando.valor : operando;
        switch (expressao.operador.tipo) {
            case birl_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expressao.operador, valor);
                return -valor;
            case birl_1.default.NEGACAO:
                return !this.eVerdadeiro(valor);
            case birl_1.default.BIT_NOT:
                return ~valor;
            // Para incrementar e decrementar, primeiro precisamos saber se o operador
            // veio antes do literal ou variável.
            // Se veio antes e o operando é uma variável, precisamos incrementar/decrementar,
            // armazenar o valor da variável pra só então devolver o valor.
            case birl_1.default.INCREMENTAR:
                if (expressao.incidenciaOperador === 'ANTES') {
                    valor++;
                    if (expressao.operando instanceof construtos_1.Variavel) {
                        this.pilhaEscoposExecucao.atribuirVariavel(expressao.operando.simbolo, valor);
                    }
                    return valor;
                }
                const valorAnteriorIncremento = valor;
                this.pilhaEscoposExecucao.atribuirVariavel(expressao.operando.simbolo, ++valor);
                return valorAnteriorIncremento;
            case birl_1.default.DECREMENTAR:
                if (expressao.incidenciaOperador === 'ANTES') {
                    valor--;
                    if (expressao.operando instanceof construtos_1.Variavel) {
                        this.pilhaEscoposExecucao.atribuirVariavel(expressao.operando.simbolo, valor);
                    }
                    return valor;
                }
                const valorAnteriorDecremento = valor;
                this.pilhaEscoposExecucao.atribuirVariavel(expressao.operando.simbolo, --valor);
                return valorAnteriorDecremento;
        }
        return null;
    }
    eIgual(esquerda, direita) {
        if (esquerda === null && direita === null)
            return true;
        if (esquerda === null)
            return false;
        return esquerda === direita;
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
                case birl_1.default.EXPONENCIACAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Math.pow(valorEsquerdo, valorDireito);
                case birl_1.default.MAIOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) > Number(valorDireito);
                case birl_1.default.MAIOR_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) >= Number(valorDireito);
                case birl_1.default.MENOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) < Number(valorDireito);
                case birl_1.default.MENOR_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) <= Number(valorDireito);
                case birl_1.default.SUBTRACAO:
                case birl_1.default.MENOS_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) - Number(valorDireito);
                case birl_1.default.ADICAO:
                case birl_1.default.MAIS_IGUAL:
                    if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                        return Number(valorEsquerdo) + Number(valorDireito);
                    }
                    else {
                        return String(valorEsquerdo) + String(valorDireito);
                    }
                case birl_1.default.DIVISAO:
                case birl_1.default.DIVISAO_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) / Number(valorDireito);
                case birl_1.default.DIVISAO_INTEIRA:
                case birl_1.default.DIVISAO_INTEIRA_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Math.floor(Number(valorEsquerdo) / Number(valorDireito));
                case birl_1.default.MULTIPLICACAO:
                case birl_1.default.MULTIPLICACAO_IGUAL:
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
                case birl_1.default.MODULO:
                case birl_1.default.MODULO_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) % Number(valorDireito);
                case birl_1.default.BIT_AND:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) & Number(valorDireito);
                case birl_1.default.BIT_XOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) ^ Number(valorDireito);
                case birl_1.default.BIT_OR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) | Number(valorDireito);
                case birl_1.default.MENOR_MENOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) << Number(valorDireito);
                case birl_1.default.MAIOR_MAIOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) >> Number(valorDireito);
                case birl_1.default.DIFERENTE:
                    return !this.eIgual(valorEsquerdo, valorDireito);
                case birl_1.default.IGUAL_IGUAL:
                    return this.eIgual(valorEsquerdo, valorDireito);
            }
        }
        catch (erro) {
            this.erros.push({
                erroInterno: erro,
                linha: expressao.linha,
                hashArquivo: expressao.hashArquivo,
            });
            return Promise.reject(erro);
        }
    }
    /**
     * Executa uma chamada de função, método ou classe.
     * @param expressao A expressão chamada.
     * @returns O resultado da chamada.
     */
    async visitarExpressaoDeChamada(expressao) {
        try {
            const variavelEntidadeChamada = await this.avaliar(expressao.entidadeChamada);
            if (variavelEntidadeChamada === null) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Chamada de função ou método inexistente: ' + String(expressao.entidadeChamada), expressao.linha));
            }
            const entidadeChamada = variavelEntidadeChamada.hasOwnProperty('valor')
                ? variavelEntidadeChamada.valor
                : variavelEntidadeChamada;
            let argumentos = [];
            for (let i = 0; i < expressao.argumentos.length; i++) {
                const variavelArgumento = expressao.argumentos[i];
                const nomeArgumento = variavelArgumento.hasOwnProperty('simbolo')
                    ? variavelArgumento.simbolo.lexema
                    : undefined;
                argumentos.push({
                    nome: nomeArgumento,
                    valor: await this.avaliar(variavelArgumento),
                });
            }
            if (entidadeChamada instanceof estruturas_1.DeleguaModulo) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Entidade chamada é um módulo de Birl. Provavelmente você quer chamar um de seus componentes?', expressao.linha));
            }
            if (entidadeChamada instanceof estruturas_1.MetodoPrimitiva) {
                const argumentosResolvidos = [];
                for (const argumento of expressao.argumentos) {
                    const valorResolvido = await this.avaliar(argumento);
                    argumentosResolvidos.push((valorResolvido === null || valorResolvido === void 0 ? void 0 : valorResolvido.hasOwnProperty('valor')) ? valorResolvido.valor : valorResolvido);
                }
                return await entidadeChamada.chamar(this, argumentosResolvidos);
            }
            let parametros;
            if (entidadeChamada instanceof estruturas_1.DeleguaFuncao) {
                parametros = entidadeChamada.declaracao.parametros;
            }
            else if (entidadeChamada instanceof estruturas_1.DeleguaClasse) {
                parametros = entidadeChamada.metodos.inicializacao
                    ? entidadeChamada.metodos.inicializacao.declaracao.parametros
                    : [];
            }
            else {
                parametros = [];
            }
            const aridade = entidadeChamada.aridade ? entidadeChamada.aridade() : entidadeChamada.length;
            // Completar os parâmetros não preenchidos com nulos.
            if (argumentos.length < aridade) {
                const diferenca = aridade - argumentos.length;
                for (let i = 0; i < diferenca; i++) {
                    argumentos.push(null);
                }
            }
            else {
                if (parametros &&
                    parametros.length > 0 &&
                    parametros[parametros.length - 1].abrangencia === 'multiplo') {
                    let novosArgumentos = argumentos.slice(0, parametros.length - 1);
                    novosArgumentos = novosArgumentos.concat(argumentos.slice(parametros.length - 1, argumentos.length));
                    argumentos = novosArgumentos;
                }
            }
            if (entidadeChamada instanceof estruturas_1.FuncaoPadrao) {
                try {
                    return entidadeChamada.chamar(argumentos.map((a) => (a !== null && a.hasOwnProperty('valor') ? a.valor : a)), expressao.entidadeChamada.nome);
                }
                catch (erro) {
                    this.erros.push({
                        erroInterno: erro,
                        linha: expressao.linha,
                        hashArquivo: expressao.hashArquivo,
                    });
                    this.erros.push(erro);
                }
            }
            if (entidadeChamada instanceof estruturas_1.Chamavel) {
                return entidadeChamada.chamar(this, argumentos);
            }
            // A função chamada pode ser de uma biblioteca JavaScript.
            // Neste caso apenas testamos se o tipo é uma função.
            if (typeof entidadeChamada === 'function') {
                let objeto = null;
                if (expressao.entidadeChamada.objeto) {
                    objeto = await this.avaliar(expressao.entidadeChamada.objeto);
                }
                return entidadeChamada.apply(objeto.hasOwnProperty('valor') ? objeto.valor : objeto, argumentos);
            }
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Só pode chamar função ou classe.', expressao.linha));
        }
        catch (erro) {
            console.log(erro);
            this.erros.push({
                erroInterno: erro,
                linha: expressao.linha,
                hashArquivo: expressao.hashArquivo,
            });
            this.erros.push(erro);
        }
    }
    async visitarDeclaracaoDeAtribuicao(expressao) {
        throw new Error('Método não implementado.');
    }
    procurarVariavel(simbolo) {
        return this.pilhaEscoposExecucao.obterValorVariavel(simbolo);
    }
    visitarExpressaoDeVariavel(expressao) {
        return this.procurarVariavel(expressao.simbolo);
    }
    async visitarDeclaracaoDeExpressao(declaracao) {
        throw new Error('Método não implementado.');
    }
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    async visitarExpressaoLeia(expressao) {
        await comum.visitarExpressaoLeia(this, expressao);
    }
    async visitarExpressaoLiteral(expressao) {
        return comum.visitarExpressaoLiteral(expressao);
    }
    async visitarExpressaoLogica(expressao) {
        const esquerda = await this.avaliar(expressao.esquerda);
        if (expressao.operador.tipo === birl_1.default.EM) {
            const direita = await this.avaliar(expressao.direita);
            if (Array.isArray(direita) || typeof direita === 'string') {
                return direita.includes(esquerda);
            }
            else if (direita.constructor === Object) {
                return esquerda in direita;
            }
            else {
                throw new excecoes_1.ErroEmTempoDeExecucao(esquerda, "Tipo de chamada inválida com 'em'.", expressao.linha);
            }
        }
        // se um estado for verdadeiro, retorna verdadeiro
        if (expressao.operador.tipo === birl_1.default.OU) {
            if (this.eVerdadeiro(esquerda))
                return esquerda;
        }
        // se um estado for falso, retorna falso
        if (expressao.operador.tipo === birl_1.default.E) {
            if (!this.eVerdadeiro(esquerda))
                return esquerda;
        }
        return await this.avaliar(expressao.direita);
    }
    async visitarDeclaracaoPara(declaracao) {
        return comum.visitarDeclaracaoPara(this, declaracao);
    }
    visitarDeclaracaoParaCada(declaracao) {
        throw new Error('Método não implementado.');
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
        //  @todo: Verificar se é necessário avaliar o caminho Senão.
        for (let i = 0; i < declaracao.caminhosSeSenao.length; i++) {
            const atual = declaracao.caminhosSeSenao[i];
            if (this.eVerdadeiro(await this.avaliar(atual.condicao))) {
                return await this.executar(atual.caminho);
            }
        }
        if (declaracao.caminhoSenao !== null) {
            return await this.executar(declaracao.caminhoSenao);
        }
        return null;
    }
    async visitarExpressaoFimPara(declaracao) {
        throw new Error('Método não implementado.');
    }
    async visitarDeclaracaoFazer(declaracao) {
        throw new Error('Método não implementado.');
    }
    // async visitarExpressaoFormatacaoEscrita(declaracao: FormatacaoEscrita) {
    //     throw new Error('Método não implementado.');
    // }
    async visitarDeclaracaoEscolha(declaracao) {
        throw new Error('Método não implementado.');
    }
    async visitarDeclaracaoTente(declaracao) {
        throw new Error('Método não implementado.');
    }
    async visitarDeclaracaoEnquanto(declaracao) {
        let retornoExecucao;
        while (!(retornoExecucao instanceof quebras_1.Quebra) && this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
            try {
                retornoExecucao = await this.executar(declaracao.corpo);
                if (retornoExecucao instanceof quebras_1.SustarQuebra) {
                    return null;
                }
                if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                    retornoExecucao = null;
                }
            }
            catch (erro) {
                this.erros.push({
                    erroInterno: erro,
                    linha: declaracao.linha,
                    hashArquivo: declaracao.hashArquivo,
                });
                return Promise.reject(erro);
            }
        }
        return retornoExecucao;
    }
    async substituirValor(stringOriginal, novoValor, simboloTipo) {
        return comum.substituirValor(stringOriginal, novoValor, simboloTipo);
    }
    async resolveQuantidadeDeInterpolacoes(texto) {
        return comum.resolveQuantidadeDeInterpolacoes(texto);
    }
    async verificaTipoDaInterpolação(dados) {
        return comum.verificaTipoDaInterpolação(dados);
    }
    async avaliarArgumentosEscreva(argumentos) {
        return comum.avaliarArgumentosEscreva(this, argumentos);
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
        throw new Error('Método não implementado.');
    }
    async visitarExpressaoBloco(declaracao) {
        return await this.executarBloco(declaracao.declaracoes);
    }
    async avaliacaoDeclaracaoVarOuConst(declaracao) {
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
        const valorFinal = await this.avaliacaoDeclaracaoVarOuConst(declaracao);
        let subtipo;
        if (declaracao.tipo !== undefined) {
            subtipo = declaracao.tipo;
        }
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, valorFinal, subtipo);
        return null;
    }
    visitarDeclaracaoConst(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoContinua(declaracao) {
        return new quebras_1.ContinuarQuebra();
    }
    visitarExpressaoSustar(declaracao) {
        return new quebras_1.SustarQuebra();
    }
    async visitarExpressaoRetornar(declaracao) {
        let valor = null;
        if (declaracao.valor != null)
            valor = await this.avaliar(declaracao.valor);
        return new quebras_1.RetornoQuebra(valor);
    }
    // async visitarExpressaoDeleguaFuncao(expressao: any) {
    //     throw new Error('Método não implementado.');
    // }
    visitarExpressaoAtribuicaoPorIndice(expressao) {
        throw new Error('Método não implementado.');
    }
    async visitarExpressaoAcessoIndiceVariavel(expressao) {
        throw new Error('Método não implementado.');
    }
    async visitarExpressaoDefinirValor(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoDefinicaoFuncao(declaracao) {
        const funcao = new estruturas_1.DeleguaFuncao(declaracao.simbolo.lexema, declaracao.funcao);
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, funcao);
    }
    async visitarDeclaracaoClasse(declaracao) {
        throw new Error('Método não implementado.');
    }
    async visitarExpressaoAcessoMetodo(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoIsto(expressao) {
        throw new Error('Método não implementado.');
    }
    async visitarExpressaoDicionario(expressao) {
        throw new Error('Método não implementado.');
    }
    async visitarExpressaoVetor(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoSuper(expressao) {
        throw new Error('Método não implementado.');
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
        let resultado = null;
        resultado = await declaracao.aceitar(this);
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
            const declaracaoAtual = ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual];
            this.erros.push({
                erroInterno: erro,
                linha: declaracaoAtual.linha,
                hashArquivo: declaracaoAtual.hashArquivo,
            });
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
        return comum.interpretar(this, declaracoes, manterAmbiente);
    }
}
exports.InterpretadorBirl = InterpretadorBirl;
//# sourceMappingURL=interpretador-birl.js.map