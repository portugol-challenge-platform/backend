"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracao = void 0;
class Declaracao {
    constructor(linha, hashArquivo) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        // TODO: Por ora, todos os testes são feitos num script só.
        // Quando iniciarem os testes em múltiplos arquivos e módulos,
        // pensar numa forma melhor de preencher isso.
        this.assinaturaMetodo = '<principal>';
    }
    async aceitar(visitante) {
        return Promise.reject(new Error('Este método não deveria ser chamado.'));
    }
}
exports.Declaracao = Declaracao;
//# sourceMappingURL=declaracao.js.map