"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
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
exports.ImportadorJavaScript = exports.Importador = void 0;
const sistemaArquivos = __importStar(require("fs"));
const caminho = __importStar(require("path"));
const sistemaOperacional = __importStar(require("os"));
const fs_1 = require("fs");
const avaliador_sintatico_javascript_1 = require("./fontes/avaliador-sintatico/traducao/avaliador-sintatico-javascript");
const lexador_javascript_1 = require("./fontes/lexador/traducao/lexador-javascript");
const depuracao_1 = require("./fontes/depuracao");
const tradutores_1 = require("./fontes/tradutores");
const delegua_1 = __importDefault(require("./fontes/tipos-de-simbolos/delegua"));
const dialetos_1 = require("./fontes/lexador/dialetos");
const dialetos_2 = require("./fontes/avaliador-sintatico/dialetos");
class Importador {
    constructor(lexador, avaliadorSintatico, arquivosAbertos, conteudoArquivosAbertos, depuracao) {
        this.diretorioBase = process.cwd();
        this.lexador = lexador;
        this.avaliadorSintatico = avaliadorSintatico;
        this.arquivosAbertos = arquivosAbertos;
        this.conteudoArquivosAbertos = conteudoArquivosAbertos;
        this.depuracao = depuracao;
    }
    importar(caminhoRelativoArquivo, importacaoInicial = false) {
        const nomeArquivo = caminho.basename(caminhoRelativoArquivo);
        let caminhoAbsolutoArquivo = caminho.resolve(this.diretorioBase, caminhoRelativoArquivo);
        if (importacaoInicial) {
            caminhoAbsolutoArquivo = caminho.resolve(caminhoRelativoArquivo);
        }
        const hashArquivo = (0, depuracao_1.cyrb53)(caminhoAbsolutoArquivo.toLowerCase());
        if (!sistemaArquivos.existsSync(nomeArquivo)) {
            // TODO: Terminar.
            /* throw new ErroEmTempoDeExecucao(
                declaracao.simboloFechamento,
                'Não foi possível encontrar arquivo importado.',
                declaracao.linha
            ); */
        }
        const dadosDoArquivo = sistemaArquivos.readFileSync(caminhoAbsolutoArquivo);
        const conteudoDoArquivo = dadosDoArquivo.toString().replace(sistemaOperacional.EOL, '\n').split('\n');
        for (let linha = 0; linha < conteudoDoArquivo.length; linha++) {
            conteudoDoArquivo[linha] += '\0';
        }
        const retornoLexador = this.lexador.mapear(conteudoDoArquivo, hashArquivo);
        const retornoAvaliadorSintatico = this.avaliadorSintatico.analisar(retornoLexador, hashArquivo);
        this.arquivosAbertos[hashArquivo] = caminho.resolve(caminhoRelativoArquivo);
        if (this.depuracao) {
            this.conteudoArquivosAbertos[hashArquivo] = conteudoDoArquivo;
        }
        return {
            nomeArquivo,
            hashArquivo,
            retornoLexador,
            retornoAvaliadorSintatico,
        };
    }
}
exports.Importador = Importador;
class ImportadorJavaScript {
    constructor() {
        this.lexador = new lexador_javascript_1.LexadorJavaScript();
        this.avaliadorSintatico = new avaliador_sintatico_javascript_1.AvaliadorSintaticoJavaScript();
    }
    importar(caminhoRelativoArquivo, importacaoInicial) {
        const nomeArquivo = caminho.basename(caminhoRelativoArquivo);
        let caminhoAbsolutoArquivo = caminho.resolve(this.diretorioBase, caminhoRelativoArquivo);
        if (importacaoInicial) {
            caminhoAbsolutoArquivo = caminho.resolve(caminhoRelativoArquivo);
        }
        const hashArquivo = (0, depuracao_1.cyrb53)(caminhoAbsolutoArquivo.toLowerCase());
        const dadosDoArquivo = sistemaArquivos.readFileSync(caminhoAbsolutoArquivo);
        const conteudoDoArquivo = dadosDoArquivo.toString().replace(sistemaOperacional.EOL, '\n').split('\n');
        const retornoLexador = this.lexador.mapear(conteudoDoArquivo, hashArquivo);
        const retornoAvaliadorSintatico = this.avaliadorSintatico.analisar(retornoLexador, hashArquivo);
        // TODO: Verificar se vai ser necessário.
        // this.arquivosAbertos[hashArquivo] = caminho.resolve(caminhoRelativoArquivo);
        return {
            nomeArquivo,
            hashArquivo,
            retornoLexador,
            retornoAvaliadorSintatico,
        };
    }
}
exports.ImportadorJavaScript = ImportadorJavaScript;
function afericaoErros(retornoImportador) {
    function reportar(linha, onde, mensagem) {
        console.error((`[Linha: ${linha}]`) + ` Erro${onde}: ${mensagem}`);
    }
    function erro(simbolo, mensagemDeErro) {
        const _simbolo = simbolo || { tipo: delegua_1.default.EOF, linha: -1, lexema: '(indefinido)' };
        if (_simbolo.tipo === delegua_1.default.EOF) {
            reportar(Number(_simbolo.linha), ' no final do código', mensagemDeErro);
        }
        else {
            reportar(Number(_simbolo.linha), ` no '${_simbolo.lexema}'`, mensagemDeErro);
        }
    }
    if (retornoImportador.retornoLexador.erros.length > 0) {
        for (const erroLexador of retornoImportador.retornoLexador.erros) {
            reportar(erroLexador.linha, ` no '${erroLexador.caractere}'`, erroLexador.mensagem);
        }
        return true;
    }
    if (retornoImportador.retornoAvaliadorSintatico.erros.length > 0) {
        for (const erroAvaliadorSintatico of retornoImportador.retornoAvaliadorSintatico.erros) {
            erro(erroAvaliadorSintatico.simbolo, erroAvaliadorSintatico.message);
        }
        return true;
    }
    return false;
}
try {
    const caminhoRelativoArquivo = process.argv[2];
    const caminhoAbsolutoPrimeiroArquivo = caminho.resolve(caminhoRelativoArquivo);
    const novoDiretorioBase = caminho.dirname(caminhoAbsolutoPrimeiroArquivo);
    const importador = new Importador(new dialetos_1.LexadorVisuAlg(), new dialetos_2.AvaliadorSintaticoVisuAlg(), {}, {}, false), tradutorJs = new tradutores_1.TradutorPython();
    importador.diretorioBase = novoDiretorioBase;
    const retornoImportador = importador.importar(caminhoRelativoArquivo, true);
    let resultado = null;
    if (afericaoErros(retornoImportador)) {
        throw "error";// Código para erro de avaliação antes da tradução
    }
    resultado = tradutorJs.traduzir(retornoImportador.retornoAvaliadorSintatico.declaracoes);
    // console.log(resultado);
    (0, fs_1.writeFileSync)('build.py', resultado);
    process.exit(0);
}
catch (e) {

    console.error(JSON.stringify(e));
    process.exit(65);
}
//# sourceMappingURL=index.js.map