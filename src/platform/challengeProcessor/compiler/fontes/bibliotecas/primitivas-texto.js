"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    aparar: (interpretador, texto) => Promise.resolve(texto.trim()),
    apararFim: (interpretador, texto) => Promise.resolve(texto.trimEnd()),
    apararInicio: (interpretador, texto) => Promise.resolve(texto.trimStart()),
    concatenar: (interpretador, ...texto) => Promise.resolve(''.concat(...texto)),
    dividir: (interpretador, texto, divisor, limite) => {
        if (limite) {
            return Promise.resolve(texto.split(divisor, limite));
        }
        return Promise.resolve(texto.split(divisor));
    },
    fatiar: (interpretador, texto, inicio, fim) => Promise.resolve(texto.slice(inicio, fim)),
    inclui: (interpretador, texto, elemento) => Promise.resolve(texto.includes(elemento)),
    inverter: (interpretador, texto) => Promise.resolve(texto.split('').reduce((texto, caracter) => (texto = caracter + texto), '')),
    maiusculo: (interpretador, texto) => Promise.resolve(texto.toUpperCase()),
    minusculo: (interpretador, texto) => Promise.resolve(texto.toLowerCase()),
    substituir: (interpretador, texto, elemento, substituto) => Promise.resolve(texto.replace(elemento, substituto)),
    subtexto: (interpretador, texto, inicio, fim) => Promise.resolve(texto.slice(inicio, fim)),
    tamanho: (interpretador, texto) => Promise.resolve(texto.length),
};
//# sourceMappingURL=primitivas-texto.js.map