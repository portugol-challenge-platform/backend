"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorComDepuracao = void 0;
const espaco_variaveis_1 = require("../espaco-variaveis");
const declaracoes_1 = require("../declaracoes");
const quebras_1 = require("../quebras");
const inferenciador_1 = require("./inferenciador");
const interpretador_base_1 = require("./interpretador-base");
/**
 * Implementação do Interpretador com suporte a depuração.
 * Herda o Interpretador padrão de Delégua e implementa métodos a mais, que são
 * usados pelo servidor de depuração.
 * Alguns métodos do Interpretador original, como `executarBloco` e `interpretar`,
 * são reimplementados aqui.
 *
 * A separação entre `Interpretador` e `InterpretadorComDepuracao` se faz
 * necessária por uma série de motivos.
 * O primeiro deles é o desempenho. A depuração torna o desempenho do
 * Interpretador com depuração inferior ao Interpretador original pelas
 * várias verificações de controle que precisam ser feitas para a
 * funcionalidade do suporte a depuração, como verificar pontos de parada,
 * estados da pilha de execução e variáveis.
 * O segundo deles é manter o Interpretador original tão simples quanto possível.
 * Uma implementação mais simples normalmente é mais robusta.
 * O terceiro deles é o uso de memória. O Interpretador original não possui
 * uma série de variáveis implementadas aqui, o que o torna mais econômico em
 * recursos de máquina.
 */
