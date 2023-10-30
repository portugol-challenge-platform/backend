"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorBase = void 0;
const browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
const espaco_variaveis_1 = require("../espaco-variaveis");
const biblioteca_global_1 = __importDefault(require("../bibliotecas/biblioteca-global"));
const micro_lexador_1 = require("./../../fontes/lexador/micro-lexador");
const micro_avaliador_sintatico_1 = require("./../../fontes/avaliador-sintatico/micro-avaliador-sintatico");
const excecoes_1 = require("../excecoes");
const estruturas_1 = require("../estruturas");
const construtos_1 = require("../construtos");
const pilha_escopos_execucao_1 = require("./pilha-escopos-execucao");
const quebras_1 = require("../quebras");
const inferenciador_1 = require("./inferenciador");
const metodo_primitiva_1 = require("../estruturas/metodo-primitiva");
const primitivas_texto_1 = __importDefault(require("../bibliotecas/primitivas-texto"));
const primitivas_vetor_1 = __importDefault(require("../bibliotecas/primitivas-vetor"));
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
/**
 * O Interpretador visita todos os elementos complexos gerados pelo avaliador sintático (_parser_),
 * e de fato executa a lógica de programação descrita no código.
 *
 * O Interpretador Base não contém dependências com o Node.js. É
 * recomendado para uso em execuções que ocorrem no navegador de internet.
 */
