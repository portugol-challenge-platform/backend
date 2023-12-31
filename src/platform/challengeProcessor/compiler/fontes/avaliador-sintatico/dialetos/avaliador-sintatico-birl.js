"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoBirl = void 0;
const construtos_1 = require("../../construtos");
const declaracoes_1 = require("../../declaracoes");
const avaliador_sintatico_base_1 = require("../avaliador-sintatico-base");
const birl_1 = __importDefault(require("../../tipos-de-simbolos/birl"));
/**
 * Avaliador Sintático de BIRL
 */
class AvaliadorSintaticoBirl extends avaliador_sintatico_base_1.AvaliadorSintaticoBase {
    validarEscopoPrograma() {
        let declaracoes = [];
        this.validarSegmentoHoraDoShow();
        while (!this.estaNoFinal()) {
            const declaracaoVetor = this.resolverDeclaracaoForaDeBloco();
            if (Array.isArray(declaracaoVetor)) {
                declaracoes = declaracoes.concat(declaracaoVetor);
            }
            else {
                declaracoes.push(declaracaoVetor);
            }
        }
        this.validarSegmentoBirlFinal();
        return declaracoes;
    }
    tratarSimbolos(simbolos) {
        let identificador = 0, adicao = 0, subtracao = 0;
        for (const simbolo of simbolos) {
            if (simbolo.tipo === birl_1.default.IDENTIFICADOR) {
                identificador++;
            }
            else if (simbolo.tipo === birl_1.default.ADICAO) {
                adicao++;
            }
            else if (simbolo.tipo === birl_1.default.SUBTRACAO) {
                subtracao++;
            }
        }
        if (identificador !== 1 || (adicao > 0 && subtracao > 0)) {
            this.erros.push({
                message: 'Erro: Combinação desconhecida de símbolos.',
                name: 'ErroSintatico',
                simbolo: simbolos[0],
            });
            return;
        }
        if (adicao === 2) {
            return 'ADICAO';
        }
        else if (subtracao === 2) {
            return 'SUBTRACAO';
        }
        this.erros.push({
            message: 'Erro: Combinação desconhecida de símbolos.',
            name: 'ErroSintatico',
            simbolo: simbolos[0],
        });
        return;
    }
    validarSegmentoHoraDoShow() {
        this.consumir(birl_1.default.HORA, 'Esperado expressão `HORA DO SHOW` para iniciar o programa');
        this.consumir(birl_1.default.DO, 'Esperado expressão `HORA DO SHOW` para iniciar o programa');
        this.consumir(birl_1.default.SHOW, 'Esperado expressão `HORA DO SHOW` para iniciar o programa');
        this.blocos += 1;
    }
    validarSegmentoBirlFinal() {
        this.regredirEDevolverAtual();
        while (!this.verificarTipoSimboloAtual(birl_1.default.BIRL)) {
            this.consumir(birl_1.default.QUEBRA_LINHA, 'Esperado expressão `QUEBRA_LINHA` após a declaração de variáveis');
            this.regredirEDevolverAtual();
            this.regredirEDevolverAtual();
        }
        this.consumir(birl_1.default.BIRL, 'Esperado expressão `BIRL` para fechamento do programa');
        this.blocos -= 1;
    }
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        if (this.verificarSeSimboloAtualEIgualA(birl_1.default.SUBTRACAO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), false);
        if (this.verificarSeSimboloAtualEIgualA(birl_1.default.ADICAO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), true);
        // Simplesmente avança o símbolo por enquanto.
        // O `if` de baixo irá tratar a referência.
        this.verificarSeSimboloAtualEIgualA(birl_1.default.PONTEIRO);
        if (this.verificarSeSimboloAtualEIgualA(birl_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        }
        if (this.verificarSeSimboloAtualEIgualA(birl_1.default.NUMERO, birl_1.default.FRANGAO, birl_1.default.FRANGÃO, birl_1.default.FRANGO, birl_1.default.TEXTO)) {
            const simboloAnterior = this.simbolos[this.atual - 1];
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(birl_1.default.PARENTESE_ESQUERDO)) {
            const expressao = this.expressao();
            this.consumir(birl_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
        }
        throw this.erro(this.simbolos[this.atual], 'Esperado expressão.');
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(birl_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else {
                break;
            }
        }
        return expressao;
    }
    atribuir() {
        const expressao = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(birl_1.default.IGUAL)) {
            const igual = this.simboloAnterior();
            const valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                const simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(this.hashArquivo, simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoMetodo) {
                const get = expressao;
                return new construtos_1.DefinirValor(this.hashArquivo, 0, get.objeto, get.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoPorIndice(this.hashArquivo, 0, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    }
    blocoEscopo() {
        throw new Error('Método não implementado.');
    }
    declaracaoEnquanto() {
        this.consumir(birl_1.default.NEGATIVA, 'Esperado expressão `NEGATIVA` para iniciar o bloco `ENQUANTO`.');
        this.consumir(birl_1.default.BAMBAM, 'Esperado expressão `BAMBAM` após `NEGATIVA` para iniciar o bloco `ENQUANTO`.');
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado expressão `(` após `BAMBAM` para iniciar o bloco `ENQUANTO`.');
        const codicao = this.expressao();
        this.consumir(birl_1.default.PARENTESE_DIREITO, 'Esperado expressão `)` após a condição para iniciar o bloco `ENQUANTO`.');
        const declaracoes = [];
        while (!this.verificarSeSimboloAtualEIgualA(birl_1.default.BIRL)) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        this.consumir(birl_1.default.BIRL, 'Esperado expressão `BIRL` para fechar o bloco `ENQUANTO`.');
        return new declaracoes_1.Enquanto(codicao, declaracoes);
    }
    declaracaoExpressao() {
        const expressao = this.expressao();
        this.consumir(birl_1.default.PONTO_E_VIRGULA, "Esperado ';' após expressão.");
        return new declaracoes_1.Expressao(expressao);
    }
    declaracaoPara() {
        const primeiroSimbolo = this.consumir(birl_1.default.MAIS, 'Esperado expressão `MAIS` para iniciar o bloco `PARA`.');
        this.consumir(birl_1.default.QUERO, 'Esperado expressão `QUERO` após `MAIS` para iniciar o bloco `PARA`.');
        this.consumir(birl_1.default.MAIS, 'Esperado expressão `MAIS` após `QUERO` para iniciar o bloco `PARA`.');
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado expressão `(` após `MAIS` para iniciar o bloco `PARA`.');
        let declaracaoInicial = null;
        if (this.simbolos[this.atual].tipo === birl_1.default.IDENTIFICADOR) {
            const variavelLoop = this.consumir(birl_1.default.IDENTIFICADOR, 'Esperado expressão `IDENTIFICADOR` após `(` para iniciar o bloco `PARA`.');
            this.consumir(birl_1.default.IGUAL, 'Esperado expressão `=` após `IDENTIFICADOR` para iniciar o bloco `PARA`.');
            const valor = this.consumir(birl_1.default.NUMERO, 'Esperado expressão `NUMERO` após `=` para iniciar o bloco `PARA`.');
            declaracaoInicial = [
                new construtos_1.Variavel(this.hashArquivo, variavelLoop),
                new construtos_1.Literal(this.hashArquivo, Number(valor.linha), Number(valor.literal)),
            ];
        }
        else {
            const declaracaoVetor = this.resolverDeclaracaoForaDeBloco(); // inicialização da variável de controle
            if (Array.isArray(declaracaoVetor)) {
                declaracaoInicial = declaracaoVetor[0];
            }
            else {
                declaracaoInicial = declaracaoVetor;
            }
        }
        this.consumir(birl_1.default.PONTO_E_VIRGULA, 'Esperado expressão `;` após a inicialização do `PARA`.');
        const condicao = this.resolverDeclaracaoForaDeBloco(); // condição de parada
        this.consumir(birl_1.default.PONTO_E_VIRGULA, 'Esperado expressão `;` após a condição do `PARA`.');
        const incremento = this.resolverDeclaracaoForaDeBloco();
        this.consumir(birl_1.default.PARENTESE_DIREITO, 'Esperado expressão `)` após a condição do `PARA`.');
        this.consumir(birl_1.default.QUEBRA_LINHA, 'Esperado expressão `QUEBRA_LINHA` após a condição do `PARA`.');
        const declaracoes = [];
        while (!this.verificarSeSimboloAtualEIgualA(birl_1.default.BIRL)) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        const corpo = new declaracoes_1.Bloco(this.hashArquivo, Number(this.simbolos[this.atual].linha) + 1, declaracoes.filter((d) => d));
        return new declaracoes_1.Para(this.hashArquivo, Number(this.simbolos[this.atual].linha), declaracaoInicial, condicao, incremento, corpo);
    }
    declaracaoEscolha() {
        throw new Error('Método não implementado.');
    }
    declaracaoEscreva() {
        const primeiroSimbolo = this.consumir(birl_1.default.CE, 'Esperado expressão `CE` para escrever mensagem.');
        this.consumir(birl_1.default.QUER, 'Esperado expressão `QUER` após `CE` para escrever mensagem.');
        this.consumir(birl_1.default.VER, 'Esperado expressão `VER` após `QUER` para escrever mensagem.');
        this.consumir(birl_1.default.ESSA, 'Esperado expressão `ESSA` após `VER` para escrever mensagem.');
        this.consumir(birl_1.default.PORRA, 'Esperado expressão `PORRA` após `ESSA` para escrever mensagem.');
        this.consumir(birl_1.default.INTERROGACAO, 'Esperado interrogação após `PORRA` para escrever mensagem.');
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado parêntese esquerdo após interrogação para escrever mensagem.');
        const argumentos = [];
        argumentos.push(this.resolverDeclaracaoForaDeBloco());
        while (this.verificarTipoSimboloAtual(birl_1.default.VIRGULA)) {
            this.avancarEDevolverAnterior(); // Vírgula
            const variavelParaEscrita = this.resolverDeclaracaoForaDeBloco();
            argumentos.push(variavelParaEscrita);
        }
        this.consumir(birl_1.default.PARENTESE_DIREITO, 'Esperado parêntese direito após argumento para escrever mensagem.');
        return new declaracoes_1.Escreva(Number(primeiroSimbolo.linha), this.hashArquivo, argumentos);
    }
    declaracaoFazer() {
        throw new Error('Método não implementado.');
    }
    declaracaoCaracteres() {
        if (this.verificarTipoSimboloAtual(birl_1.default.BICEPS)) {
            this.consumir(birl_1.default.BICEPS, '');
        }
        const simboloCaractere = this.consumir(birl_1.default.FRANGO, '');
        const inicializacoes = [];
        let eLiteral = true;
        do {
            const identificador = this.consumir(birl_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'FRANGO'.");
            let valorInicializacao;
            if (this.verificarSeSimboloAtualEIgualA(birl_1.default.IGUAL)) {
                if (this.verificarTipoSimboloAtual(birl_1.default.AJUDA)) {
                    eLiteral = false;
                    valorInicializacao = this.resolverDeclaracaoForaDeBloco();
                }
                else if (this.verificarTipoSimboloAtual(birl_1.default.IDENTIFICADOR)) {
                    eLiteral = false;
                    valorInicializacao = this.resolverDeclaracaoForaDeBloco();
                }
                else if (this.verificarTipoSimboloAtual(birl_1.default.TEXTO)) {
                    const literalInicializacao = this.consumir(birl_1.default.TEXTO, "Esperado ' para começar o texto.");
                    valorInicializacao = String(literalInicializacao.literal);
                }
                else {
                    throw new Error('Erro ao declarar variável do tipo texto. Verifique se esta atribuindo um valor do tipo texto.');
                }
                inicializacoes.push(new declaracoes_1.Var(identificador, eLiteral
                    ? new construtos_1.Literal(this.hashArquivo, Number(simboloCaractere.linha), valorInicializacao)
                    : valorInicializacao, 'texto'));
            }
            else {
                inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(simboloCaractere.hashArquivo), ''), 'texto'));
            }
        } while (this.verificarSeSimboloAtualEIgualA(birl_1.default.VIRGULA));
        return inicializacoes;
    }
    validarTipoDeclaracaoInteiro() {
        if (this.verificarTipoSimboloAtual(birl_1.default.MONSTRO)) {
            return this.consumir(birl_1.default.MONSTRO, '');
        }
        else if (this.verificarTipoSimboloAtual(birl_1.default.MONSTRINHO)) {
            return this.consumir(birl_1.default.MONSTRINHO, '');
        }
        else if (this.verificarTipoSimboloAtual(birl_1.default.MONSTRAO)) {
            return this.consumir(birl_1.default.MONSTRAO, '');
        }
        else {
            throw new Error('Simbolo referente a inteiro não especificado.');
        }
    }
    declaracaoInteiros() {
        let simboloInteiro = this.validarTipoDeclaracaoInteiro();
        let eLiteral = true;
        const inicializacoes = [];
        do {
            const identificador = this.consumir(birl_1.default.IDENTIFICADOR, `Esperado identificador após palavra reservada '${simboloInteiro.lexema}'.`);
            let valorInicializacao = 0x00;
            if (this.verificarSeSimboloAtualEIgualA(birl_1.default.IGUAL)) {
                if (this.verificarTipoSimboloAtual(birl_1.default.AJUDA)) {
                    eLiteral = false;
                    valorInicializacao = this.resolverDeclaracaoForaDeBloco();
                }
                else if (this.verificarTipoSimboloAtual(birl_1.default.IDENTIFICADOR)) {
                    eLiteral = false;
                    valorInicializacao = this.resolverDeclaracaoForaDeBloco();
                }
                else if (this.verificarTipoSimboloAtual(birl_1.default.NUMERO)) {
                    const literalInicializacao = this.consumir(birl_1.default.NUMERO, `Esperado literal de ${simboloInteiro.lexema} após símbolo de igual em declaração de variável.`);
                    valorInicializacao = Number(literalInicializacao.literal);
                }
                else {
                    throw new Error(`Simbolo passado para inicialização de variável do tipo ${simboloInteiro.lexema} não é válido.`);
                }
                inicializacoes.push(new declaracoes_1.Var(identificador, eLiteral
                    ? new construtos_1.Literal(this.hashArquivo, Number(simboloInteiro.linha), valorInicializacao)
                    : valorInicializacao, 'numero'));
            }
            else {
                inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(simboloInteiro.linha), 0), 'numero'));
            }
        } while (this.verificarSeSimboloAtualEIgualA(birl_1.default.VIRGULA));
        return inicializacoes;
    }
    declaracaoPontoFlutuante() {
        const simboloFloat = this.consumir(birl_1.default.TRAPEZIO, '');
        if (this.verificarTipoSimboloAtual(birl_1.default.DESCENDENTE)) {
            this.consumir(birl_1.default.DESCENDENTE, '');
        }
        let eLiteral = true;
        const inicializacoes = [];
        do {
            const identificador = this.consumir(birl_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'TRAPEZIO'.");
            let valorInicializacao = 0x00;
            if (this.verificarSeSimboloAtualEIgualA(birl_1.default.IGUAL)) {
                if (this.verificarTipoSimboloAtual(birl_1.default.AJUDA)) {
                    eLiteral = false;
                    valorInicializacao = this.resolverDeclaracaoForaDeBloco();
                }
                else if (this.verificarTipoSimboloAtual(birl_1.default.IDENTIFICADOR)) {
                    eLiteral = false;
                    valorInicializacao = this.resolverDeclaracaoForaDeBloco();
                }
                else if (this.verificarTipoSimboloAtual(birl_1.default.NUMERO)) {
                    const literalInicializacao = this.consumir(birl_1.default.NUMERO, "Esperado literal de 'TRAPEZIO' após símbolo de igual em declaração de variável.");
                    valorInicializacao = parseFloat(literalInicializacao.literal);
                }
                else {
                    throw new Error(`Simbolo passado para inicialização de variável do tipo 'TRAPEZIO' não é válido.`);
                }
                inicializacoes.push(new declaracoes_1.Var(identificador, eLiteral
                    ? new construtos_1.Literal(this.hashArquivo, Number(simboloFloat.linha), valorInicializacao)
                    : valorInicializacao, 'numero'));
            }
            else {
                inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(simboloFloat.linha), 0), 'numero'));
            }
        } while (this.verificarSeSimboloAtualEIgualA(birl_1.default.VIRGULA));
        return inicializacoes;
    }
    declaracaoRetorna() {
        const primeiroSimbolo = this.consumir(birl_1.default.BORA, 'Esperado expressão `BORA` para retornar valor.');
        this.consumir(birl_1.default.CUMPADE, 'Esperado expressão `CUMPADE` após `BORA` para retornar valor.');
        if (this.verificarTipoSimboloAtual(birl_1.default.INTERROGACAO)) {
            this.consumir(birl_1.default.INTERROGACAO, 'Esperado interrogação após `CUMPADE` para retornar valor.');
        }
        const valor = this.resolverDeclaracaoForaDeBloco();
        return new declaracoes_1.Retorna(primeiroSimbolo, valor);
    }
    validaTipoDeclaracaoLeia(caracteres) {
        const tipoCaractere = caracteres.charAt(1);
        const tipos = {
            d: 'número',
            i: 'número',
            u: 'número',
            f: 'número',
            F: 'número',
            e: 'número',
            E: 'número',
            g: 'número',
            G: 'número',
            x: 'número',
            X: 'número',
            o: 'número',
            c: 'texto',
            s: 'texto',
            p: 'texto',
        };
        return tipos[tipoCaractere] || 'desconhecido';
    }
    declaracaoLeia() {
        const primeiroSimbolo = this.consumir(birl_1.default.QUE, 'Esperado expressão `QUE` para ler valor.');
        this.consumir(birl_1.default.QUE, 'Esperado expressão `QUE` após `QUE` para ler valor.');
        this.consumir(birl_1.default.CE, 'Esperado expressão `CE` após `QUE` para ler valor.');
        this.consumir(birl_1.default.QUER, 'Esperado expressão `QUER` após `CE` para ler valor.');
        this.consumir(birl_1.default.MONSTRAO, 'Esperado expressão `MONSTRAO` após `QUER` para ler valor.');
        this.consumir(birl_1.default.INTERROGACAO, 'Esperado interrogação após `MONSTRAO` para ler valor.');
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado parêntese esquerdo após interrogação para ler valor.');
        const textoOuSimbolo = this.consumir(birl_1.default.TEXTO, 'Esperado texto após parêntese esquerdo para ler valor.');
        this.consumir(birl_1.default.VIRGULA, 'Esperado vírgula após texto para ler valor.');
        this.consumir(birl_1.default.PONTEIRO, 'Esperado expressão `&` após texto para ler valor.');
        const variavel = this.consumir(birl_1.default.IDENTIFICADOR, 'Esperado identificador após `&` para ler valor.');
        const tipo = this.validaTipoDeclaracaoLeia(textoOuSimbolo.literal);
        this.consumir(birl_1.default.PARENTESE_DIREITO, 'Esperado parêntese direito após identificador para ler valor.');
        return new declaracoes_1.Leia(primeiroSimbolo, [
            new construtos_1.Variavel(this.hashArquivo, variavel),
            new construtos_1.Literal(this.hashArquivo, Number(textoOuSimbolo.linha), tipo),
        ]);
    }
    consomeSeSenao() {
        this.consumir(birl_1.default.QUE, 'Esperado expressão `QUE` após `SE`.');
        this.consumir(birl_1.default.NAO, 'Esperado expressão `NAO` após `QUE`.');
        this.consumir(birl_1.default.VAI, 'Esperado expressão `VAI` após `NAO`.');
        this.consumir(birl_1.default.DAR, 'Esperado expressão `DAR` após `VAI`.');
        this.consumir(birl_1.default.O, 'Esperado expressão `O` após `DAR`.');
        this.consumir(birl_1.default.QUE, 'Esperado expressão `QUE` após `O`.');
        this.consumir(birl_1.default.INTERROGACAO, 'Esperado expressão `?` após `QUE`.');
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado parêntese esquerdo após `?`.');
        const condicaoSeSenao = this.resolverDeclaracaoForaDeBloco();
        this.consumir(birl_1.default.PARENTESE_DIREITO, 'Esperado parêntese direito após expressão de condição.');
        return {
            condicaoSeSenao,
        };
    }
    consomeSe() {
        const simboloSe = this.consumir(birl_1.default.ELE, 'Esperado expressão `ELE`.');
        this.consumir(birl_1.default.QUE, 'Esperado expressão `QUE` após `ELE`.');
        this.consumir(birl_1.default.A, 'Esperado expressão `A` após `QUE`.');
        this.consumir(birl_1.default.GENTE, 'Esperado expressão `GENTE` após `A`.');
        this.consumir(birl_1.default.QUER, 'Esperado expressão `QUER` após `GENTE`.');
        this.consumir(birl_1.default.INTERROGACAO, 'Esperado expressão `?` após `QUER`.');
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado parêntese esquerdo após `?`.');
        const condicaoSe = this.resolverDeclaracaoForaDeBloco();
        // @TODO: Verificar se é possível consumir os dois símbolos juntos.
        // Consumindo n == 1 || n == 2 separado.
        this.consumir(birl_1.default.PARENTESE_DIREITO, 'Esperado parêntese direito após expressão de condição.');
        return {
            simboloSe,
            condicaoSe,
        };
    }
    consumeSenao() {
        this.consumir(birl_1.default.NAO, 'Esperado expressão `NAO` após `SE`.');
        this.consumir(birl_1.default.VAI, 'Esperado expressão `VAI` após `NAO`.');
        this.consumir(birl_1.default.DAR, 'Esperado expressão `DAR` após `VAI`.');
        this.consumir(birl_1.default.NAO, 'Esperado expressão `NAO` após `DAR`.');
    }
    resolveCaminhoSe() {
        let controle = true;
        const declaracoesEntao = [];
        while (controle) {
            switch (this.simbolos[this.atual].tipo) {
                case birl_1.default.BIRL:
                case birl_1.default.NAO:
                    controle = false;
                    break;
                case birl_1.default.QUE:
                    if (this.verificarTipoProximoSimbolo(birl_1.default.NAO)) {
                        controle = false;
                        break;
                    }
                default:
                    declaracoesEntao.push(this.resolverDeclaracaoForaDeBloco());
            }
        }
        return new declaracoes_1.Bloco(this.hashArquivo, Number(this.simbolos[this.atual].linha), declaracoesEntao.filter((d) => d));
    }
    declaracaoSe() {
        const { condicaoSe, simboloSe } = this.consomeSe();
        const caminhoEntão = this.resolveCaminhoSe();
        const caminhoSeSenao = [];
        while (!this.verificarTipoSimboloAtual(birl_1.default.BIRL) &&
            !this.verificarTipoSimboloAtual(birl_1.default.NAO)) {
            const { condicaoSeSenao } = this.consomeSeSenao();
            const caminho = this.resolveCaminhoSe();
            caminhoSeSenao.push({
                condicao: condicaoSeSenao,
                caminho: caminho,
            });
        }
        let caminhoSenao = null;
        if (this.verificarTipoSimboloAtual(birl_1.default.NAO)) {
            this.consumeSenao();
            const declaraçõesSenao = [];
            while (!this.verificarTipoSimboloAtual(birl_1.default.BIRL)) {
                declaraçõesSenao.push(this.resolverDeclaracaoForaDeBloco());
            }
            caminhoSenao = new declaracoes_1.Bloco(this.hashArquivo, Number(this.simbolos[this.atual].linha), declaraçõesSenao.filter((d) => d));
        }
        if (this.verificarTipoSimboloAtual(birl_1.default.BIRL)) {
            this.consumir(birl_1.default.BIRL, 'Esperado expressão `BIRL` após `SE`.');
        }
        return new declaracoes_1.Se(condicaoSe, caminhoEntão, caminhoSeSenao, caminhoSenao);
    }
    resolveSimboloInterfaceParaTiposDadosInterface(simbolo) {
        switch (simbolo.tipo) {
            case birl_1.default.TRAPEZIO:
                this.verificarSeSimboloAtualEIgualA(birl_1.default.DESCENDENTE);
            case birl_1.default.MONSTRO:
            case birl_1.default.MONSTRINHO:
            case birl_1.default.MONSTRAO:
                return 'numero';
            case birl_1.default.FRANGO:
                return 'texto';
            default:
                throw new Error('Tipo desconhecido');
        }
    }
    logicaComumParamentros() {
        const parametros = [];
        do {
            if (parametros.length >= 255) {
                this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 parâmetros');
            }
            const parametro = {
                abrangencia: 'padrao',
            };
            const tipo = this.resolveTipo(this.simbolos[this.atual].tipo);
            const resolucaoTipo = this.resolveSimboloInterfaceParaTiposDadosInterface(tipo);
            parametro.tipoDado = {
                nome: this.simbolos[this.atual].lexema,
                tipo: resolucaoTipo
            };
            this.avancarEDevolverAnterior();
            parametro.nome = this.simbolos[this.atual];
            parametros.push(parametro);
            this.avancarEDevolverAnterior();
            if (this.simbolos[this.atual].tipo === birl_1.default.VIRGULA) {
                this.avancarEDevolverAnterior();
            }
        } while (![birl_1.default.PARENTESE_DIREITO].includes(this.simbolos[this.atual].tipo));
        return parametros;
    }
    corpoDaFuncao(tipo) {
        const parenteseEsquerdo = this.consumir(birl_1.default.PARENTESE_ESQUERDO, `Esperado '(' após o nome ${tipo}`);
        let paramentros = [];
        if (!this.verificarTipoSimboloAtual(birl_1.default.PARENTESE_DIREITO)) {
            paramentros = this.logicaComumParamentros();
        }
        this.consumir(birl_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(birl_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        let corpo = [];
        do {
            const declaracaoVetor = this.resolverDeclaracaoForaDeBloco();
            if (Array.isArray(declaracaoVetor)) {
                corpo = corpo.concat(declaracaoVetor);
            }
            else {
                corpo.push(declaracaoVetor);
            }
        } while (![birl_1.default.BIRL].includes(this.simbolos[this.atual].tipo));
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(parenteseEsquerdo.linha), paramentros, corpo.filter((c) => c));
    }
    declacacaoEnquanto() {
        const simboloEnquanto = this.consumir(birl_1.default.NEGATIVA, 'Esperado expressão `NEGATIVA`.');
        this.consumir(birl_1.default.BAMBAM, 'Esperado expressão `BAMBAM` após `NEGATIVA`.');
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado parêntese esquerdo após `BAMBAM`.');
        const condicao = this.resolverDeclaracaoForaDeBloco(); // E para ser um binario.
        this.consumir(birl_1.default.PARENTESE_DIREITO, 'Esperado parêntese direito após expressão de condição.');
        const declaracoes = [];
        while (!this.verificarSeSimboloAtualEIgualA(birl_1.default.BIRL)) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        return new declaracoes_1.Enquanto(condicao, new declaracoes_1.Bloco(simboloEnquanto.hashArquivo, Number(simboloEnquanto.linha), declaracoes.filter((d) => d)));
    }
    declaracaoSustar() {
        this.consumir(birl_1.default.SAI, 'Esperado expressão `SAI`.');
        this.consumir(birl_1.default.FILHO, 'Esperado expressão `FILHO` após `SAI`.');
        this.consumir(birl_1.default.DA, 'Esperado expressão `DA` após `FILHO`.');
        this.consumir(birl_1.default.PUTA, 'Esperado expressão `PUTA` após `DA`.');
        this.consumir(birl_1.default.PONTO_E_VIRGULA, 'Esperado expressão `PONTO_E_VIRGULA` após `PUTA`.');
        return new declaracoes_1.Sustar(this.simbolos[this.atual - 1]);
    }
    declaracaoContinua() {
        this.consumir(birl_1.default.VAMO, 'Esperado expressão `VAMO`.');
        this.consumir(birl_1.default.MONSTRO, 'Esperado expressão `MONSTRO` após `VAMO`.');
        this.consumir(birl_1.default.PONTO_E_VIRGULA, 'Esperado expressão `PONTO_E_VIRGULA` após `MONSTRO`.');
        return new declaracoes_1.Continua(this.simbolos[this.atual - 1]);
    }
    resolveTipo(tipo) {
        switch (tipo) {
            case birl_1.default.TRAPEZIO:
                this.verificarSeSimboloAtualEIgualA(birl_1.default.DESCENDENTE);
            case birl_1.default.MONSTRAO:
            case birl_1.default.MONSTRINHO:
            case birl_1.default.MONSTRO:
            case birl_1.default.FRANGO:
            case birl_1.default.BICEPS:
                return this.simbolos[this.atual];
            default:
                throw new Error('Esperado tipo da função');
        }
    }
    funcao(tipo) {
        this.consumir(birl_1.default.OH, 'Esperado expressão `OH`.');
        this.consumir(birl_1.default.O, 'Esperado expressão `O` após `OH`.');
        this.consumir(birl_1.default.HOME, 'Esperado expressão `HOME` após `O`.');
        this.consumir(birl_1.default.AI, 'Esperado expressão `AI` após `HOME`.');
        this.consumir(birl_1.default.PO, 'Esperado expressão `PO` após `AI`.');
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado parêntese esquerdo após `PO`.');
        let tipoRetorno = this.resolveTipo(this.simbolos[this.atual].tipo);
        this.avancarEDevolverAnterior();
        const nomeFuncao = this.consumir(birl_1.default.IDENTIFICADOR, 'Esperado nome da função apos a declaração do tipo.');
        return new declaracoes_1.FuncaoDeclaracao(nomeFuncao, this.corpoDaFuncao(tipo), tipoRetorno);
    }
    declaracaoChamaFuncao() {
        const declaracaoInicio = this.consumir(birl_1.default.AJUDA, 'Esperado expressão `AJUDA`.');
        this.consumir(birl_1.default.O, 'Esperado expressão `O` após `AJUDA`.');
        this.consumir(birl_1.default.MALUCO, 'Esperado expressão `MALUCO` após `O`.');
        this.consumir(birl_1.default.TA, 'Esperado expressão `TA` após `MALUCO`.');
        this.consumir(birl_1.default.DOENTE, 'Esperado expressão `DOENTE` após `TA`.');
        let expressao = this.primario();
        this.consumir(birl_1.default.PARENTESE_ESQUERDO, 'Esperado parêntese esquerdo após `DOENTE`.');
        const paramentros = [];
        while (!this.verificarTipoSimboloAtual(birl_1.default.PARENTESE_DIREITO)) {
            paramentros.push(this.resolverDeclaracaoForaDeBloco());
            if (this.verificarTipoSimboloAtual(birl_1.default.VIRGULA)) {
                this.avancarEDevolverAnterior();
            }
        }
        this.consumir(birl_1.default.PARENTESE_DIREITO, 'Esperado parêntese direito após lista de parâmetros.');
        this.consumir(birl_1.default.PONTO_E_VIRGULA, 'Esperado ponto e vírgula após a chamada de função.');
        return new construtos_1.Chamada(declaracaoInicio.hashArquivo, expressao, null, paramentros);
    }
    resolverDeclaracaoForaDeBloco() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case birl_1.default.INCREMENTAR:
            case birl_1.default.DECREMENTAR:
                let adicionaOuSubtrai;
                if ([birl_1.default.INCREMENTAR, birl_1.default.DECREMENTAR].includes(simboloAtual.tipo)) {
                    adicionaOuSubtrai = this.consumir(birl_1.default[simboloAtual.tipo], 'Esperado expressão `INCREMENTAR` ou `DECREMENTAR`.');
                }
                if (this.verificarTipoSimboloAtual(birl_1.default.IDENTIFICADOR)) {
                    const identificador = this.consumir(birl_1.default.IDENTIFICADOR, 'Esperado expressão `IDENTIFICADOR`.');
                    return new construtos_1.Unario(this.hashArquivo, adicionaOuSubtrai, new construtos_1.Variavel(this.hashArquivo, identificador), 'ANTES');
                }
                return;
            case birl_1.default.BORA:
                return this.declaracaoRetorna();
            case birl_1.default.SAI:
                return this.declaracaoSustar();
            case birl_1.default.VAMO:
                return this.declaracaoContinua();
            case birl_1.default.QUE:
                return this.declaracaoLeia();
            case birl_1.default.ELE:
                return this.declaracaoSe();
            case birl_1.default.NEGATIVA:
                return this.declacacaoEnquanto();
            case birl_1.default.MAIS:
                return this.declaracaoPara();
            case birl_1.default.MONSTRO:
            case birl_1.default.MONSTRINHO:
            case birl_1.default.MONSTRAO:
                return this.declaracaoInteiros();
            case birl_1.default.BICEPS:
            case birl_1.default.FRANGO:
                return this.declaracaoCaracteres();
            case birl_1.default.TRAPEZIO:
                return this.declaracaoPontoFlutuante();
            case birl_1.default.OH:
                return this.funcao('funcao');
            case birl_1.default.AJUDA:
                return this.declaracaoChamaFuncao();
            case birl_1.default.CE:
                return this.declaracaoEscreva();
            case birl_1.default.PONTO_E_VIRGULA:
            case birl_1.default.QUEBRA_LINHA:
            case birl_1.default.BIRL:
                this.avancarEDevolverAnterior();
                return null;
            case birl_1.default.IDENTIFICADOR:
                const simboloIdentificador = this.simbolos[this.atual];
                if (this.simbolos[this.atual + 1] &&
                    [birl_1.default.DECREMENTAR, birl_1.default.INCREMENTAR].includes(this.simbolos[this.atual + 1].tipo)) {
                    this.avancarEDevolverAnterior();
                    const simboloIncrementoDecremento = this.avancarEDevolverAnterior();
                    return new construtos_1.Unario(this.hashArquivo, simboloIncrementoDecremento, new construtos_1.Variavel(this.hashArquivo, simboloIdentificador), 'DEPOIS');
                }
                return this.expressao();
            default:
                return this.expressao();
        }
    }
    analisar(retornoLexador, hashArquivo) {
        this.erros = [];
        this.blocos = 0;
        this.atual = 0;
        this.simbolos = retornoLexador.simbolos;
        const declaracoes = this.validarEscopoPrograma();
        return {
            declaracoes: declaracoes.filter((d) => d),
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoBirl = AvaliadorSintaticoBirl;
//# sourceMappingURL=avaliador-sintatico-birl.js.map