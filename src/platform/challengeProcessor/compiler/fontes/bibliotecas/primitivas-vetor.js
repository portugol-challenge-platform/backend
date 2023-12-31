"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    adicionar: (interpretador, vetor, elemento) => {
        vetor.push(elemento);
        return Promise.resolve(vetor);
    },
    concatenar: (interpretador, vetor, outroVetor) => {
        return Promise.resolve(vetor.concat(outroVetor));
    },
    empilhar: (interpretador, vetor, elemento) => {
        vetor.push(elemento);
        return Promise.resolve(vetor);
    },
    encaixar: (interpretador, vetor, inicio, excluirQuantidade, ...items) => {
        const elementos = !items.length
            ? vetor.splice(inicio, excluirQuantidade)
            : vetor.splice(inicio, excluirQuantidade, ...items);
        return Promise.resolve(elementos);
    },
    fatiar: (interpretador, vetor, inicio, fim) => Promise.resolve(vetor.slice(inicio, fim)),
    filtrarPor: async (interpretador, vetor, funcao) => {
        if (funcao === undefined || funcao === null) {
            return Promise.reject("É necessário passar uma função para o método 'filtrarPor'");
        }
        const retorno = [];
        for (let elemento of vetor) {
            if (await funcao.chamar(interpretador, [elemento])) {
                retorno.push(elemento);
            }
        }
        return retorno;
    },
    inclui: (interpretador, vetor, elemento) => Promise.resolve(vetor.includes(elemento)),
    inverter: (interpretador, vetor) => Promise.resolve(vetor.reverse()),
    juntar: (interpretador, vetor, separador) => Promise.resolve(vetor.join(separador)),
    mapear: async (interpretador, vetor, funcao) => {
        if (funcao === undefined || funcao === null) {
            return Promise.reject("É necessário passar uma função para o método 'mapear'");
        }
        const retorno = [];
        for (let elemento of vetor) {
            let resultado = await funcao.chamar(interpretador, [elemento]);
            retorno.push(resultado);
        }
        return retorno;
    },
    ordenar: async (interpretador, vetor, funcaoOrdenacao) => {
        if (funcaoOrdenacao !== undefined && funcaoOrdenacao !== null) {
            for (let i = 0; i < vetor.length - 1; i++) {
                for (let j = 1; j < vetor.length; j++) {
                    if ((await funcaoOrdenacao.chamar(interpretador, [vetor[j - 1], vetor[j]])) > 0) {
                        const aux = vetor[j];
                        vetor[j] = vetor[j - 1];
                        vetor[j - 1] = aux;
                    }
                }
            }
            return vetor;
        }
        if (!vetor.every((v) => typeof v === 'number')) {
            return vetor.sort();
        }
        return vetor.sort((a, b) => a - b);
    },
    remover: (interpretador, vetor, elemento) => {
        const index = vetor.indexOf(elemento);
        if (index !== -1)
            vetor.splice(index, 1);
        return Promise.resolve(vetor);
    },
    removerPrimeiro: (interpretador, vetor) => {
        let elemento = vetor.shift();
        return Promise.resolve(elemento);
    },
    removerUltimo: (interpretador, vetor) => {
        let elemento = vetor.pop();
        return Promise.resolve(elemento);
    },
    somar: (interpretador, vetor) => Promise.resolve(vetor.reduce((a, b) => a + b)),
    tamanho: (interpretador, vetor) => Promise.resolve(vetor.length),
};
//# sourceMappingURL=primitivas-vetor.js.map