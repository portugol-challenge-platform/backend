"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpretar = exports.visitarDeclaracaoPara = exports.visitarExpressaoLiteral = exports.visitarExpressaoLeia = exports.substituirValor = exports.verificaTipoDaInterpolação = exports.resolveQuantidadeDeInterpolacoes = exports.avaliarArgumentosEscreva = exports.atribuirVariavel = void 0;
const construtos_1 = require("../../../construtos");
const espaco_variaveis_1 = require("../../../espaco-variaveis");
const excecoes_1 = require("../../../excecoes");
const quebras_1 = require("../../../quebras");
function converteTipoOuEstouraError(valor, tipo) {
    try {
        switch (tipo) {
            case 'texto':
                return String(valor);
            case 'número':
                if (valor.includes('.')) {
                    return parseFloat(valor);
                }
                var numero = Number(valor);
                if (isNaN(numero)) {
                    throw new Error(`Não foi possível converter o valor "${valor}" para o tipo ${tipo}.`);
                }
                return numero;
            default:
                return valor;
        }
    }
    catch (err) {
        throw new Error(`Não foi possível converter o valor "${valor}" para o tipo ${tipo}.`);
    }
}
async function atribuirVariavel(interpretador, expressao, valor, tipo) {
    valor = converteTipoOuEstouraError(valor, tipo);
    if (expressao instanceof construtos_1.Variavel) {
        interpretador.pilhaEscoposExecucao.atribuirVariavel(expressao.simbolo, valor);
        return;
    }
    if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
        const promises = await Promise.all([
            interpretador.avaliar(expressao.entidadeChamada),
            interpretador.avaliar(expressao.indice),
        ]);
        let alvo = promises[0];
        let indice = promises[1];
        const subtipo = alvo.hasOwnProperty('subtipo') ? alvo.subtipo : undefined;
        if (alvo.hasOwnProperty('valor')) {
            alvo = alvo.valor;
        }
        if (indice.hasOwnProperty('valor')) {
            indice = indice.valor;
        }
        let valorResolvido;
        switch (subtipo) {
            case 'texto':
                valorResolvido = String(valor);
                break;
            case 'número':
                valorResolvido = Number(valor);
                break;
            case 'lógico':
                valorResolvido = Boolean(valor);
                break;
            default:
                valorResolvido = valor;
                break;
        }
        alvo[indice] = valorResolvido;
    }
}
exports.atribuirVariavel = atribuirVariavel;
async function avaliarArgumentosEscreva(interpretador, argumentos) {
    let formatoTexto = '';
    let quantidadeInterpolacoes;
    if (argumentos.length < 1) {
        throw new Error('Escreva precisa de pelo menos um argumento.');
    }
    if (typeof argumentos[0].valor !== 'string') {
        throw new Error('O primeiro argumento de Escreva precisa ser uma string.');
    }
    quantidadeInterpolacoes = await interpretador.resolveQuantidadeDeInterpolacoes(argumentos[0]);
    const resultadoAvaliacaoLiteral = await interpretador.avaliar(argumentos[0]);
    if (quantidadeInterpolacoes === null) {
        formatoTexto = (resultadoAvaliacaoLiteral === null || resultadoAvaliacaoLiteral === void 0 ? void 0 : resultadoAvaliacaoLiteral.hasOwnProperty('valor'))
            ? resultadoAvaliacaoLiteral.valor
            : resultadoAvaliacaoLiteral;
        return formatoTexto;
    }
    if (!(argumentos.length - 1 === quantidadeInterpolacoes.length)) {
        throw new Error('Quantidade de argumentos não bate com quantidade de interpolacoes.');
    }
    formatoTexto = resultadoAvaliacaoLiteral;
    for (let i = 0; i < quantidadeInterpolacoes.length; i++) {
        const dados = {
            tipo: quantidadeInterpolacoes[i].replace('%', ''),
            valor: await interpretador.avaliar(argumentos[i + 1]),
        };
        if (interpretador.verificaTipoDaInterpolação(dados)) {
            formatoTexto = await interpretador.substituirValor(formatoTexto, dados.valor, dados.tipo);
        }
    }
    return formatoTexto.trimEnd();
}
exports.avaliarArgumentosEscreva = avaliarArgumentosEscreva;
async function resolveQuantidadeDeInterpolacoes(texto) {
    const stringOriginal = texto.valor;
    const regex = /%[a-zA-Z]/g;
    const matches = stringOriginal.match(regex);
    return matches;
}
exports.resolveQuantidadeDeInterpolacoes = resolveQuantidadeDeInterpolacoes;
async function verificaTipoDaInterpolação(dados) {
    switch (dados.tipo) {
        case 'd':
        case 'i':
        case 'u':
            const valor = dados.valor.hasOwnProperty('valor') ? dados.valor.valor : dados.valor;
            if (typeof valor !== 'number') {
                throw new Error('O valor interpolado não é um número.');
            }
            return true;
        case 'c':
        case 's':
            const valorString = dados.valor.hasOwnProperty('valor') ? dados.valor.valor : dados.valor;
            if (typeof valorString !== 'string') {
                throw new Error('O valor interpolado não é um caractere.');
            }
            return true;
        default:
            throw new Error('Tipo de interpolação não suportado.');
    }
}
exports.verificaTipoDaInterpolação = verificaTipoDaInterpolação;
async function substituirValor(stringOriginal, novoValor, simboloTipo) {
    let substituida = false;
    let resultado = '';
    for (let i = 0; i < stringOriginal.length; i++) {
        if (stringOriginal[i] === '%' && stringOriginal[i + 1] === simboloTipo && !substituida) {
            switch (simboloTipo) {
                case 'd':
                case 'i':
                case 'u':
                case 'f':
                case 'F':
                case 'e':
                case 'E':
                case 'g':
                case 'G':
                case 'x':
                case 'X':
                case 'o':
                case 'c':
                case 's':
                case 'p':
                    resultado += novoValor.hasOwnProperty('valor') ? novoValor.valor : novoValor;
                    break;
                default:
                    resultado += stringOriginal[i];
                    break;
            }
            substituida = true;
            i++;
        }
        else {
            resultado += stringOriginal[i];
        }
    }
    return resultado;
}
exports.substituirValor = substituirValor;
async function visitarExpressaoLeia(interpretador, expressao) {
    // const mensagem = expressao.argumentos && expressao.argumentos[0] ? expressao.argumentos[0].valor : '> ';
    /**
     * Em Birl não se usa mensagem junto com o prompt, normalmente se usa um Escreva antes.
     */
    const mensagem = '> ';
    const promessaLeitura = () => new Promise((resolucao) => interpretador.interfaceEntradaSaida.question(mensagem, (resposta) => {
        resolucao(resposta);
    }));
    const valorLido = await promessaLeitura();
    await atribuirVariavel(interpretador, expressao.argumentos[0], valorLido, expressao.argumentos[1].valor);
    return;
}
exports.visitarExpressaoLeia = visitarExpressaoLeia;
async function visitarExpressaoLiteral(expressao) {
    // TODO(Ítalo): Essa lógica não me parece correta.
    // Além disso, o `return` deveria ser com `Promise.resolve`.
    /* if (expressao.valor === tiposDeSimbolos.ADICAO) {
        return 1;
    }

    if (expressao.valor === tiposDeSimbolos.SUBTRACAO) {
        return -1;
    } */
    return Promise.resolve(expressao.valor);
}
exports.visitarExpressaoLiteral = visitarExpressaoLiteral;
async function visitarDeclaracaoPara(interpretador, declaracao) {
    if (declaracao.inicializador !== null) {
        if (declaracao.inicializador instanceof Array) {
            if (declaracao.inicializador[0] instanceof construtos_1.Variavel) {
                const valor = await interpretador.avaliar(declaracao.inicializador[1]);
                interpretador.pilhaEscoposExecucao.atribuirVariavel(declaracao.inicializador[0].simbolo, valor);
            }
        }
        else {
            await interpretador.avaliar(declaracao.inicializador);
        }
    }
    let retornoExecucao;
    while (!(retornoExecucao instanceof quebras_1.Quebra)) {
        if (declaracao.condicao !== null &&
            !interpretador.eVerdadeiro(await interpretador.avaliar(declaracao.condicao))) {
            break;
        }
        try {
            retornoExecucao = await interpretador.executar(declaracao.corpo, false);
            if (retornoExecucao instanceof quebras_1.SustarQuebra) {
                return null;
            }
            if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                retornoExecucao = null;
            }
        }
        catch (erro) {
            interpretador.erros.push({
                erroInterno: erro,
                linha: declaracao.linha,
                hashArquivo: declaracao.hashArquivo,
            });
            return Promise.reject(erro);
        }
        if (declaracao.incrementar !== null) {
            await interpretador.avaliar(declaracao.incrementar);
        }
    }
    return retornoExecucao;
}
exports.visitarDeclaracaoPara = visitarDeclaracaoPara;
async function interpretar(interpretador, declaracoes, manterAmbiente) {
    interpretador.erros = [];
    const escopoExecucao = {
        declaracoes: declaracoes,
        declaracaoAtual: 0,
        ambiente: new espaco_variaveis_1.EspacoVariaveis(),
        finalizado: false,
        tipo: 'outro',
        emLacoRepeticao: false,
    };
    interpretador.pilhaEscoposExecucao.empilhar(escopoExecucao);
    try {
        const retornoOuErro = await interpretador.executarUltimoEscopo(manterAmbiente);
        if (retornoOuErro instanceof excecoes_1.ErroEmTempoDeExecucao) {
            interpretador.erros.push(retornoOuErro);
        }
    }
    catch (erro) {
        interpretador.erros.push({
            erroInterno: erro,
            linha: -1,
            hashArquivo: -1,
        });
    }
    finally {
        const retorno = {
            erros: interpretador.erros,
            resultado: interpretador.resultadoInterpretador,
        };
        interpretador.resultadoInterpretador = [];
        return retorno;
    }
}
exports.interpretar = interpretar;
//# sourceMappingURL=comum.js.map