class InterpretadorComDepuracao extends interpretador_base_1.InterpretadorBase {
    constructor(diretorioBase, funcaoDeRetorno, funcaoDeRetornoMesmaLinha) {
        super(diretorioBase, false, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
        this.pontosParada = [];
        this.pontoDeParadaAtivo = false;
        this.avisoPontoParadaAtivado = () => console.log('Aviso: Ponto de parada ativado.');
        this.escopoAtual = 0;
        this.executandoChamada = false;
        this.passos = 0;
    }
    /**
     * Quando um construto ou declaração possui id, significa que o interpretador
     * deve resolver a avaliação e guardar seu valor até o final do escopo.
     * Isso serve para quando a linguagem está em modo de depuração, e o contexto
     * da execução deixa de existir com um ponto de parada, por exemplo.
     * @param expressao A expressão a ser avaliada.
     * @returns O resultado da avaliação.
     */
    async avaliar(expressao) {
        if (expressao.hasOwnProperty('id')) {
            const escopoAtual = this.pilhaEscoposExecucao.topoDaPilha();
            const idChamadaComArgumentos = await this.gerarIdResolucaoChamada(expressao);
            if (escopoAtual.ambiente.resolucoesChamadas.hasOwnProperty(idChamadaComArgumentos)) {
                return escopoAtual.ambiente.resolucoesChamadas[idChamadaComArgumentos];
            }
        }
        return await expressao.aceitar(this);
    }
    /**
     * Resolve problema de literais que tenham vírgulas, e confundem a resolução de chamadas.
     * @param valor O valor do argumento, que pode ser um literal com virgulas.
     * @returns Uma string com vírgulas escapadas.
     */
    escaparVirgulas(valor) {
        return String(valor).replace(/,/i, ',');
    }
    /**
     * Gera um identificador para resolução de chamadas.
     * Usado para não chamar funções repetidamente quando usando instruções
     * de passo, como "próximo" ou "adentrar-escopo".
     * @param expressao A expressão de chamada.
     * @returns Uma `Promise` que resolve como `string`.
     */
    async gerarIdResolucaoChamada(expressao) {
        const argumentosResolvidos = [];
        for (let argumento of expressao.argumentos) {
            if (argumento instanceof declaracoes_1.Leia) {
                argumentosResolvidos.push(`leia_${argumento.id}`);
            }
            else {
                argumentosResolvidos.push(await this.avaliar(argumento));
            }
        }
        return argumentosResolvidos.reduce((acumulador, argumento) => (acumulador += `,${this.escaparVirgulas(argumento.hasOwnProperty('valor') ? argumento.valor : argumento)}`), expressao.id);
    }
    async visitarExpressaoDeChamada(expressao) {
        const _idChamadaComArgumentos = await this.gerarIdResolucaoChamada(expressao);
        // Usado na abertura do bloco de escopo da chamada.
        this.idChamadaAtual = _idChamadaComArgumentos;
        this.executandoChamada = true;
        this.proximoEscopo = 'funcao';
        const retorno = await super.visitarExpressaoDeChamada(expressao);
        this.executandoChamada = false;
        const escopoAtual = this.pilhaEscoposExecucao.topoDaPilha();
        escopoAtual.ambiente.resolucoesChamadas[_idChamadaComArgumentos] = retorno;
        return retorno;
    }
    async visitarDeclaracaoEnquanto(declaracao) {
        const escopoAtual = this.pilhaEscoposExecucao.topoDaPilha();
        switch (this.comando) {
            case 'proximo':
                if (this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
                    escopoAtual.emLacoRepeticao = true;
                    return this.executarBloco(declaracao.corpo.declaracoes);
                }
                escopoAtual.emLacoRepeticao = false;
                return null;
            default:
                let retornoExecucao;
                while (!(retornoExecucao instanceof quebras_1.Quebra) &&
                    !this.pontoDeParadaAtivo &&
                    this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
                    escopoAtual.emLacoRepeticao = true;
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
                        return Promise.reject(erro);
                    }
                }
                escopoAtual.emLacoRepeticao = false;
                return retornoExecucao;
        }
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
     * Se ponto de parada foi ativado durante a avaliação de argumentos, não escreve.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    async visitarDeclaracaoEscreva(declaracao) {
        try {
            const formatoTexto = await this.avaliarArgumentosEscreva(declaracao.argumentos);
            if (this.pontoDeParadaAtivo) {
                return null;
            }
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
    async visitarDeclaracaoPara(declaracao) {
        const corpoExecucao = declaracao.corpo;
        if (declaracao.inicializador !== null && !declaracao.inicializada) {
            await this.avaliar(declaracao.inicializador);
            // O incremento vai ao final do bloco de escopo.
            if (declaracao.incrementar !== null) {
                corpoExecucao.declaracoes.push(declaracao.incrementar);
            }
        }
        declaracao.inicializada = true;
        const escopoAtual = this.pilhaEscoposExecucao.topoDaPilha();
        switch (this.comando) {
            case 'proximo':
                if (declaracao.condicao !== null && this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
                    escopoAtual.emLacoRepeticao = true;
                    const resultadoBloco = this.executarBloco(corpoExecucao.declaracoes);
                    return resultadoBloco;
                }
                escopoAtual.emLacoRepeticao = false;
                return null;
            default:
                let retornoExecucao;
                while (!(retornoExecucao instanceof quebras_1.Quebra) && !this.pontoDeParadaAtivo) {
                    if (declaracao.condicao !== null && !this.eVerdadeiro(await this.avaliar(declaracao.condicao))) {
                        break;
                    }
                    try {
                        retornoExecucao = await this.executar(corpoExecucao);
                        if (retornoExecucao instanceof quebras_1.SustarQuebra) {
                            return null;
                        }
                        if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                            retornoExecucao = null;
                        }
                    }
                    catch (erro) {
                        return Promise.reject(erro);
                    }
                }
                // escopoAtual.emLacoRepeticao = false;
                return retornoExecucao;
        }
    }
    /**
     * Ao executar um retorno, manter o valor retornado no Interpretador para
     * uso por linhas que foram executadas com o comando `próximo` do depurador.
     * @param declaracao Uma declaracao Retorna
     * @returns O resultado da execução da visita.
     */
    async visitarExpressaoRetornar(declaracao) {
        const retorno = await super.visitarExpressaoRetornar(declaracao);
        // O escopo atual é marcado como finalizado, para notificar a
        // instrução de que deve ser descartado.
        const escopoAtual = this.pilhaEscoposExecucao.topoDaPilha();
        escopoAtual.finalizado = true;
        // Acha o primeiro escopo de função.
        const escopoFuncao = this.pilhaEscoposExecucao.obterEscopoPorTipo('funcao');
        if (escopoFuncao === undefined) {
            return Promise.reject('retorna() chamado fora de execução de função.');
        }
        if (escopoFuncao.idChamada !== undefined) {
            escopoAtual.ambiente.resolucoesChamadas[escopoFuncao.idChamada] =
                retorno && retorno.hasOwnProperty('valor') ? retorno.valor : retorno;
        }
        return retorno;
    }
    /**
     * Se bloco de execução já foi instanciado antes (por exemplo, quando há um ponto de parada e a
     * execução do código é retomada pelo depurador), retoma a execução do bloco do ponto em que havia parado.
     * Se bloco de execução ainda não foi instanciado, empilha declarações na pilha de escopos de execução,
     * cria um novo ambiente e executa as declarações empilhadas.
     * Se depurador comandou uma instrução 'adentrar-escopo', execução do bloco não ocorre, mas
     * ponteiros de escopo e execução são atualizados.
     * @param declaracoes Um vetor de declaracoes a ser executado.
     * @param ambiente O ambiente de execução quando houver, como parâmetros, argumentos, etc.
     */
    async executarBloco(declaracoes, ambiente) {
        // Se o escopo atual não é o último.
        if (this.escopoAtual < this.pilhaEscoposExecucao.elementos() - 1) {
            this.escopoAtual++;
            const proximoEscopo = this.pilhaEscoposExecucao.naPosicao(this.escopoAtual);
            let retornoExecucao;
            // Sempre executa a próxima instrução, mesmo que haja ponto de parada.
            retornoExecucao = await this.executar(proximoEscopo.declaracoes[proximoEscopo.declaracaoAtual]);
            proximoEscopo.declaracaoAtual++;
            for (; !(retornoExecucao instanceof quebras_1.Quebra) &&
                proximoEscopo.declaracaoAtual < proximoEscopo.declaracoes.length; proximoEscopo.declaracaoAtual++) {
                this.pontoDeParadaAtivo = this.verificarPontoParada(proximoEscopo.declaracoes[proximoEscopo.declaracaoAtual]);
                if (this.pontoDeParadaAtivo) {
                    this.avisoPontoParadaAtivado();
                    break;
                }
                retornoExecucao = await this.executar(proximoEscopo.declaracoes[proximoEscopo.declaracaoAtual]);
                // Um ponto de parada ativo pode ter vindo de um escopo mais interno.
                // Por isso verificamos outra parada aqui para evitar que
                // `this.declaracaoAtual` seja incrementado.
                if (this.pontoDeParadaAtivo) {
                    this.avisoPontoParadaAtivado();
                    break;
                }
            }
            this.pilhaEscoposExecucao.removerUltimo();
            this.escopoAtual--;
            return retornoExecucao;
        }
        else {
            this.abrirNovoBlocoEscopo(declaracoes, ambiente, this.proximoEscopo || 'outro');
            const ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
            if (this.idChamadaAtual) {
                ultimoEscopo.idChamada = this.idChamadaAtual;
                this.idChamadaAtual = undefined;
            }
            this.proximoEscopo = undefined;
            if (this.comando !== 'adentrarEscopo') {
                return await this.executarUltimoEscopo();
            }
        }
    }
    /**
     * Para fins de depuração, verifica se há ponto de parada no mesmo pragma da declaração.
     * @param declaracao A declaração a ser executada.
     * @returns True quando execução deve parar. False caso contrário.
     */
    verificarPontoParada(declaracao) {
        const buscaPontoParada = this.pontosParada.filter((p) => p.hashArquivo === declaracao.hashArquivo && p.linha === declaracao.linha);
        if (buscaPontoParada.length > 0) {
            console.log(`Ponto de parada encontrado. Linha: ${declaracao.linha}.`);
            return true;
        }
        return false;
    }
    /**
     * No interpretador com depuração, este método é dividido em dois outros métodos privados:
     * - `this.executarUmPassoNoEscopo`, que executa apenas uma instrução e nada mais;
     * - `this.executarUltimoEscopoComandoContinuar`, que é a execução trivial de um escopo inteiro,
     *      ou com todas as instruções, ou até encontrar um ponto de parada.
     * @param manterAmbiente Se verdadeiro, junta elementos do último escopo com o escopo
     *                       imediatamente abaixo.
     * @param naoVerificarPrimeiraExecucao Booleano que pede ao Interpretador para não
     *                                     verificar o ponto de parada na primeira execução.
     *                                     Normalmente usado pelo Servidor de Depuração para continuar uma linha.
     * @returns O retorno da execução.
     */
    async executarUltimoEscopo(manterAmbiente = false, naoVerificarPrimeiraExecucao = false) {
        switch (this.comando) {
            case 'adentrarEscopo':
            case 'proximo':
                if (!this.executandoChamada) {
                    return this.executarUmPassoNoEscopo();
                }
                else {
                    return this.executarUltimoEscopoComandoContinuar(manterAmbiente, naoVerificarPrimeiraExecucao);
                }
            default:
                return this.executarUltimoEscopoComandoContinuar(manterAmbiente, naoVerificarPrimeiraExecucao);
        }
    }
    descartarTodosEscoposFinalizados() {
        let i = this.pilhaEscoposExecucao.pilha.length - 1;
        while (i > 0) {
            let ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
            if (ultimoEscopo.declaracaoAtual >= ultimoEscopo.declaracoes.length || ultimoEscopo.finalizado) {
                this.pilhaEscoposExecucao.removerUltimo();
                const escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
                escopoAnterior.ambiente.resolucoesChamadas = Object.assign(escopoAnterior.ambiente.resolucoesChamadas, ultimoEscopo.ambiente.resolucoesChamadas);
                this.escopoAtual--;
            }
            else {
                break;
            }
            i--;
        }
    }
    descartarEscopoPorRetornoFuncao() {
        let ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
        while (ultimoEscopo.tipo !== 'funcao') {
            this.pilhaEscoposExecucao.removerUltimo();
            const escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
            escopoAnterior.ambiente.resolucoesChamadas = Object.assign(escopoAnterior.ambiente.resolucoesChamadas, ultimoEscopo.ambiente.resolucoesChamadas);
            this.escopoAtual--;
            ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
        }
        this.pilhaEscoposExecucao.removerUltimo();
        const escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
        escopoAnterior.ambiente.resolucoesChamadas = Object.assign(escopoAnterior.ambiente.resolucoesChamadas, ultimoEscopo.ambiente.resolucoesChamadas);
        this.escopoAtual--;
    }
    async executarUmPassoNoEscopo() {
        const ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
        let retornoExecucao;
        if (this.passos > 0) {
            this.passos--;
            retornoExecucao = await this.executar(ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual]);
            if (!this.pontoDeParadaAtivo && !ultimoEscopo.emLacoRepeticao) {
                ultimoEscopo.declaracaoAtual++;
            }
            if (ultimoEscopo.declaracaoAtual >= ultimoEscopo.declaracoes.length || ultimoEscopo.finalizado) {
                if (retornoExecucao instanceof quebras_1.RetornoQuebra) {
                    this.descartarEscopoPorRetornoFuncao();
                }
                else {
                    this.descartarTodosEscoposFinalizados();
                }
            }
            if (this.pilhaEscoposExecucao.elementos() === 1) {
                this.finalizacaoDaExecucao();
            }
        }
        return retornoExecucao;
    }
    /**
     * Continua a interpretação parcial do último ponto em que parou.
     * Pode ser tanto o começo da execução inteira, ou pós comando do depurador
     * quando há um ponto de parada.
     * @param manterAmbiente Se verdadeiro, junta elementos do último escopo com o escopo
     *                       imediatamente abaixo.
     * @param naoVerificarPrimeiraExecucao Booleano que pede ao Interpretador para não
     *                                     verificar o ponto de parada na primeira execução.
     *                                     Normalmente usado pelo Servidor de Depuração para continuar uma linha.
     * @returns Um objeto de retorno, com erros encontrados se houverem.
     */
    async executarUltimoEscopoComandoContinuar(manterAmbiente = false, naoVerificarPrimeiraExecucao = false) {
        const ultimoEscopo = this.pilhaEscoposExecucao.topoDaPilha();
        let retornoExecucao;
        try {
            for (; !(retornoExecucao instanceof quebras_1.Quebra) && ultimoEscopo.declaracaoAtual < ultimoEscopo.declaracoes.length; ultimoEscopo.declaracaoAtual++) {
                if (naoVerificarPrimeiraExecucao) {
                    naoVerificarPrimeiraExecucao = false;
                }
                else {
                    this.pontoDeParadaAtivo = this.verificarPontoParada(ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual]);
                    if (this.pontoDeParadaAtivo) {
                        this.avisoPontoParadaAtivado();
                        break;
                    }
                }
                retornoExecucao = await this.executar(ultimoEscopo.declaracoes[ultimoEscopo.declaracaoAtual]);
                // Um ponto de parada ativo pode ter vindo de um escopo mais interno.
                // Por isso verificamos outra parada aqui para evitar que
                // `this.declaracaoAtual` seja incrementado.
                if (this.pontoDeParadaAtivo) {
                    this.avisoPontoParadaAtivado();
                    break;
                }
            }
            return retornoExecucao;
        }
        catch (erro) {
            this.erros.push(erro);
        }
        finally {
            if (!this.pontoDeParadaAtivo && this.comando !== 'adentrarEscopo') {
                this.pilhaEscoposExecucao.removerUltimo();
                const escopoAnterior = this.pilhaEscoposExecucao.topoDaPilha();
                escopoAnterior.ambiente.resolucoesChamadas = Object.assign(escopoAnterior.ambiente.resolucoesChamadas, ultimoEscopo.ambiente.resolucoesChamadas);
                if (manterAmbiente) {
                    escopoAnterior.ambiente.valores = Object.assign(escopoAnterior.ambiente.valores, ultimoEscopo.ambiente.valores);
                }
                this.escopoAtual--;
            }
            if (this.pilhaEscoposExecucao.elementos() === 1) {
                this.finalizacaoDaExecucao();
            }
        }
    }
    /**
     * Continua a interpretação, conforme comando do depurador.
     * Quando um ponto de parada é ativado, a pilha de execução do TypeScript é perdida.
     * Esse método cria uma nova pilha de execução do lado do JS, começando do último elemento executado do
     * primeiro escopo, subindo até o último elemento executado do último escopo.
     * Se entre escopos houver ponto de parada ativo, a execução é suspensa até o próximo comando
     * do desenvolvedor.
     * @see executarUltimoEscopo
     */
    async instrucaoContinuarInterpretacao(escopo = 1) {
        let retornoExecucao;
        if (escopo < this.escopoAtual) {
            retornoExecucao = await this.instrucaoContinuarInterpretacao(escopo + 1);
        }
        if (this.pontoDeParadaAtivo) {
            return;
        }
        await this.executarUltimoEscopoComandoContinuar(false, true);
    }
    /**
     * Empilha um escopo se for possível.
     * Se não for, apenas executa a instrução corrente.
     */
    async adentrarEscopo() {
        throw new Error('Método não implementado.');
    }
    /**
     * Interpreta apenas uma instrução a partir do ponto de parada ativo, conforme comando do depurador.
     * Esse método cria uma nova pilha de execução do lado do JS, começando do último elemento executado do
     * primeiro escopo, subindo até o último elemento executado do último escopo.
     * @param escopo Indica o escopo a ser visitado. Usado para construir uma pilha de chamadas do lado JS.
     */
    async instrucaoPasso(escopo = 1) {
        this.passos = 1;
        const escopoVisitado = this.pilhaEscoposExecucao.naPosicao(escopo);
        if (escopo < this.escopoAtual) {
            await this.instrucaoPasso(escopo + 1);
        }
        else {
            if (escopoVisitado.declaracaoAtual >= escopoVisitado.declaracoes.length || escopoVisitado.finalizado) {
                this.pilhaEscoposExecucao.removerUltimo();
            }
            if (this.pilhaEscoposExecucao.elementos() === 1) {
                return this.finalizacaoDaExecucao();
            }
            await this.executarUmPassoNoEscopo();
        }
    }
    /**
     * Interpreta restante do bloco de execução em que o ponto de parada está, conforme comando do depurador.
     * Se houver outros pontos de parada no mesmo escopo à frente da instrução atual, todos são ignorados.
     * @param escopo Indica o escopo a ser visitado. Usado para construir uma pilha de chamadas do lado JS.
     */
    async instrucaoProximoESair() {
        this.executarUltimoEscopoComandoContinuar(false, true);
    }
    /**
     * Prepara a pilha de escopos para uma situação de depuração.
     * Não há execução de código neste caso.
     * @param declaracoes Um vetor de declarações.
     */
    prepararParaDepuracao(declaracoes) {
        this.declaracoes = declaracoes;
        this.abrirNovoBlocoEscopo(declaracoes);
    }
    abrirNovoBlocoEscopo(declaracoes, ambiente, tipoEscopo = 'outro') {
        const escopoExecucao = {
            declaracoes: declaracoes,
            declaracaoAtual: 0,
            ambiente: ambiente || new espaco_variaveis_1.EspacoVariaveis(),
            finalizado: false,
            tipo: tipoEscopo,
            emLacoRepeticao: false,
        };
        this.pilhaEscoposExecucao.empilhar(escopoExecucao);
        this.escopoAtual++;
    }
    /**
     * Reimplementando este método aqui porque a execução por depuração não requer
     * mostrar o resultado em momento algum, ou lidar com o retorno.
     * @param declaracao A declaracao a ser executada.
     * @param mostrarResultado Sempre falso.
     * @returns O resultado da execução.
     */
    async executar(declaracao, mostrarResultado = false) {
        return await declaracao.aceitar(this);
    }
    /**
     * Interpretação utilizada pelo depurador para avaliar valores de variáveis.
     * Diferentemente da interpretação tradicional, não possui indicadores
     * de performance porque eles não fazem sentido aqui.
     * @param declaracoes Um vetor de declarações.
     * @returns Um objeto de retorno, com erros encontrados se houverem.
     */
    async interpretar(declaracoes, manterAmbiente = false) {
        this.erros = [];
        this.declaracoes = declaracoes;
        this.abrirNovoBlocoEscopo(declaracoes);
        const resultado = await super.executarUltimoEscopo(manterAmbiente);
        // Corrigir contador de escopos
        this.escopoAtual--;
        const retorno = {
            erros: this.erros,
            // resultado: this.resultadoInterpretador // Removido para simplificar `this.executar()`.
            resultado: [resultado],
        };
        this.resultadoInterpretador = [];
        return retorno;
    }
    /**
     * Obtém o valor de uma variável por nome.
     * Em versões anteriores, o mecanismo de avaliação fazia toda a avaliação tradicional,
     * passando por Lexador, Avaliador Sintático e Interpretador.
     * Isso tem sua cota de problemas, sobretudo porque a avaliação insere e descarta escopos,
     * entrando em condição de corrida com a interpretação com depuração.
     * @param nome O nome da variável.
     */
    obterVariavel(nome) {
        const valorOuVariavel = this.pilhaEscoposExecucao.obterValorVariavel({ lexema: nome });
        return valorOuVariavel.hasOwnProperty('valor')
            ? valorOuVariavel
            : {
                valor: valorOuVariavel,
                tipo: (0, inferenciador_1.inferirTipoVariavel)(valorOuVariavel),
            };
    }
}
exports.InterpretadorComDepuracao = InterpretadorComDepuracao;
//# sourceMappingURL=interpretador-com-depuracao.js.map