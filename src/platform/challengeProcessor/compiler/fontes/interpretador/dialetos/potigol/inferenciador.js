"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferirTipoVariavel = void 0;
function inferirTipoVariavel(variavel) {
    const tipo = typeof variavel;
    switch (tipo) {
        case 'string':
            return 'Texto';
        case 'number':
            return 'Número';
        case 'bigint':
            return 'Longo';
        case 'boolean':
            return 'Lógico';
        case 'undefined':
            return 'Nulo';
        case 'object':
            if (Array.isArray(variavel))
                return 'vetor';
            if (variavel === null)
                return 'nulo';
            if (variavel.constructor.name === 'DeleguaModulo')
                return 'módulo';
            return 'Dicionário';
        case 'function':
            return 'Função';
        case 'symbol':
            return 'Símbolo';
    }
}
exports.inferirTipoVariavel = inferirTipoVariavel;
//# sourceMappingURL=inferenciador.js.map