class InterpretadorBase {
    constructor(diretorioBase, performance = false, funcaoDeRetorno = null, funcaoDeRetornoMesmaLinha = null) {
        this.resultadoInterpretador = [];
        this.funcaoDeRetorno = null;
        this.funcaoDeRetornoMesmaLinha = null;
        this.interfaceDeEntrada = null; // Originalmente é `readline.Interface`
        this.interfaceEntradaSaida = null;
        this.microLexador = new micro_lexador_1.MicroLexador();
        this.microAvaliadorSintatico = new micro_avaliador_sintatico_1.MicroAvaliadorSintatico();
        this.regexInterpolacao = /\${(.*?)}/g;
        this.diretorioBase = diretorioBase;
        this.performance = performance;
        this.funcaoDeRetorno = funcaoDeRetorno || console.log;
        this.funcaoDeRetornoMesmaLinha = funcaoDeRetornoMesmaLinha || process.stdout.write.bind(process.stdout);
        this.erros = [];
        this.declaracoes = [];
        this.resultadoInterpretador = [];
        // Isso existe por causa de Potigol.
        // Para acessar uma variável de classe, não é preciso a palavra `isto`.
        this.expandirPropriedadesDeObjetosEmEspacoVariaveis = false;
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
        (0, biblioteca_global_1.default)(this, this.pilhaEscoposExecucao);
    }
    async visitarExpressaoTipoDe(expressao) {
        let tipoDe = expressao.valor;
        if (tipoDe instanceof construtos_1.Binario ||
            tipoDe instanceof construtos_1.TipoDe ||
            tipoDe instanceof construtos_1.Unario ||
            tipoDe instanceof construtos_1.Variavel) {
            tipoDe = await this.avaliar(tipoDe);
            return tipoDe.tipo || (0, inferenciador_1.inferirTipoVariavel)(tipoDe);
        }
        return (0, inferenciador_1.inferirTipoVariavel)((tipoDe === null || tipoDe === void 0 ? void 0 : tipoDe.valores) || tipoDe);
    }
    visitarExpressaoFalhar(expressao) {
        throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simbolo, expressao.explicacao, expressao.linha);
    }
    visitarExpressaoFimPara(declaracao) {
        throw new Error('Método não implementado.');
    }
    async avaliar(expressao) {
        // Descomente o código abaixo quando precisar detectar expressões undefined ou nulas.
        // Por algum motivo o depurador do VSCode não funciona direito aqui
        // com breakpoint condicional.
        /* if (expressao === null || expressao === undefined) {
            console.log('Aqui');
        } */
        return await expressao.aceitar(this);
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
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo `LeiaMultiplo`.
     * @returns Promise com o resultado da leitura.
     */
    async visitarExpressaoLeiaMultiplo(expressao) {
        const mensagem = expressao.argumentos && expressao.argumentos[0] ? expressao.argumentos[0].valor : '> ';
        return new Promise((resolucao) => this.interfaceEntradaSaida.question(mensagem, (resposta) => {
            resolucao(String(resposta)
                .split(/(\s+)/)
                .filter((r) => !/(\s+)/.test(r)));
        }));
    }
    /**
     * Retira a interpolação de um texto.
     * @param {texto} texto O texto
     * @param {any[]} variaveis A lista de variaveis interpoladas
     * @returns O texto com o valor das variaveis.
     */
    retirarInterpolacao(texto, variaveis) {
        let textoFinal = texto;
        variaveis.forEach((elemento) => {
            var _a, _b, _c;
            if (((_a = elemento === null || elemento === void 0 ? void 0 : elemento.valor) === null || _a === void 0 ? void 0 : _a.tipo) === 'lógico') {
                textoFinal = textoFinal.replace('${' + elemento.variavel + '}', this.paraTexto((_b = elemento === null || elemento === void 0 ? void 0 : elemento.valor) === null || _b === void 0 ? void 0 : _b.valor));
            }
            else {
                textoFinal = textoFinal.replace('${' + elemento.variavel + '}', ((_c = elemento === null || elemento === void 0 ? void 0 : elemento.valor) === null || _c === void 0 ? void 0 : _c.valor) || (elemento === null || elemento === void 0 ? void 0 : elemento.valor));
            }
        });
        return textoFinal;
    }
    /**
     * Resolve todas as interpolações em um texto.
     * @param {texto} textoOriginal O texto original com as variáveis interpoladas.
     * @returns Uma lista de variáveis interpoladas.
     */
    async resolverInterpolacoes(textoOriginal, linha) {
        const variaveis = textoOriginal.match(this.regexInterpolacao);
        let resultadosAvaliacaoSintatica = variaveis.map((s) => {
            const nomeVariavel = s.replace(/[\$\{\}]*/gm, '');
            let microLexador = this.microLexador.mapear(nomeVariavel);
            const resultadoMicroAvaliadorSintatico = this.microAvaliadorSintatico.analisar(microLexador, linha);
            return {
                nomeVariavel,
                resultadoMicroAvaliadorSintatico,
            };
        });
        // TODO: Verificar erros do `resultadosAvaliacaoSintatica`.
        const resolucoesPromises = await Promise.all(resultadosAvaliacaoSintatica
            .flatMap((r) => r.resultadoMicroAvaliadorSintatico.declaracoes)
            .map((d) => this.avaliar(d)));
        return resolucoesPromises.map((item, indice) => ({
            variavel: resultadosAvaliacaoSintatica[indice].nomeVariavel,
            valor: item,
        }));
    }
    async visitarExpressaoLiteral(expressao) {
        if (this.regexInterpolacao.test(expressao.valor)) {
            const variaveis = await this.resolverInterpolacoes(expressao.valor, expressao.linha);
            return this.retirarInterpolacao(expressao.valor, variaveis);
        }
        return expressao.valor;
    }
    async visitarExpressaoAgrupamento(expressao) {
        return await this.avaliar(expressao.expressao);
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
    verificarOperandoNumero(operador, operando) {
        if (typeof operando === 'number' || operando.tipo === 'número')
            return;
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operando precisa ser um número.', Number(operador.linha));
    }
    async visitarExpressaoUnaria(expressao) {
        const operando = await this.avaliar(expressao.operando);
        let valor = operando.hasOwnProperty('valor') ? operando.valor : operando;
        switch (expressao.operador.tipo) {
            case delegua_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expressao.operador, valor);
                return -valor;
            case delegua_1.default.NEGACAO:
                return !this.eVerdadeiro(valor);
            case delegua_1.default.BIT_NOT:
                return ~valor;
            // Para incrementar e decrementar, primeiro precisamos saber se o operador
            // veio antes do literal ou variável.
            // Se veio antes e o operando é uma variável, precisamos incrementar/decrementar,
            // armazenar o valor da variável pra só então devolver o valor.
            case delegua_1.default.INCREMENTAR:
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
            case delegua_1.default.DECREMENTAR:
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
                case delegua_1.default.EXPONENCIACAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Math.pow(valorEsquerdo, valorDireito);
                case delegua_1.default.MAIOR:
                    if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                        return Number(valorEsquerdo) > Number(valorDireito);
                    }
                    else {
                        return String(valorEsquerdo) > String(valorDireito);
                    }
                case delegua_1.default.MAIOR_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) >= Number(valorDireito);
                case delegua_1.default.MENOR:
                    if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                        return Number(valorEsquerdo) < Number(valorDireito);
                    }
                    else {
                        return String(valorEsquerdo) < String(valorDireito);
                    }
                case delegua_1.default.MENOR_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) <= Number(valorDireito);
                case delegua_1.default.SUBTRACAO:
                case delegua_1.default.MENOS_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) - Number(valorDireito);
                case delegua_1.default.ADICAO:
                case delegua_1.default.MAIS_IGUAL:
                    if (['número', 'inteiro'].includes(tipoEsquerdo) && ['número', 'inteiro'].includes(tipoDireito)) {
                        return Number(valorEsquerdo) + Number(valorDireito);
                    }
                    else {
                        return String(valorEsquerdo) + String(valorDireito);
                    }
                case delegua_1.default.DIVISAO:
                case delegua_1.default.DIVISAO_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) / Number(valorDireito);
                case delegua_1.default.DIVISAO_INTEIRA:
                case delegua_1.default.DIVISAO_INTEIRA_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Math.floor(Number(valorEsquerdo) / Number(valorDireito));
                case delegua_1.default.MULTIPLICACAO:
                case delegua_1.default.MULTIPLICACAO_IGUAL:
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
                case delegua_1.default.MODULO:
                case delegua_1.default.MODULO_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) % Number(valorDireito);
                case delegua_1.default.BIT_AND:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) & Number(valorDireito);
                case delegua_1.default.BIT_XOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) ^ Number(valorDireito);
                case delegua_1.default.BIT_OR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) | Number(valorDireito);
                case delegua_1.default.MENOR_MENOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) << Number(valorDireito);
                case delegua_1.default.MAIOR_MAIOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) >> Number(valorDireito);
                case delegua_1.default.DIFERENTE:
                    return !this.eIgual(valorEsquerdo, valorDireito);
                case delegua_1.default.IGUAL_IGUAL:
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
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Entidade chamada é um módulo de Delégua. Provavelmente você quer chamar um de seus componentes?', expressao.linha));
            }
            if (entidadeChamada instanceof metodo_primitiva_1.MetodoPrimitiva) {
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
                parametros = entidadeChamada.metodos.construtor
                    ? entidadeChamada.metodos.construtor.declaracao.parametros
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
                    return entidadeChamada.chamar(argumentos.map((a) => a && a.valor && a.valor.hasOwnProperty('valor') ? a.valor.valor : a === null || a === void 0 ? void 0 : a.valor), expressao.entidadeChamada.nome);
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
                const retornoEntidadeChamada = await entidadeChamada.chamar(this, argumentos);
                return retornoEntidadeChamada;
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
    /**
     * Execução de uma expressão de atribuição.
     * @param expressao A expressão.
     * @returns O valor atribuído.
     */
    async visitarDeclaracaoDeAtribuicao(expressao) {
        const valor = await this.avaliar(expressao.valor);
        const valorResolvido = valor.hasOwnProperty('valor') ? valor.valor : valor;
        this.pilhaEscoposExecucao.atribuirVariavel(expressao.simbolo, valorResolvido);
        return valorResolvido;
    }
    procurarVariavel(simbolo) {
        return this.pilhaEscoposExecucao.obterValorVariavel(simbolo);
    }
    visitarExpressaoDeVariavel(expressao) {
        return this.procurarVariavel(expressao.simbolo);
    }
    async visitarDeclaracaoDeExpressao(declaracao) {
        return await this.avaliar(declaracao.expressao);
    }
    async visitarExpressaoLogica(expressao) {
        const esquerda = await this.avaliar(expressao.esquerda);
        if (expressao.operador.tipo === delegua_1.default.EM) {
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
        if (expressao.operador.tipo === delegua_1.default.OU) {
            if (this.eVerdadeiro(esquerda))
                return esquerda;
        }
        // se um estado for falso, retorna falso
        if (expressao.operador.tipo === delegua_1.default.E) {
            if (!this.eVerdadeiro(esquerda))
                return esquerda;
        }
        return await this.avaliar(expressao.direita);
    }
    async visitarDeclaracaoPara(declaracao) {
        var _a;
        const declaracaoInicializador = ((_a = declaracao.inicializador) === null || _a === void 0 ? void 0 : _a.length)
            ? declaracao.inicializador[0]
            : declaracao.inicializador;
        if (declaracaoInicializador !== null) {
            await this.avaliar(declaracaoInicializador);
        }
        let retornoExecucao;
        while (!(retornoExecucao instanceof quebras_1.Quebra)) {
            if (declaracao.condicao !== null && !this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
                break;
            }
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
            if (declaracao.incrementar !== null) {
                await this.avaliar(declaracao.incrementar);
            }
        }
        return retornoExecucao;
    }
    async visitarDeclaracaoParaCada(declaracao) {
        let retornoExecucao;
        const vetorResolvido = await this.avaliar(declaracao.vetor);
        const valorVetorResolvido = vetorResolvido.hasOwnProperty('valor') ? vetorResolvido.valor : vetorResolvido;
        if (!Array.isArray(valorVetorResolvido)) {
            return Promise.reject("Variável ou literal provida em instrução 'para cada' não é um vetor.");
        }
        while (!(retornoExecucao instanceof quebras_1.Quebra) && declaracao.posicaoAtual < valorVetorResolvido.length) {
            try {
                this.pilhaEscoposExecucao.definirVariavel(declaracao.nomeVariavelIteracao, valorVetorResolvido[declaracao.posicaoAtual]);
                retornoExecucao = await this.executar(declaracao.corpo);
                if (retornoExecucao instanceof quebras_1.SustarQuebra) {
                    return null;
                }
                if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                    retornoExecucao = null;
                }
                declaracao.posicaoAtual++;
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
    async visitarDeclaracaoEscolha(declaracao) {
        const condicaoEscolha = await this.avaliar(declaracao.identificadorOuLiteral);
        const valorCondicaoEscolha = condicaoEscolha.hasOwnProperty('valor') ? condicaoEscolha.valor : condicaoEscolha;
        const caminhos = declaracao.caminhos;
        const caminhoPadrao = declaracao.caminhoPadrao;
        let encontrado = false;
        try {
            for (let i = 0; i < caminhos.length; i++) {
                const caminho = caminhos[i];
                for (let j = 0; j < caminho.condicoes.length; j++) {
                    const condicaoAvaliada = await this.avaliar(caminho.condicoes[j]);
                    if (condicaoAvaliada === valorCondicaoEscolha) {
                        encontrado = true;
                        try {
                            await this.executarBloco(caminho.declaracoes);
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
                }
            }
            if (caminhoPadrao !== null && !encontrado) {
                await this.executarBloco(caminhoPadrao.declaracoes);
            }
        }
        catch (erro) {
            this.erros.push({
                erroInterno: erro,
                linha: declaracao.linha,
                hashArquivo: declaracao.hashArquivo,
            });
            throw erro;
        }
    }
    async visitarDeclaracaoFazer(declaracao) {
        let retornoExecucao;
        do {
            try {
                retornoExecucao = await this.executar(declaracao.caminhoFazer);
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
        } while (!(retornoExecucao instanceof quebras_1.Quebra) &&
            this.eVerdadeiro(await this.avaliar(declaracao.condicaoEnquanto)));
    }
    /**
     * Interpretação de uma declaração `tente`.
     * @param declaracao O objeto da declaração.
     */
    async visitarDeclaracaoTente(declaracao) {
        let valorRetorno;
        try {
            let sucesso = true;
            try {
                valorRetorno = await this.executarBloco(declaracao.caminhoTente);
            }
            catch (erro) {
                sucesso = false;
                if (declaracao.caminhoPegue !== null) {
                    // `caminhoPegue` aqui pode ser um construto de função (se `pegue` tem parâmetros)
                    // ou um vetor de `Declaracao` (`pegue` sem parâmetros).
                    // As execuções, portanto, são diferentes.
                    if (Array.isArray(declaracao.caminhoPegue)) {
                        valorRetorno = await this.executarBloco(declaracao.caminhoPegue);
                    }
                    else {
                        const literalErro = new construtos_1.Literal(declaracao.hashArquivo, Number(declaracao.linha), erro.mensagem);
                        const chamadaPegue = new construtos_1.Chamada(declaracao.caminhoPegue.hashArquivo, declaracao.caminhoPegue, null, [literalErro]);
                        valorRetorno = await chamadaPegue.aceitar(this);
                    }
                }
            }
        }
        finally {
            if (declaracao.caminhoFinalmente !== null)
                valorRetorno = await this.executarBloco(declaracao.caminhoFinalmente);
        }
        return valorRetorno;
    }
    async visitarDeclaracaoImportar(declaracao) {
        return Promise.reject('Importação de arquivos não suportada por Interpretador Base.');
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
     * Execução de uma escrita na saída padrão, sem quebras de linha.
     * Implementada para alguns dialetos, como VisuAlg.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
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
     * Executa expressão de definição de constante.
     * @param declaracao A declaração `Const`.
     * @returns Sempre retorna nulo.
     */
    async visitarDeclaracaoConst(declaracao) {
        const valorFinal = await this.avaliacaoDeclaracaoVarOuConst(declaracao);
        let subtipo;
        if (declaracao.tipo !== undefined) {
            subtipo = declaracao.tipo;
        }
        this.pilhaEscoposExecucao.definirConstante(declaracao.simbolo.lexema, valorFinal, subtipo);
        return null;
    }
    /**
     * Executa expressão de definição de múltiplas constantes.
     * @param declaracao A declaração `ConstMultiplo`.
     * @returns Sempre retorna nulo.
     */
    async visitarDeclaracaoConstMultiplo(declaracao) {
        const valoresFinais = await this.avaliacaoDeclaracaoVarOuConst(declaracao);
        for (let [indice, valor] of valoresFinais.entries()) {
            let subtipo;
            if (declaracao.tipo !== undefined) {
                subtipo = declaracao.tipo;
            }
            this.pilhaEscoposExecucao.definirConstante(declaracao.simbolos[indice].lexema, valor, subtipo);
        }
        return null;
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
    visitarExpressaoDeleguaFuncao(declaracao) {
        return new estruturas_1.DeleguaFuncao(null, declaracao);
    }
    async visitarExpressaoAtribuicaoPorIndice(expressao) {
        const promises = await Promise.all([
            this.avaliar(expressao.objeto),
            this.avaliar(expressao.indice),
            this.avaliar(expressao.valor),
        ]);
        let objeto = promises[0];
        let indice = promises[1];
        const valor = promises[2];
        objeto = objeto.hasOwnProperty('valor') ? objeto.valor : objeto;
        indice = indice.hasOwnProperty('valor') ? indice.valor : indice;
        if (Array.isArray(objeto)) {
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            while (objeto.length < indice) {
                objeto.push(null);
            }
            objeto[indice] = valor;
        }
        else if (objeto.constructor === Object ||
            objeto instanceof estruturas_1.ObjetoDeleguaClasse ||
            objeto instanceof estruturas_1.DeleguaFuncao ||
            objeto instanceof estruturas_1.DeleguaClasse ||
            objeto instanceof estruturas_1.DeleguaModulo) {
            objeto[indice] = valor;
        }
        else {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha));
        }
    }
    async visitarExpressaoAcessoIndiceVariavel(expressao) {
        const promises = await Promise.all([this.avaliar(expressao.entidadeChamada), this.avaliar(expressao.indice)]);
        const variavelObjeto = promises[0];
        const indice = promises[1];
        const objeto = variavelObjeto.hasOwnProperty('valor') ? variavelObjeto.valor : variavelObjeto;
        let valorIndice = indice.hasOwnProperty('valor') ? indice.valor : indice;
        if (Array.isArray(objeto)) {
            if (!Number.isInteger(valorIndice)) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha));
            }
            if (valorIndice < 0 && objeto.length !== 0) {
                while (valorIndice < 0) {
                    valorIndice += objeto.length;
                }
            }
            if (valorIndice >= objeto.length) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice do vetor fora do intervalo.', expressao.linha));
            }
            return objeto[valorIndice];
        }
        else if (objeto.constructor === Object ||
            objeto instanceof estruturas_1.ObjetoDeleguaClasse ||
            objeto instanceof estruturas_1.DeleguaFuncao ||
            objeto instanceof estruturas_1.DeleguaClasse ||
            objeto instanceof estruturas_1.DeleguaModulo) {
            return objeto[valorIndice] || null;
        }
        else if (typeof objeto === 'string') {
            if (!Number.isInteger(valorIndice)) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha));
            }
            if (valorIndice < 0 && objeto.length !== 0) {
                while (valorIndice < 0) {
                    valorIndice += objeto.length;
                }
            }
            if (valorIndice >= objeto.length) {
                return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice fora do tamanho.', expressao.linha));
            }
            return objeto.charAt(valorIndice);
        }
        else {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.entidadeChamada.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha));
        }
    }
    async visitarExpressaoDefinirValor(expressao) {
        const variavelObjeto = await this.avaliar(expressao.objeto);
        const objeto = variavelObjeto.hasOwnProperty('valor') ? variavelObjeto.valor : variavelObjeto;
        if (!(objeto instanceof estruturas_1.ObjetoDeleguaClasse) && objeto.constructor !== Object) {
            return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente instâncias e dicionários podem possuir campos.', expressao.linha));
        }
        const valor = await this.avaliar(expressao.valor);
        if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
            objeto.definir(expressao.nome, valor);
            return valor;
        }
        else if (objeto.constructor === Object) {
            objeto[expressao.simbolo.lexema] = valor;
        }
    }
    visitarDeclaracaoDefinicaoFuncao(declaracao) {
        const funcao = new estruturas_1.DeleguaFuncao(declaracao.simbolo.lexema, declaracao.funcao);
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, funcao);
    }
    /**
     * Executa uma declaração de classe.
     * @param declaracao A declaração de classe.
     * @returns Sempre retorna nulo, por ser requerido pelo contrato de visita.
     */
    async visitarDeclaracaoClasse(declaracao) {
        let superClasse = null;
        if (declaracao.superClasse !== null && declaracao.superClasse !== undefined) {
            const variavelSuperClasse = await this.avaliar(declaracao.superClasse);
            superClasse = variavelSuperClasse.valor;
            if (!(superClasse instanceof estruturas_1.DeleguaClasse)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.superClasse.nome, 'Superclasse precisa ser uma classe.', declaracao.linha);
            }
        }
        // TODO: Precisamos disso?
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, declaracao);
        if (declaracao.superClasse !== null && declaracao.superClasse !== undefined) {
            this.pilhaEscoposExecucao.definirVariavel('super', superClasse);
        }
        const metodos = {};
        const definirMetodos = declaracao.metodos;
        for (let i = 0; i < declaracao.metodos.length; i++) {
            const metodoAtual = definirMetodos[i];
            const eInicializador = metodoAtual.simbolo.lexema === 'construtor';
            const funcao = new estruturas_1.DeleguaFuncao(metodoAtual.simbolo.lexema, metodoAtual.funcao, undefined, eInicializador);
            metodos[metodoAtual.simbolo.lexema] = funcao;
        }
        const deleguaClasse = new estruturas_1.DeleguaClasse(declaracao.simbolo.lexema, superClasse, metodos, declaracao.propriedades);
        deleguaClasse.dialetoRequerExpansaoPropriedadesEspacoVariaveis =
            this.expandirPropriedadesDeObjetosEmEspacoVariaveis;
        // TODO: Recolocar isso se for necessário.
        /* if (superClasse !== null) {
            this.ambiente = this.ambiente.enclosing;
        } */
        this.pilhaEscoposExecucao.atribuirVariavel(declaracao.simbolo, deleguaClasse);
        return null;
    }
    /**
     * Executa um acesso a método, normalmente de um objeto de classe.
     * @param expressao A expressão de acesso.
     * @returns O resultado da execução.
     */
    async visitarExpressaoAcessoMetodo(expressao) {
        const variavelObjeto = await this.avaliar(expressao.objeto);
        const objeto = variavelObjeto.hasOwnProperty('valor') ? variavelObjeto.valor : variavelObjeto;
        if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
            return objeto.obter(expressao.simbolo) || null;
        }
        // TODO: Possivelmente depreciar esta forma.
        // Não parece funcionar em momento algum.
        if (objeto.constructor === Object) {
            return objeto[expressao.simbolo.lexema] || null;
        }
        // Função tradicional do JavaScript.
        // Normalmente executa quando uma biblioteca é importada.
        if (typeof objeto[expressao.simbolo.lexema] === 'function') {
            return objeto[expressao.simbolo.lexema];
        }
        // Objeto tradicional do JavaScript.
        // Normalmente executa quando uma biblioteca é importada.
        if (typeof objeto[expressao.simbolo.lexema] === 'object') {
            return objeto[expressao.simbolo.lexema];
        }
        if (objeto instanceof estruturas_1.DeleguaModulo) {
            return objeto.componentes[expressao.simbolo.lexema] || null;
        }
        let tipoObjeto = variavelObjeto.tipo;
        if (tipoObjeto === null || tipoObjeto === undefined) {
            tipoObjeto = (0, inferenciador_1.inferirTipoVariavel)(variavelObjeto);
        }
        switch (tipoObjeto) {
            case 'texto':
                const metodoDePrimitivaTexto = primitivas_texto_1.default[expressao.simbolo.lexema];
                if (metodoDePrimitivaTexto) {
                    return new metodo_primitiva_1.MetodoPrimitiva(objeto, metodoDePrimitivaTexto);
                }
                break;
            case 'vetor':
                const metodoDePrimitivaVetor = primitivas_vetor_1.default[expressao.simbolo.lexema];
                if (metodoDePrimitivaVetor) {
                    return new metodo_primitiva_1.MetodoPrimitiva(objeto, metodoDePrimitivaVetor);
                }
                break;
        }
        return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.nome, `Método para objeto ou primitiva não encontrado: ${expressao.simbolo.lexema}.`, expressao.linha));
    }
    visitarExpressaoIsto(expressao) {
        return this.procurarVariavel(expressao.palavraChave);
    }
    async visitarExpressaoDicionario(expressao) {
        const dicionario = {};
        for (let i = 0; i < expressao.chaves.length; i++) {
            const promises = await Promise.all([this.avaliar(expressao.chaves[i]), this.avaliar(expressao.valores[i])]);
            dicionario[promises[0]] = promises[1];
        }
        return dicionario;
    }
    async visitarExpressaoVetor(expressao) {
        const valores = [];
        for (let i = 0; i < expressao.valores.length; i++) {
            valores.push(await this.avaliar(expressao.valores[i]));
        }
        return valores;
    }
    visitarExpressaoSuper(expressao) {
        const superClasse = this.pilhaEscoposExecucao.obterVariavelPorNome('super');
        const objeto = this.pilhaEscoposExecucao.obterVariavelPorNome('isto');
        const metodo = superClasse.valor.encontrarMetodo(expressao.metodo.lexema);
        if (metodo === undefined) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.metodo, 'Método chamado indefinido.', expressao.linha);
        }
        metodo.instancia = objeto.valor;
        return metodo;
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
    /**
     * Executa expressão de definição de múltiplas variáveis.
     * @param declaracao A declaração `VarMultiplo`.
     * @returns Sempre retorna nulo.
     */
    async visitarDeclaracaoVarMultiplo(declaracao) {
        const valoresFinais = await this.avaliacaoDeclaracaoVarOuConst(declaracao);
        for (let [indice, valor] of valoresFinais.entries()) {
            let subtipo;
            if (declaracao.tipo !== undefined) {
                subtipo = declaracao.tipo;
            }
            this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolos[indice].lexema, valor, subtipo);
        }
        return null;
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
            const escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
            if (manterAmbiente) {
                escopoAnterior.ambiente.valores = Object.assign(escopoAnterior.ambiente.valores, ultimoEscopo.ambiente.valores);
            }
        }
    }
    /**
     * Interpretação sem depurador, com medição de performance.
     * Método que efetivamente inicia o processo de interpretação.
     * @param declaracoes Um vetor de declarações gerado pelo Avaliador Sintático.
     * @param manterAmbiente Se ambiente de execução (variáveis, classes, etc.) deve ser mantido. Normalmente usado
     *                       pelo modo REPL (LAIR).
     * @returns Um objeto com o resultado da interpretação.
     */
    async interpretar(declaracoes, manterAmbiente = false) {
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
        const inicioInterpretacao = (0, browser_process_hrtime_1.default)();
        try {
            const retornoOuErro = await this.executarUltimoEscopo(manterAmbiente);
            if (retornoOuErro instanceof excecoes_1.ErroEmTempoDeExecucao) {
                this.erros.push(retornoOuErro);
            }
        }
        catch (erro) {
            this.erros.push({
                erroInterno: erro,
                linha: -1,
                hashArquivo: -1,
            });
        }
        finally {
            if (this.performance) {
                const deltaInterpretacao = (0, browser_process_hrtime_1.default)(inicioInterpretacao);
                console.log(`[Interpretador] Tempo para interpretaçao: ${deltaInterpretacao[0] * 1e9 + deltaInterpretacao[1]}ns`);
            }
            const retorno = {
                erros: this.erros,
                resultado: this.resultadoInterpretador,
            };
            this.resultadoInterpretador = [];
            return retorno;
        }
    }
}
exports.InterpretadorBase = InterpretadorBase;
//# sourceMappingURL=interpretador-base.js.map