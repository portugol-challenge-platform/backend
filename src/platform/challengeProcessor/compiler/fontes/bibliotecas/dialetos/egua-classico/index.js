"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carregarModuloPorNome = void 0;
const estruturas_1 = require("../../../estruturas");
const carregarModulo = function (nomeModulo, caminhoModulo) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let dadosDoModulo = require(caminhoModulo);
    let novoModulo = new estruturas_1.DeleguaModulo(nomeModulo);
    let keys = Object.keys(dadosDoModulo);
    for (let i = 0; i < keys.length; i++) {
        let itemAtual = dadosDoModulo[keys[i]];
        if (typeof itemAtual === 'function') {
            novoModulo[keys[i]] = new estruturas_1.FuncaoPadrao(itemAtual.length, itemAtual);
        }
        else {
            novoModulo[keys[i]] = itemAtual;
        }
    }
    return novoModulo;
};
const carregarModuloPorNome = function (nome) {
    switch (nome) {
        case 'tempo':
            return carregarModulo('tempo', './tempo.ts');
        case 'matematica':
            return carregarModulo('matematica', './matematica.ts');
        case 'textos':
            return carregarModulo('textos', './textos.ts');
    }
    return null;
};
exports.carregarModuloPorNome = carregarModuloPorNome;
//# sourceMappingURL=index.js.map