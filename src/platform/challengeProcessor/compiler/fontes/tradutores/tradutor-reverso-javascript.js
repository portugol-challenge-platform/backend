"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorReversoJavaScript = void 0;
/**
 * Esse tradutor traduz de JavaScript para Delégua.
 */
class TradutorReversoJavaScript {
    constructor() {
        this.indentacao = 0;
        this.dicionarioConstrutos = {
            AssignmentExpression: this.traduzirConstrutoAtribuir.bind(this),
            ArrayExpression: this.traduzirConstrutoVetor.bind(this),
            ArrowFunctionExpression: this.traduzirDeclaracaoFuncao.bind(this),
            // Agrupamento: this.traduzirConstrutoAgrupamento.bind(this),
            BinaryExpression: this.traduzirConstrutoBinario.bind(this),
            CallExpression: this.traduzirConstrutoChamada.bind(this),
            // DefinirValor: this.traduzirConstrutoDefinirValor.bind(this),
            // Isto: this.traduzirConstrutoIsto.bind(this),
            Identifier: this.traduzirIdentificador.bind(this),
            Literal: this.traduzirConstrutoLiteral.bind(this),
            LogicalExpression: this.traduzirConstrutoLogico.bind(this),
            MemberExpression: this.traduzirExpressao.bind(this),
            NewExpression: this.traduzirNovo.bind(this),
            ThisExpression: () => 'isto',
            UpdateExpression: this.traduzirAtualizacaoVariavel.bind(this),
            // Variavel: this.traduzirConstrutoVariavel.bind(this),
        };
        // Qualquer coisa pro ESLint ficar feliz.
    }
    traduzirSimboloOperador(operador) {
        switch (operador) {
            case '===':
                return '==';
            case '&&':
                return 'e';
            case '||':
                return 'ou';
            default:
                return operador;
        }
    }
    //TODO: @Samuel
    traduzirFuncoesNativas(metodo) {
        switch (metodo.toLowerCase()) {
            case 'concat':
                return 'concatenar';
            case 'includes':
                return 'inclui';
            case 'join':
                return 'juntar';
            case 'length':
                return 'tamanho()';
            case 'log':
                return 'escreva';
            case 'pop':
                return 'removerUltimo';
            case 'push':
                return 'adicionar';
            case 'replace':
                return 'substituir';
            case 'reverse':
                return 'inverter';
            case 'sort':
                return 'ordenar';
            case 'shift':
                return 'removerPrimeiro';
            case 'slice':
                return 'fatiar';
            case 'trim':
                return 'aparar';
            case 'trimstart':
                return 'apararInicio';
            case 'trimend':
                return 'apararFim';
            case 'touppercase':
                return 'maiusculo';
            case 'tolowercase':
                return 'minusculo';
            default:
                return metodo;
        }
    }
    traduzirConstrutoVetor(vetor) {
        if (!vetor.elements.length) {
            return '[]';
        }
        let resultado = '[';
        for (let elemento of vetor.elements) {
            resultado += this.dicionarioConstrutos[elemento.constructor.name](elemento) + ', ';
        }
        if (vetor.elements.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ']';
        return resultado;
    }
    traduzirIdentificador(identificador) {
        return identificador.name;
    }
    traduzirAtualizacaoVariavel(atualizarVariavel) {
        let resultado = '';
        resultado += this.dicionarioConstrutos[atualizarVariavel.argument.constructor.name](atualizarVariavel.argument);
        resultado += this.traduzirSimboloOperador(atualizarVariavel.operator);
        return resultado;
    }
    traduzirNovo(novo) {
        let identificador = novo.callee;
        let resultado = `${identificador.name}(`;
        for (let argumento of novo.arguments) {
            resultado += this.dicionarioConstrutos[argumento.type](argumento) + ', ';
        }
        if (novo.arguments.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ')';
        return resultado;
    }
    traduzirExpressao(expressao) {
        let objeto = this.dicionarioConstrutos[expressao.object.type](expressao.object);
        let propriedade = this.dicionarioConstrutos[expressao.property.type](expressao.property);
        if (objeto === 'console') {
            return `${this.traduzirFuncoesNativas(propriedade)}`;
        }
        return `${objeto}.${this.traduzirFuncoesNativas(propriedade)}`;
    }
    traduzirConstrutoLogico(logico) {
        return this.dicionarioConstrutos[logico.constructor.name](logico);
    }
    traduzirConstrutoChamada(chamada) {
        let resultado = '';
        resultado += this.dicionarioConstrutos[chamada.callee.type](chamada.callee) + '(';
        for (let parametro of chamada.arguments) {
            resultado += this.dicionarioConstrutos[parametro.type](parametro) + ', ';
        }
        if (chamada.arguments.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += ')';
        return resultado;
    }
    traduzirConstrutoAtribuir(atribuir) {
        let resultado = '';
        const direita = this.dicionarioConstrutos[atribuir.right.type](atribuir.right);
        const esquerda = this.dicionarioConstrutos[atribuir.left.type](atribuir.left);
        resultado += `${esquerda} ${this.traduzirSimboloOperador(atribuir.operator)} ${direita}`;
        return resultado;
    }
    traduzirExpressaoDeclaracao(declaracao) {
        return this.dicionarioConstrutos[declaracao.expression.type](declaracao.expression);
    }
    traduzirConstrutoLiteral(literal) {
        if (literal.raw === 'true')
            return 'verdadeiro';
        if (literal.raw === 'false')
            return 'falso';
        return `${literal.raw}`;
    }
    traduzirConstrutoBinario(binario) {
        let resultado = '';
        const direita = this.dicionarioConstrutos[binario.right.type](binario.right);
        const esquerda = this.dicionarioConstrutos[binario.left.type](binario.left);
        resultado += `${esquerda} ${this.traduzirSimboloOperador(binario.operator)} ${direita}`;
        return resultado;
    }
    traduzirDeclaracaoVariavel(declaracao) {
        let resultado = '';
        let informacoesDaVariavel = declaracao.declarations[0];
        const identificador = informacoesDaVariavel.id;
        if (identificador) {
            resultado += `${declaracao.kind === 'const' ? 'const' : 'var'} ${identificador.name}`;
            if (informacoesDaVariavel.init) {
                resultado += ` = ${this.dicionarioConstrutos[informacoesDaVariavel.init.type](informacoesDaVariavel.init)}`;
            }
        }
        return resultado;
    }
    logicaComumBlocoEscopo(declaracoes) {
        let resultado = '{\n';
        this.indentacao += 4;
        const corpo = declaracoes.body.body || declaracoes.body;
        for (const declaracaoOuConstruto of corpo) {
            resultado += ' '.repeat(this.indentacao);
            const nomeConstrutor = declaracaoOuConstruto.constructor.name;
            if (this.dicionarioConstrutos.hasOwnProperty(nomeConstrutor)) {
                resultado += this.dicionarioConstrutos[nomeConstrutor](declaracaoOuConstruto);
            }
            else {
                resultado += this.traduzirDeclaracao(declaracaoOuConstruto);
            }
            resultado += '\n';
        }
        this.indentacao -= 4;
        resultado += ' '.repeat(this.indentacao) + '}\n';
        return resultado;
    }
    traduzirDeclaracaoPara(declaracao) {
        let resultado = '';
        resultado += 'para (';
        resultado += this.traduzirDeclaracao(declaracao.init) + '; ';
        resultado += this.dicionarioConstrutos[declaracao.test.type](declaracao.test) + '; ';
        resultado += this.dicionarioConstrutos[declaracao.update.type](declaracao.update) + ') ';
        resultado += this.logicaComumBlocoEscopo(declaracao);
        return resultado;
    }
    traduzirDeclaracaoParaDe(declaracao) {
        let resultado = '';
        let emOuDe = declaracao.type === 'ForInStatement' ? 'em' : 'de';
        resultado += `para (${this.traduzirDeclaracao(declaracao.left)} ${emOuDe} `;
        resultado += this.dicionarioConstrutos[declaracao.right.constructor.name](declaracao.right) + ') ';
        resultado += this.logicaComumBlocoEscopo(declaracao.body);
        return resultado;
    }
    traduzirDeclaracaoFuncao(declaracao) {
        let resultado = '';
        const eFuncaoSeta = !declaracao.id;
        resultado += eFuncaoSeta ? '(' : `funcao ${declaracao.id.name}(`;
        for (let parametro of declaracao.params) {
            resultado += parametro.name + ', ';
        }
        if (declaracao.params.length > 0) {
            resultado = resultado.slice(0, -2);
        }
        resultado += eFuncaoSeta ? ') => ' : ') ';
        resultado += this.logicaComumBlocoEscopo(declaracao);
        return resultado;
    }
    //TODO: Refatorar esse método. @Samuel
    traduzirDeclaracaoClasse(declaracao) {
        let resultado = `classe ${declaracao.id.name} `;
        if (declaracao.superClass) {
            let identificador = declaracao.superClass;
            resultado += `herda ${identificador.name} `;
        }
        resultado += '{\n';
        this.indentacao += 4;
        resultado += ' '.repeat(this.indentacao);
        for (let corpo of declaracao.body.body) {
            if (corpo.type === 'MethodDefinition') {
                let _corpo = corpo;
                if (_corpo.kind === 'constructor') {
                    resultado += 'construtor(';
                    for (let valor of _corpo.value.params) {
                        if (valor.type === 'Identifier') {
                            resultado += `${valor.name}, `;
                        }
                    }
                    if (_corpo.value.params.length > 0) {
                        resultado = resultado.slice(0, -2);
                    }
                    resultado += ')';
                    resultado += this.logicaComumBlocoEscopo(_corpo.value);
                }
                else if (_corpo.kind === 'method') {
                    resultado += ' '.repeat(this.indentacao);
                    let identificador = _corpo.key;
                    resultado += identificador.name + '(';
                    for (let valor of _corpo.value.params) {
                        if (valor.type === 'Identifier') {
                            resultado += `${valor.name}, `;
                        }
                    }
                    if (_corpo.value.params.length > 0) {
                        resultado = resultado.slice(0, -2);
                    }
                    resultado += ')';
                    resultado += this.logicaComumBlocoEscopo(_corpo.value);
                }
            } // else if (corpo.constructor.name === 'PropertyDefinition') {}
            // else if (corpo.constructor.name === 'StaticBlock') {}
        }
        this.indentacao -= 4;
        resultado += ' '.repeat(this.indentacao) + '}\n';
        return resultado;
    }
    traduzirDeclaracaoRetorna(declaracao) {
        return `retorna ${this.dicionarioConstrutos[declaracao.argument.type](declaracao.argument)}`;
    }
    traduzirDeclaracaoEnquanto(declaracao) {
        let resultado = 'enquanto(';
        resultado += this.dicionarioConstrutos[declaracao.test.type](declaracao.test);
        resultado += ')';
        resultado += this.logicaComumBlocoEscopo(declaracao);
        return resultado;
    }
    traduzirDeclaracaoFazerEnquanto(declaracao) {
        let resultado = 'fazer';
        resultado += this.logicaComumBlocoEscopo(declaracao);
        resultado += 'enquanto(';
        resultado += this.dicionarioConstrutos[declaracao.test.type](declaracao.test);
        resultado += ')';
        return resultado;
    }
    traduzirDeclaracaoSe(declaracao) {
        let resultado = 'se (';
        resultado += this.dicionarioConstrutos[declaracao.test.type](declaracao.test);
        resultado += ')';
        resultado += this.logicaComumBlocoEscopo(declaracao.consequent);
        if (declaracao === null || declaracao === void 0 ? void 0 : declaracao.alternate) {
            resultado += 'senao ';
            if (declaracao.alternate.constructor.name === 'BlockStatement') {
                const bloco = declaracao.alternate;
                resultado += this.logicaComumBlocoEscopo(bloco);
                return resultado;
            }
            const se = declaracao.alternate;
            resultado += this.traduzirDeclaracao(se);
        }
        return resultado;
    }
    traduzirDeclaracaoTente(declaracao) {
        let resultado = 'tente ';
        resultado += this.logicaComumBlocoEscopo(declaracao.block);
        if (declaracao.handler) {
            resultado += 'pegue';
            if (declaracao.handler.param) {
                const identificador = declaracao.handler.param;
                resultado += `(${identificador.name})`;
            }
            resultado += this.logicaComumBlocoEscopo(declaracao.block);
        }
        if (declaracao.finalizer) {
            resultado += 'finalmente';
            resultado += this.logicaComumBlocoEscopo(declaracao.finalizer);
        }
        return resultado;
    }
    traduzirDeclaracaoEscolha(declaracao) {
        let resultado = '';
        this.indentacao += 4;
        resultado += `escolha(${this.dicionarioConstrutos[declaracao.discriminant.type](declaracao.discriminant)}) {`;
        resultado += ' '.repeat(this.indentacao);
        for (let caso of declaracao.cases) {
            if (!caso.test) {
                resultado += 'padrao:';
                resultado += ' '.repeat(this.indentacao + 4);
                for (let bloco of caso.consequent) {
                    if (bloco.type === 'BreakStatement')
                        continue;
                    resultado += this.traduzirDeclaracao(bloco) + '\n';
                }
                break;
            }
            resultado += `caso ${this.dicionarioConstrutos[caso.test.type](caso.test)}:`;
            resultado += ' '.repeat(this.indentacao + 4);
            for (let bloco of caso.consequent) {
                if (bloco.type === 'BreakStatement')
                    continue;
                resultado += this.traduzirDeclaracao(bloco) + '\n';
            }
        }
        this.indentacao -= 4;
        resultado += ' '.repeat(this.indentacao) + '}\n';
        return resultado;
    }
    traduzirDeclaracao(declaracao) {
        switch (declaracao.type) {
            case 'ClassDeclaration':
                return this.traduzirDeclaracaoClasse(declaracao);
            case 'DoWhileStatement':
                return this.traduzirDeclaracaoFazerEnquanto(declaracao);
            case 'ExpressionStatement':
                return this.traduzirExpressaoDeclaracao(declaracao);
            case 'ForStatement':
                return this.traduzirDeclaracaoPara(declaracao);
            case 'ForInStatement':
            case 'ForOfStatement':
                return this.traduzirDeclaracaoParaDe(declaracao);
            case 'FunctionDeclaration':
                return this.traduzirDeclaracaoFuncao(declaracao);
            case 'IfStatement':
                return this.traduzirDeclaracaoSe(declaracao);
            case 'ReturnStatement':
                return this.traduzirDeclaracaoRetorna(declaracao);
            case 'SwitchStatement':
                return this.traduzirDeclaracaoEscolha(declaracao);
            case 'TryStatement':
                return this.traduzirDeclaracaoTente(declaracao);
            case 'VariableDeclaration':
                return this.traduzirDeclaracaoVariavel(declaracao);
            case 'WhileStatement':
                return this.traduzirDeclaracaoEnquanto(declaracao);
        }
    }
    traduzir(declaracoes) {
        let resultado = '';
        for (let declaracao of declaracoes) {
            resultado += `${this.traduzirDeclaracao(declaracao)} \n`;
        }
        return resultado;
    }
}
exports.TradutorReversoJavaScript = TradutorReversoJavaScript;
//# sourceMappingURL=tradutor-reverso-javascript.js.map