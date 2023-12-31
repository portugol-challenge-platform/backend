"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorEguaClassico = void 0;
const espaco_variaveis_1 = require("../../../espaco-variaveis");
const chamavel_1 = require("../../../estruturas/chamavel");
const delegua_classe_1 = require("../../../estruturas/delegua-classe");
const delegua_funcao_1 = require("../../../estruturas/delegua-funcao");
const funcao_padrao_1 = require("../../../estruturas/funcao-padrao");
const modulo_1 = require("../../../estruturas/modulo");
const objeto_delegua_classe_1 = require("../../../estruturas/objeto-delegua-classe");
const excecoes_1 = require("../../../excecoes");
const quebras_1 = require("../../../quebras");
const inferenciador_1 = require("../../inferenciador");
const pilha_escopos_execucao_1 = require("../../pilha-escopos-execucao");
const egua_classico_1 = __importDefault(require("../../../tipos-de-simbolos/egua-classico"));
const biblioteca_global_1 = __importDefault(require("../../../bibliotecas/dialetos/egua-classico/biblioteca-global"));
const resolvedor_1 = require("./resolvedor/resolvedor");
/**
 * O Interpretador visita todos os elementos complexos gerados pelo analisador sintático (Parser)
 * e de fato executa a lógica de programação descrita no código.
 */
