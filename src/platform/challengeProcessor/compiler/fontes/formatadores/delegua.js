"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatadorDelegua = void 0;
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
/**
 * O formatador de código Delégua.
 * Normalmente usado por IDEs, mas pode ser usado por linha de comando ou programaticamente.
 */
class FormatadorDelegua {
    constructor() {
        this.indentacao = 0;
        this.blocoAberto = true;
    }
    /**
     * Devolve código formatado de acordo com os símbolos encontrados.
     * @param simbolos Um vetor de símbolos.
     * @param quebraLinha O símbolo de quebra de linha. Normalmente `\r\n` para Windows e `\n` para outros sistemas operacionais.
     * @param tamanhoIndentacao O tamanho de cada bloco de indentação (por padrão, 4)
     * @returns Código Delégua formatado.
     */
    formatar(simbolos, quebraLinha, tamanhoIndentacao = 4) {
        let resultado = '';
        let deveQuebrarLinha = false;
        for (let simbolo of simbolos) {
            switch (simbolo.tipo) {
                case delegua_1.default.CHAVE_ESQUERDA:
                    this.indentacao += tamanhoIndentacao;
                    resultado += '{' + quebraLinha;
                    resultado += ' '.repeat(this.indentacao);
                    break;
                case delegua_1.default.CHAVE_DIREITA:
                    this.indentacao -= tamanhoIndentacao;
                    resultado += quebraLinha + ' '.repeat(this.indentacao) + '}' + quebraLinha;
                    break;
                case delegua_1.default.ESCREVA:
                    deveQuebrarLinha = true;
                case delegua_1.default.ENQUANTO:
                case delegua_1.default.FAZER:
                case delegua_1.default.FINALMENTE:
                case delegua_1.default.PARA:
                case delegua_1.default.PEGUE:
                case delegua_1.default.RETORNA:
                case delegua_1.default.SE:
                case delegua_1.default.SENAO:
                case delegua_1.default.SENÃO:
                case delegua_1.default.TENTE:
                case delegua_1.default.VARIAVEL:
                    resultado += quebraLinha + ' '.repeat(this.indentacao) + simbolo.lexema + ' ';
                    break;
                case delegua_1.default.PARENTESE_ESQUERDO:
                    resultado += '(';
                    break;
                case delegua_1.default.PARENTESE_DIREITO:
                    resultado = resultado.trimEnd();
                    resultado += ')';
                    if (deveQuebrarLinha) {
                        deveQuebrarLinha = false;
                        resultado += quebraLinha;
                    }
                    else {
                        resultado += ' ';
                    }
                    break;
                case delegua_1.default.FUNCAO:
                case delegua_1.default.FUNÇÃO:
                case delegua_1.default.IDENTIFICADOR:
                case delegua_1.default.IGUAL:
                case delegua_1.default.IGUAL_IGUAL:
                    resultado += simbolo.lexema + ' ';
                    break;
                default:
                    resultado += simbolo.lexema;
                    break;
            }
        }
        return resultado;
    }
}
exports.FormatadorDelegua = FormatadorDelegua;
//# sourceMappingURL=delegua.js.map