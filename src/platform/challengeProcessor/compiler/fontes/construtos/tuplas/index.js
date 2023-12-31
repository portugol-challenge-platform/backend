"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeletorTuplas = void 0;
const deceto_1 = require("./deceto");
const dupla_1 = require("./dupla");
const noneto_1 = require("./noneto");
const octeto_1 = require("./octeto");
const quarteto_1 = require("./quarteto");
const quinteto_1 = require("./quinteto");
const septeto_1 = require("./septeto");
const sexteto_1 = require("./sexteto");
const trio_1 = require("./trio");
__exportStar(require("./deceto"), exports);
__exportStar(require("./dupla"), exports);
__exportStar(require("./noneto"), exports);
__exportStar(require("./octeto"), exports);
__exportStar(require("./quarteto"), exports);
__exportStar(require("./quinteto"), exports);
__exportStar(require("./septeto"), exports);
__exportStar(require("./sexteto"), exports);
__exportStar(require("./trio"), exports);
__exportStar(require("./tupla"), exports);
class SeletorTuplas {
    constructor(...argumentos) {
        if (argumentos.length > 10) {
            throw new Error('Tuplas com mais de 10 elementos não são suportadas.');
        }
        if (argumentos.length < 2) {
            throw new Error('Tuplas devem ter no mínimo 2 elementos.');
        }
        switch (argumentos.length) {
            case 2:
                return new dupla_1.Dupla(argumentos[0], argumentos[1]);
            case 3:
                return new trio_1.Trio(argumentos[0], argumentos[1], argumentos[2]);
            case 4:
                return new quarteto_1.Quarteto(argumentos[0], argumentos[1], argumentos[2], argumentos[3]);
            case 5:
                return new quinteto_1.Quinteto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4]);
            case 6:
                return new sexteto_1.Sexteto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5]);
            case 7:
                return new septeto_1.Septeto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5], argumentos[6]);
            case 8:
                return new octeto_1.Octeto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5], argumentos[6], argumentos[7]);
            case 9:
                return new noneto_1.Noneto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5], argumentos[6], argumentos[7], argumentos[8]);
            case 10:
                return new deceto_1.Deceto(argumentos[0], argumentos[1], argumentos[2], argumentos[3], argumentos[4], argumentos[5], argumentos[6], argumentos[7], argumentos[8], argumentos[9]);
        }
    }
}
exports.SeletorTuplas = SeletorTuplas;
//# sourceMappingURL=index.js.map