class InterpretadorEguaClassico {
    constructor(diretorioBase) {
        this.interfaceEntradaSaida = null;
        this.resolvedor = new resolvedor_1.ResolvedorEguaClassico();
        this.diretorioBase = diretorioBase;
        this.funcaoDeRetorno = console.log;
        this.locais = new Map();
        this.erros = [];
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
    visitarExpressaoTipoDe(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoFalhar(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoParaCada(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoConst(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoConstMultiplo(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoFimPara(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoFormatacaoEscrita(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoEscrevaMesmaLinha(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoLeia(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoLeiaMultiplo(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoLiteral(expressao) {
        return expressao.valor;
    }
    avaliar(expressao) {
        return expressao.aceitar(this);
    }
    visitarExpressaoAgrupamento(expressao) {
        return this.avaliar(expressao.expressao);
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
        throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operador precisa ser um número.', operador.linha);
    }
    async visitarExpressaoUnaria(expr) {
        const direita = await this.avaliar(expr.direita);
        const valor = direita.hasOwnProperty('valor') ? direita.valor : direita;
        switch (expr.operador.tipo) {
            case egua_classico_1.default.SUBTRACAO:
                this.verificarOperandoNumero(expr.operador, valor);
                return -valor;
            case egua_classico_1.default.NEGACAO:
                return !this.eVerdadeiro(valor);
            case egua_classico_1.default.BIT_NOT:
                return ~valor;
        }
        return null;
    }
    eIgual(esquerda, direita) {
        if (esquerda && esquerda.tipo) {
            if (esquerda.tipo === 'nulo' && direita.tipo && direita.tipo === 'nulo')
                return true;
            if (esquerda.tipo === 'nulo')
                return false;
            return esquerda.valor === direita.valor;
        }
        if (esquerda === null && direita === null)
            return true;
        if (esquerda === null)
            return false;
        return esquerda === direita;
    }
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
            const valorEsquerdo = esquerda && esquerda.hasOwnProperty('valor') ? esquerda.valor : esquerda;
            const valorDireito = direita && direita.hasOwnProperty('valor') ? direita.valor : direita;
            const tipoEsquerdo = esquerda && esquerda.hasOwnProperty('tipo') ? esquerda.tipo : (0, inferenciador_1.inferirTipoVariavel)(esquerda);
            const tipoDireito = direita && direita.hasOwnProperty('tipo') ? direita.tipo : (0, inferenciador_1.inferirTipoVariavel)(direita);
            switch (expressao.operador.tipo) {
                case egua_classico_1.default.EXPONENCIACAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Math.pow(valorEsquerdo, valorDireito);
                case egua_classico_1.default.MAIOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) > Number(valorDireito);
                case egua_classico_1.default.MAIOR_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) >= Number(valorDireito);
                case egua_classico_1.default.MENOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) < Number(valorDireito);
                case egua_classico_1.default.MENOR_IGUAL:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) <= Number(valorDireito);
                case egua_classico_1.default.SUBTRACAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) - Number(valorDireito);
                case egua_classico_1.default.ADICAO:
                    if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                        return Number(valorEsquerdo) + Number(valorDireito);
                    }
                    else if (tipoEsquerdo === 'texto' && tipoDireito === 'texto') {
                        return String(valorEsquerdo) + String(valorDireito);
                    }
                    throw new excecoes_1.ErroEmTempoDeExecucao(expressao.operador, 'Operadores precisam ser dois números ou duas strings.');
                case egua_classico_1.default.DIVISAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) / Number(valorDireito);
                case egua_classico_1.default.MULTIPLICACAO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) * Number(valorDireito);
                case egua_classico_1.default.MODULO:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) % Number(valorDireito);
                case egua_classico_1.default.BIT_AND:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) & Number(valorDireito);
                case egua_classico_1.default.BIT_XOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) ^ Number(valorDireito);
                case egua_classico_1.default.BIT_OR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) | Number(valorDireito);
                case egua_classico_1.default.MENOR_MENOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) << Number(valorDireito);
                case egua_classico_1.default.MAIOR_MAIOR:
                    this.verificarOperandosNumeros(expressao.operador, esquerda, direita);
                    return Number(valorEsquerdo) >> Number(valorDireito);
                case egua_classico_1.default.DIFERENTE:
                    return !this.eIgual(valorEsquerdo, valorDireito);
                case egua_classico_1.default.IGUAL_IGUAL:
                    return this.eIgual(valorEsquerdo, valorDireito);
            }
            return null;
        }
        catch (erro) {
            return Promise.reject(erro);
        }
    }
    async visitarExpressaoDeChamada(expressao) {
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
                nome: variavelArgumento,
                valor: await this.avaliar(variavelArgumento),
            });
        }
        if (!(entidadeChamada instanceof chamavel_1.Chamavel)) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.parentese, 'Só pode chamar função ou classe.', expressao.linha);
        }
        let parametros;
        if (entidadeChamada instanceof delegua_funcao_1.DeleguaFuncao) {
            parametros = entidadeChamada.declaracao.parametros;
        }
        else if (entidadeChamada instanceof delegua_classe_1.DeleguaClasse) {
            parametros = entidadeChamada.metodos.inicializacao
                ? entidadeChamada.metodos.inicializacao.declaracao.parametros
                : [];
        }
        else {
            parametros = [];
        }
        // Isso aqui completa os parâmetros não preenchidos com nulos.
        if (argumentos.length < entidadeChamada.aridade()) {
            const diferenca = entidadeChamada.aridade() - argumentos.length;
            for (let i = 0; i < diferenca; i++) {
                argumentos.push(null);
            }
        }
        else {
            if (parametros && parametros.length > 0 && parametros[parametros.length - 1]['tipo'] === 'multiplo') {
                let novosArgumentos = argumentos.slice(0, parametros.length - 1);
                novosArgumentos = novosArgumentos.concat(argumentos.slice(parametros.length - 1, argumentos.length));
                argumentos = novosArgumentos;
            }
        }
        if (entidadeChamada instanceof funcao_padrao_1.FuncaoPadrao) {
            return entidadeChamada.chamar(argumentos.map((a) => (a !== null && a.hasOwnProperty('valor') ? a.valor : a)), expressao.entidadeChamada.nome);
        }
        return entidadeChamada.chamar(this, argumentos);
    }
    async visitarDeclaracaoDeAtribuicao(expressao) {
        const valor = await this.avaliar(expressao.valor);
        this.pilhaEscoposExecucao.atribuirVariavel(expressao.simbolo, valor);
        return valor;
    }
    procurarVariavel(simbolo, expressao) {
        return this.pilhaEscoposExecucao.obterValorVariavel(simbolo);
    }
    visitarExpressaoDeVariavel(expressao) {
        return this.procurarVariavel(expressao.simbolo, expressao);
    }
    async visitarDeclaracaoDeExpressao(declaracao) {
        return await this.avaliar(declaracao.expressao);
    }
    async visitarExpressaoLogica(expressao) {
        const esquerda = await this.avaliar(expressao.esquerda);
        if (expressao.operador.tipo === egua_classico_1.default.EM) {
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
        if (expressao.operador.tipo === egua_classico_1.default.OU) {
            if (this.eVerdadeiro(esquerda))
                return esquerda;
        }
        // se um estado for falso, retorna falso
        if (expressao.operador.tipo === egua_classico_1.default.E) {
            if (!this.eVerdadeiro(esquerda))
                return esquerda;
        }
        return await this.avaliar(expressao.direita);
    }
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
    async visitarDeclaracaoPara(declaracao) {
        if (declaracao.inicializador !== null) {
            await this.avaliar(declaracao.inicializador);
        }
        while (true) {
            if (declaracao.condicao !== null) {
                if (!this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
                    break;
                }
            }
            try {
                await this.executar(declaracao.corpo);
            }
            catch (erro) {
                throw erro;
            }
            if (declaracao.incrementar !== null) {
                await this.avaliar(declaracao.incrementar);
            }
        }
        return null;
    }
    async visitarDeclaracaoFazer(declaracao) {
        do {
            try {
                await this.executar(declaracao.caminhoFazer);
            }
            catch (erro) {
                throw erro;
            }
        } while (this.eVerdadeiro(await this.avaliar(declaracao.condicaoEnquanto)));
    }
    async visitarDeclaracaoEscolha(declaracao) {
        const condicaoEscolha = await this.avaliar(declaracao.identificadorOuLiteral);
        const caminhos = declaracao.caminhos;
        const caminhoPadrao = declaracao.caminhoPadrao;
        let encontrado = false;
        try {
            for (let i = 0; i < caminhos.length; i++) {
                const caminho = caminhos[i];
                for (let j = 0; j < caminho.condicoes.length; j++) {
                    if ((await this.avaliar(caminho.condicoes[j])) === condicaoEscolha) {
                        encontrado = true;
                        try {
                            for (let k = 0; k < caminho.declaracoes.length; k++) {
                                await this.executar(caminho.declaracoes[k]);
                            }
                        }
                        catch (erro) {
                            throw erro;
                        }
                    }
                }
            }
            if (caminhoPadrao !== null && encontrado === false) {
                for (let i = 0; i < caminhoPadrao.declaracoes.length; i++) {
                    await this.executar(caminhoPadrao['declaracoes'][i]);
                }
            }
        }
        catch (erro) {
            throw erro;
        }
    }
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
                    valorRetorno = await this.executarBloco(declaracao.caminhoPegue);
                }
                else {
                    this.erros.push(erro);
                }
            }
            if (sucesso && declaracao.caminhoSenao !== null) {
                valorRetorno = await this.executarBloco(declaracao.caminhoSenao);
            }
        }
        finally {
            if (declaracao.caminhoFinalmente !== null)
                valorRetorno = await this.executarBloco(declaracao.caminhoFinalmente);
        }
        return valorRetorno;
    }
    async visitarDeclaracaoEnquanto(declaracao) {
        while (this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
            try {
                await this.executar(declaracao.corpo);
            }
            catch (erro) {
                throw erro;
            }
        }
        return null;
    }
    // TODO: Implementar em `delegua-node`.
    async visitarDeclaracaoImportar(declaracao) {
        throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.simboloFechamento, 'Importação não suportada em núcleo da linguagem puro. Favor executar a aplicação usando o pacote NPM `delegua-node`.', declaracao.linha);
        /* const caminhoRelativo = await this.avaliar(declaracao.caminho);
        const caminhoTotal = caminho.join(this.diretorioBase, caminhoRelativo);
        // const nomeArquivo = caminho.basename(caminhoTotal);

        let dados: any = carregarModuloPorNome(caminhoRelativo);
        if (dados) return dados;

        try {
            if (!sistemaArquivos.existsSync(caminhoTotal)) {
                throw new ErroEmTempoDeExecucao(
                    declaracao.simboloFechamento,
                    'Não foi possível encontrar arquivo importado.',
                    declaracao.linha
                );
            }
        } catch (erro) {
            throw new ErroEmTempoDeExecucao(
                declaracao.simboloFechamento,
                'Não foi possível ler o arquivo.',
                declaracao.linha
            );
        }

        dados = sistemaArquivos.readFileSync(caminhoTotal).toString();

        const delegua = new Delegua(this.Delegua.dialeto, false);

        delegua.executar(dados);

        const exportar = this.pilhaEscoposExecucao.obterTodasDeleguaFuncao();

        const eDicionario = (objeto: any) => objeto.constructor === Object;

        if (eDicionario(exportar)) {
            const novoModulo = new DeleguaModulo();

            const chaves = Object.keys(exportar);
            for (let i = 0; i < chaves.length; i++) {
                novoModulo[chaves[i]] = exportar[chaves[i]];
            }

            return novoModulo;
        }

        return exportar; */
    }
    async visitarDeclaracaoEscreva(declaracao) {
        try {
            const resultadoAvaliacao = await this.avaliar(declaracao.argumentos[0]);
            let valor = (resultadoAvaliacao === null || resultadoAvaliacao === void 0 ? void 0 : resultadoAvaliacao.hasOwnProperty('valor')) ? resultadoAvaliacao.valor : resultadoAvaliacao;
            console.log(this.paraTexto(valor));
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
     *
     * Se o retorno do último bloco foi uma exceção (normalmente um erro em tempo de execução),
     * atira a exceção daqui.
     * Isso é usado, por exemplo, em blocos `tente ... pegue ... finalmente`.
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
            throw retornoUltimoEscopo;
        }
        return retornoUltimoEscopo;
    }
    async visitarExpressaoBloco(declaracao) {
        return await this.executarBloco(declaracao.declaracoes);
    }
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    async visitarDeclaracaoVar(declaracao) {
        let valorOuOutraVariavel = null;
        if (declaracao.inicializador !== null) {
            valorOuOutraVariavel = await this.avaliar(declaracao.inicializador);
        }
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, valorOuOutraVariavel && valorOuOutraVariavel.hasOwnProperty('valor')
            ? valorOuOutraVariavel.valor
            : valorOuOutraVariavel);
        return null;
    }
    async visitarDeclaracaoVarMultiplo(declaracao) {
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
    visitarExpressaoDeleguaFuncao(expressao) {
        return new delegua_funcao_1.DeleguaFuncao(null, expressao);
    }
    async visitarExpressaoAtribuicaoPorIndice(expressao) {
        const objeto = await this.avaliar(expressao.objeto);
        let indice = await this.avaliar(expressao.indice);
        const valor = await this.avaliar(expressao.valor);
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
            objeto instanceof objeto_delegua_classe_1.ObjetoDeleguaClasse ||
            objeto instanceof delegua_funcao_1.DeleguaFuncao ||
            objeto instanceof delegua_classe_1.DeleguaClasse ||
            objeto instanceof modulo_1.DeleguaModulo) {
            objeto[indice] = valor;
        }
        else {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha);
        }
    }
    async visitarExpressaoAcessoIndiceVariavel(expressao) {
        const variavelObjeto = await this.avaliar(expressao.entidadeChamada);
        const objeto = variavelObjeto.hasOwnProperty('valor') ? variavelObjeto.valor : variavelObjeto;
        let indice = await this.avaliar(expressao.indice);
        const valorIndice = indice.hasOwnProperty('valor') ? indice.valor : indice;
        if (Array.isArray(objeto)) {
            if (!Number.isInteger(valorIndice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha);
            }
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            if (indice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice do vetor fora do intervalo.', expressao.linha);
            }
            return objeto[indice];
        }
        else if (objeto.constructor === Object ||
            objeto instanceof objeto_delegua_classe_1.ObjetoDeleguaClasse ||
            objeto instanceof delegua_funcao_1.DeleguaFuncao ||
            objeto instanceof delegua_classe_1.DeleguaClasse ||
            objeto instanceof modulo_1.DeleguaModulo) {
            return objeto[indice] || null;
        }
        else if (typeof objeto === 'string') {
            if (!Number.isInteger(indice)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Somente inteiros podem ser usados para indexar um vetor.', expressao.linha);
            }
            if (indice < 0 && objeto.length !== 0) {
                while (indice < 0) {
                    indice += objeto.length;
                }
            }
            if (indice >= objeto.length) {
                throw new excecoes_1.ErroEmTempoDeExecucao(expressao.simboloFechamento, 'Índice fora do tamanho.', expressao.linha);
            }
            return objeto.charAt(indice);
        }
        else {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.entidadeChamada.nome, 'Somente listas, dicionários, classes e objetos podem ser mudados por sobrescrita.', expressao.linha);
        }
    }
    async visitarExpressaoDefinirValor(expressao) {
        const objeto = await this.avaliar(expressao.objeto);
        if (!(objeto instanceof objeto_delegua_classe_1.ObjetoDeleguaClasse) && objeto.constructor !== Object) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.objeto.nome, 'Somente instâncias e dicionários podem possuir campos.', expressao.linha);
        }
        const valor = await this.avaliar(expressao.valor);
        if (objeto instanceof objeto_delegua_classe_1.ObjetoDeleguaClasse) {
            objeto.definir(expressao.nome, valor);
            return valor;
        }
        else if (objeto.constructor === Object) {
            objeto[expressao.simbolo.lexema] = valor;
        }
    }
    visitarDeclaracaoDefinicaoFuncao(declaracao) {
        const funcao = new delegua_funcao_1.DeleguaFuncao(declaracao.simbolo.lexema, declaracao.funcao);
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, funcao);
    }
    async visitarDeclaracaoClasse(declaracao) {
        let superClasse = null;
        if (declaracao.superClasse !== null) {
            const variavelSuperClasse = await this.avaliar(declaracao.superClasse);
            superClasse = variavelSuperClasse.valor;
            if (!(superClasse instanceof delegua_classe_1.DeleguaClasse)) {
                throw new excecoes_1.ErroEmTempoDeExecucao(declaracao.superClasse.nome, 'Superclasse precisa ser uma classe.', declaracao.linha);
            }
        }
        this.pilhaEscoposExecucao.definirVariavel(declaracao.simbolo.lexema, null);
        if (declaracao.superClasse !== null) {
            this.pilhaEscoposExecucao.definirVariavel('super', superClasse);
        }
        const metodos = {};
        const definirMetodos = declaracao.metodos;
        for (let i = 0; i < declaracao.metodos.length; i++) {
            const metodoAtual = definirMetodos[i];
            const eInicializador = metodoAtual.simbolo.lexema === 'construtor';
            const funcao = new delegua_funcao_1.DeleguaFuncao(metodoAtual.simbolo.lexema, metodoAtual.funcao, undefined, eInicializador);
            metodos[metodoAtual.simbolo.lexema] = funcao;
        }
        const deleguaClasse = new delegua_classe_1.DeleguaClasse(declaracao.simbolo.lexema, superClasse, metodos);
        // TODO: Recolocar isso se for necessário.
        /* if (superClasse !== null) {
            this.ambiente = this.ambiente.enclosing;
        } */
        this.pilhaEscoposExecucao.atribuirVariavel(declaracao.simbolo, deleguaClasse);
        return null;
    }
    async visitarExpressaoAcessoMetodo(expressao) {
        const variavelObjeto = await this.avaliar(expressao.objeto);
        const objeto = variavelObjeto === null || variavelObjeto === void 0 ? void 0 : variavelObjeto.valor;
        if (objeto instanceof objeto_delegua_classe_1.ObjetoDeleguaClasse) {
            return objeto.obter(expressao.simbolo) || null;
        }
        else if (objeto.constructor === Object) {
            return objeto[expressao.simbolo.lexema] || null;
        }
        else if (objeto instanceof modulo_1.DeleguaModulo) {
            return objeto[expressao.simbolo.lexema] || null;
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(expressao.nome, 'Você só pode acessar métodos do objeto e dicionários.', expressao.linha);
    }
    visitarExpressaoIsto(expressao) {
        return this.procurarVariavel(expressao.palavraChave, expressao);
    }
    async visitarExpressaoDicionario(expressao) {
        const dicionario = {};
        for (let i = 0; i < expressao.chaves.length; i++) {
            dicionario[await this.avaliar(expressao.chaves[i])] = await this.avaliar(expressao.valores[i]);
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
        const distancia = this.locais.get(expressao);
        const superClasse = this.pilhaEscoposExecucao.obterVariavelEm(distancia, 'super');
        const objeto = this.pilhaEscoposExecucao.obterVariavelEm(distancia - 1, 'isto');
        const metodo = superClasse.valor.encontrarMetodo(expressao.metodo.lexema);
        if (metodo === undefined) {
            throw new excecoes_1.ErroEmTempoDeExecucao(expressao.metodo, 'Método chamado indefinido.', expressao.linha);
        }
        return metodo.definirInstancia(objeto.valor);
    }
    paraTexto(objeto) {
        if (objeto === null)
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
        if (typeof objeto === 'object')
            return JSON.stringify(objeto);
        if (objeto === undefined) {
            return 'nulo';
        }
        return objeto.toString();
    }
    async executar(declaracao, mostrarResultado = false) {
        return await declaracao.aceitar(this);
    }
    /**
     * Executa o último escopo empilhado no topo na pilha de escopos do Interpretador.
     * Originalmente, Égua não trabalha com uma pilha de escopos.
     *
     * O tratamento das exceções é feito de acordo com o bloco chamador.
     * Por exemplo, em `tente ... pegue ... finalmente`, a exceção é capturada e tratada.
     * Em outros blocos, pode ser desejável ter o erro em tela.
     *
     * Essa implementação é derivada do Interpretador de Delégua, mas simulando todos os
     * comportamos do interpretador Égua original.
     * Interpretador Égua: https://github.com/eguatech/egua/blob/master/src/interpreter.js
     * @returns O resultado da execução do escopo, se houver.
     */
    async executarUltimoEscopo() {
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
        }
    }
    async interpretar(declaracoes) {
        this.erros = [];
        const retornoResolvedor = this.resolvedor.resolver(declaracoes);
        this.locais = retornoResolvedor.locais;
        const escopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            ambiente: new espaco_variaveis_1.EspacoVariaveis(),
            finalizado: false,
            tipo: 'outro',
            emLacoRepeticao: false,
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        await this.executarUltimoEscopo();
        return {
            erros: this.erros,
        };
    }
    finalizacao() {
        this.funcaoDeRetorno();
    }
}
exports.InterpretadorEguaClassico = InterpretadorEguaClassico;
//# sourceMappingURL=interpretador-egua-classico.js.map